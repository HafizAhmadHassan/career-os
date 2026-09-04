pip install mcp ## mcp python sdk
pip install uv # python project management tool

uv init my-first-mcp-server # it will create basic skeloton

## give code to chatgpt to create mcp server to create leave management

from mcp.server import MCPServer

mcp = MCPServer("Demo")


@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers."""
    return a + b


@mcp.resource("greeting://{name}")
def greeting(name: str) -> str:
    """Greet someone by name."""
    return f"Hello, {name}!"




from datetime import date
from typing import Literal

from mcp.server import MCPServer

mcp = MCPServer("Leave Management")


# ---------------------------------------------------------------------------
# In-memory demo data
# ---------------------------------------------------------------------------

employees = {
    "EMP001": {
        "name": "Alice Johnson",
        "email": "alice@example.com",
    },
    "EMP002": {
        "name": "Bob Smith",
        "email": "bob@example.com",
    },
}

leave_balances = {
    "EMP001": {
        "annual": 20,
        "sick": 10,
        "personal": 5,
    },
    "EMP002": {
        "annual": 15,
        "sick": 8,
        "personal": 3,
    },
}

leave_requests = []


# ---------------------------------------------------------------------------
# Tools
# ---------------------------------------------------------------------------

@mcp.tool()
def get_employee(employee_id: str) -> dict:
    """Get employee information by employee ID."""

    employee = employees.get(employee_id)

    if not employee:
        return {
            "success": False,
            "message": f"Employee {employee_id} not found.",
        }

    return {
        "success": True,
        "employee_id": employee_id,
        **employee,
    }


@mcp.tool()
def get_leave_balance(employee_id: str) -> dict:
    """Get the remaining leave balance for an employee."""

    if employee_id not in employees:
        return {
            "success": False,
            "message": f"Employee {employee_id} not found.",
        }

    return {
        "success": True,
        "employee_id": employee_id,
        "balance": leave_balances.get(
            employee_id,
            {
                "annual": 0,
                "sick": 0,
                "personal": 0,
            },
        ),
    }


@mcp.tool()
def request_leave(
    employee_id: str,
    leave_type: Literal["annual", "sick", "personal"],
    start_date: str,
    end_date: str,
    reason: str = "",
) -> dict:
    """
    Submit a leave request.

    Dates must be provided in YYYY-MM-DD format.
    """

    if employee_id not in employees:
        return {
            "success": False,
            "message": f"Employee {employee_id} not found.",
        }

    try:
        start = date.fromisoformat(start_date)
        end = date.fromisoformat(end_date)
    except ValueError:
        return {
            "success": False,
            "message": "Dates must use YYYY-MM-DD format.",
        }

    if end < start:
        return {
            "success": False,
            "message": "End date cannot be before start date.",
        }

    days = (end - start).days + 1

    balance = leave_balances[employee_id][leave_type]

    if days > balance:
        return {
            "success": False,
            "message": (
                f"Insufficient {leave_type} leave balance. "
                f"Requested: {days} days, Available: {balance} days."
            ),
        }

    request_id = f"LR-{len(leave_requests) + 1:04d}"

    request = {
        "request_id": request_id,
        "employee_id": employee_id,
        "employee_name": employees[employee_id]["name"],
        "leave_type": leave_type,
        "start_date": start_date,
        "end_date": end_date,
        "days": days,
        "reason": reason,
        "status": "pending",
    }

    leave_requests.append(request)

    return {
        "success": True,
        "message": "Leave request submitted successfully.",
        "request": request,
    }


@mcp.tool()
def get_leave_requests(
    employee_id: str | None = None,
    status: Literal["pending", "approved", "rejected", "cancelled"] | None = None,
) -> dict:
    """
    Get leave requests.

    Optionally filter by employee ID and/or status.
    """

    requests = leave_requests

    if employee_id:
        requests = [
            request
            for request in requests
            if request["employee_id"] == employee_id
        ]

    if status:
        requests = [
            request
            for request in requests
            if request["status"] == status
        ]

    return {
        "success": True,
        "count": len(requests),
        "requests": requests,
    }


@mcp.tool()
def approve_leave(request_id: str) -> dict:
    """Approve a pending leave request."""

    request = next(
        (r for r in leave_requests if r["request_id"] == request_id),
        None,
    )

    if not request:
        return {
            "success": False,
            "message": f"Leave request {request_id} not found.",
        }

    if request["status"] != "pending":
        return {
            "success": False,
            "message": (
                f"Cannot approve request because its status is "
                f"'{request['status']}'."
            ),
        }

    employee_id = request["employee_id"]
    leave_type = request["leave_type"]
    days = request["days"]

    if leave_balances[employee_id][leave_type] < days:
        return {
            "success": False,
            "message": "Insufficient leave balance to approve this request.",
        }

    leave_balances[employee_id][leave_type] -= days
    request["status"] = "approved"

    return {
        "success": True,
        "message": "Leave request approved.",
        "request": request,
        "remaining_balance": leave_balances[employee_id],
    }


@mcp.tool()
def reject_leave(request_id: str, reason: str = "") -> dict:
    """Reject a pending leave request."""

    request = next(
        (r for r in leave_requests if r["request_id"] == request_id),
        None,
    )

    if not request:
        return {
            "success": False,
            "message": f"Leave request {request_id} not found.",
        }

    if request["status"] != "pending":
        return {
            "success": False,
            "message": (
                f"Cannot reject request because its status is "
                f"'{request['status']}'."
            ),
        }

    request["status"] = "rejected"
    request["rejection_reason"] = reason

    return {
        "success": True,
        "message": "Leave request rejected.",
        "request": request,
    }


@mcp.tool()
def cancel_leave(request_id: str) -> dict:
    """Cancel an approved or pending leave request."""

    request = next(
        (r for r in leave_requests if r["request_id"] == request_id),
        None,
    )

    if not request:
        return {
            "success": False,
            "message": f"Leave request {request_id} not found.",
        }

    if request["status"] == "cancelled":
        return {
            "success": False,
            "message": "Leave request is already cancelled.",
        }

    if request["status"] == "rejected":
        return {
            "success": False,
            "message": "Rejected leave cannot be cancelled.",
        }

    # Return the days to the balance if an approved request is cancelled.
    if request["status"] == "approved":
        employee_id = request["employee_id"]
        leave_type = request["leave_type"]
        leave_balances[employee_id][leave_type] += request["days"]

    request["status"] = "cancelled"

    return {
        "success": True,
        "message": "Leave request cancelled.",
        "request": request,
    }


# ---------------------------------------------------------------------------
# Resources
# ---------------------------------------------------------------------------

@mcp.resource("employee://{employee_id}")
def employee_resource(employee_id: str) -> str:
    """Get a human-readable employee profile."""

    employee = employees.get(employee_id)

    if not employee:
        return f"Employee {employee_id} not found."

    return (
        f"Employee ID: {employee_id}\n"
        f"Name: {employee['name']}\n"
        f"Email: {employee['email']}"
    )


@mcp.resource("leave-balance://{employee_id}")
def leave_balance_resource(employee_id: str) -> str:
    """Get a human-readable leave balance."""

    balance = leave_balances.get(employee_id)

    if not balance:
        return f"Employee {employee_id} not found."

    return (
        f"Leave balance for {employee_id}\n"
        f"Annual: {balance['annual']} days\n"
        f"Sick: {balance['sick']} days\n"
        f"Personal: {balance['personal']} days"
    )


# ---------------------------------------------------------------------------
# Run MCP server
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    mcp.run()


## run

uv run mcp install main.py


## in claude
 enable developer mode there u can see configuration has been added


 ask claude : how mant leaves are available for E001 
 claude is smarrt to know this and 

 also the history

 E002 want to apply for july leave


 ## Doc String which is description is very improtant