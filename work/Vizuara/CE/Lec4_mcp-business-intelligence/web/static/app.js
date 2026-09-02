async function checkServer() {

    const status = document.getElementById("server-status");
    const dot = document.getElementById("status-dot");

    try {

        const response = await fetch("/health");

        if (response.ok) {

            status.textContent = "Server online";

            dot.style.background = "#22c55e";

        } else {

            throw new Error();

        }

    } catch (error) {

        status.textContent = "Server offline";

        dot.style.background = "#ef4444";

    }
}


async function analyze() {

    const question =
        document.getElementById("question").value.trim();

    const provider =
        document.getElementById("provider").value;

    const responseBox =
        document.getElementById("response");

    const button =
        document.getElementById("analyze-btn");

    const activity =
        document.getElementById("activity");


    if (!question) {

        alert("Please enter a business question.");

        return;

    }


    button.disabled = true;

    button.textContent = "Analyzing...";


    responseBox.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">⟳</div>
            <h3>Analyzing your question...</h3>
            <p>Calling the MCP tools.</p>
        </div>
    `;


    activity.innerHTML = `

        <div class="activity-item">

            <span class="activity-dot"></span>

            <div>
                <strong>LLM Provider</strong>
                <span>${provider}</span>
            </div>

        </div>


        <div class="activity-item">

            <span class="activity-dot"></span>

            <div>
                <strong>MCP Client</strong>
                <span>Connecting...</span>
            </div>

        </div>

    `;


    /*
     * TEMPORARY DEMO RESPONSE
     *
     * We will replace this with:
     *
     * Browser
     *     ↓
     * FastAPI
     *     ↓
     * LLM
     *     ↓
     * MCP Client
     *     ↓
     * MCP Server
     */

    setTimeout(() => {

        responseBox.innerHTML = `

            <p>
                Based on the available sales data,
                <strong>Tablet</strong> sales are currently
                underperforming.
            </p>

            <br>

            <p>
                Sales decreased from
                <strong>90 units in Q1</strong>
                to
                <strong>70 units in Q2</strong>.
            </p>

            <br>

            <p>
                This represents approximately a
                <strong>22.2% decline</strong>.
            </p>

            <br>

            <p>
                The MCP server provided the sales data
                and business context used for this analysis.
            </p>

        `;


        activity.innerHTML = `

            <div class="activity-item">

                <span class="activity-dot"></span>

                <div>
                    <strong>LLM Provider</strong>
                    <span>${provider}</span>
                </div>

            </div>


            <div class="activity-item">

                <span class="activity-dot"></span>

                <div>
                    <strong>get_sales_data</strong>
                    <span>Tool executed successfully</span>
                </div>

            </div>


            <div class="activity-item">

                <span class="activity-dot"></span>

                <div>
                    <strong>calculate_growth</strong>
                    <span>Tool executed successfully</span>
                </div>

            </div>


            <div class="activity-item">

                <span class="activity-dot"></span>

                <div>
                    <strong>MCP Server</strong>
                    <span>Response received</span>
                </div>

            </div>

        `;


        button.disabled = false;

        button.textContent = "Analyze";

    }, 1200);

}


document.addEventListener(
    "DOMContentLoaded",
    checkServer
);
