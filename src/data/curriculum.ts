import type { TopicCurriculum } from '@/types';

export const curriculum: Record<string, TopicCurriculum> = {
  'python-fundamentals': {
    topicId: 'rm-1',
    introduction: 'Master Python from first principles: data structures, functions, OOP, exceptions, type hints, async, testing and packaging. This is the foundation every other module builds on.',
    estimatedHours: 40,
    difficulty: 'beginner',
    objectives: [
      { id: 'obj-1', text: 'Explain Python data structures (list, dict, set, tuple) and when to use each' },
      { id: 'obj-2', text: 'Write functions with default args, keyword args, and type hints' },
      { id: 'obj-3', text: 'Design classes with properties, dunder methods, and inheritance' },
      { id: 'obj-4', text: 'Handle exceptions with try/except/else/finally' },
      { id: 'obj-5', text: 'Structure code into modules and packages' },
      { id: 'obj-6', text: 'Write async/await code with asyncio' },
      { id: 'obj-7', text: 'Write tests with pytest covering edge cases' },
      { id: 'obj-8', text: 'Package a project with pyproject.toml' },
    ],
    resources: [
      { id: 'res-1', title: 'Official Python Tutorial', kind: 'documentation', source: 'python.org', url: 'https://docs.python.org/3/tutorial/', description: 'The definitive introduction to the language, data structures, modules, and more.', difficulty: 'beginner', estimatedMinutes: 300, priority: 'high' },
      { id: 'res-2', title: 'The Python Tutorial: Classes', kind: 'documentation', source: 'python.org', url: 'https://docs.python.org/3/tutorial/classes.html', description: 'Object-oriented programming in Python.', difficulty: 'beginner', estimatedMinutes: 90, priority: 'high' },
      { id: 'res-3', title: 'Automate the Boring Stuff', kind: 'tutorial', source: 'automatetheboringstuff.com', url: 'https://automatetheboringstuff.com/', description: 'Practical Python fundamentals with real-world exercises.', difficulty: 'beginner', estimatedMinutes: 480, priority: 'medium' },
      { id: 'res-4', title: 'asyncio Documentation', kind: 'documentation', source: 'python.org', url: 'https://docs.python.org/3/library/asyncio.html', description: 'Async programming with asyncio.', difficulty: 'intermediate', estimatedMinutes: 120, priority: 'high' },
      { id: 'res-5', title: 'pytest Documentation', kind: 'documentation', source: 'pytest.org', url: 'https://docs.pytest.org/en/stable/', description: 'Testing Python with pytest.', difficulty: 'beginner', estimatedMinutes: 90, priority: 'medium' },
      { id: 'res-6', title: 'Real Python: Async IO in Python', kind: 'tutorial', source: 'realpython.com', url: 'https://realpython.com/async-io-python/', description: 'A deep guide to async IO patterns.', difficulty: 'intermediate', estimatedMinutes: 60, priority: 'medium' },
      { id: 'res-7', title: 'Fluent Python', kind: 'article', source: 'fluentpython.com', url: 'https://fluentpython.com/', description: 'The classic book on Python idioms, data model, and performance.', difficulty: 'intermediate', estimatedMinutes: 240, priority: 'medium' },
      { id: 'res-8', title: 'Effective Python', kind: 'article', source: 'effectivepython.com', url: 'https://effectivepython.com/', description: '90 concrete ways to write better Python.', difficulty: 'intermediate', estimatedMinutes: 180, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Build a CLI Task Manager', problem: 'Build a command-line task manager with file persistence.', whyItMatters: 'Reinforces data structures, classes, error handling, and user input handling.', prerequisites: ['Python basics'], requirements: [
          { id: 'r1', text: 'Persist tasks to a JSON file' },
          { id: 'r2', text: 'Use classes to model Task and TaskManager' },
          { id: 'r3', text: 'Handle missing/corrupt files gracefully' },
          { id: 'r4', text: 'Support add, list, complete, delete commands' },
          { id: 'r5', text: 'Write tests for all commands' },
        ], hints: 'Start with a Task dataclass, then a repository that loads/saves JSON. Keep CLI parsing simple with argparse.', expectedOutput: 'A runnable CLI where `python taskman.py add "Learn async"` persists across sessions.', acceptanceCriteria: [
          { id: 'a1', text: 'Tasks survive restart' },
          { id: 'a2', text: 'Unknown commands show a helpful error' },
          { id: 'a3', text: 'pytest passes with >= 5 tests' },
        ], skillsPracticed: ['Python', 'Data structures', 'File I/O', 'Testing'], estimatedMinutes: 150, difficulty: 'beginner' },
      {
        id: 'lab-2', title: 'Async API Collector', problem: 'Query multiple public APIs concurrently with asyncio.', whyItMatters: 'Teaches the async patterns used throughout production AI systems.', prerequisites: ['asyncio basics', 'HTTP fundamentals'], requirements: [
          { id: 'r1', text: 'Use asyncio and an async HTTP client (httpx)' },
          { id: 'r2', text: 'Query at least 5 endpoints concurrently' },
          { id: 'r3', text: 'Implement per-request timeouts' },
          { id: 'r4', text: 'Retry failed requests with backoff' },
          { id: 'r5', text: 'Handle partial failures without crashing' },
          { id: 'r6', text: 'Report total execution time' },
        ], hints: 'Use asyncio.gather(return_exceptions=True) so one failure does not abort everything.', expectedOutput: 'A program printing one line per API with status + latency, plus a total time.', acceptanceCriteria: [
          { id: 'a1', text: 'All healthy APIs queried concurrently' },
          { id: 'a2', text: 'A single failing API does not crash the run' },
          { id: 'a3', text: 'Tests exist' },
          { id: 'a4', text: 'README explains the architecture' },
        ], skillsPracticed: ['Async programming', 'HTTP', 'Error handling', 'Concurrency'], estimatedMinutes: 180, difficulty: 'intermediate' },
      {
        id: 'lab-3', title: 'Build a FastAPI Service', problem: 'Expose the task manager as a small REST service.', whyItMatters: 'FastAPI is the core web framework for most Agentic AI backends.', prerequisites: ['REST APIs', 'Python'], requirements: [
          { id: 'r1', text: 'REST endpoints for CRUD' },
          { id: 'r2', text: 'Pydantic validation on request bodies' },
          { id: 'r3', text: 'Error handling with proper status codes' },
          { id: 'r4', text: 'Tests with TestClient' },
          { id: 'r5', text: 'Dockerfile that runs the app' },
        ], hints: 'Use FastAPI dependency injection for the task repository.', expectedOutput: 'A Dockerized FastAPI app with documented endpoints.', acceptanceCriteria: [
          { id: 'a1', text: 'POST/GET/PATCH/DELETE endpoints work' },
          { id: 'a2', text: 'Invalid input returns 422/400' },
          { id: 'a3', text: 'docker build && docker run serves API' },
        ], skillsPracticed: ['FastAPI', 'REST APIs', 'Pydantic', 'Docker'], estimatedMinutes: 180, difficulty: 'intermediate' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Personal Python Toolkit Package', problem: 'Build a small pip-installable Python package with a CLI and tests.', requirements: [
        { id: 'r1', text: 'pyproject.toml with proper metadata' },
        { id: 'r2', text: 'At least one installable module with real functionality' },
        { id: 'r3', text: 'CLI entry point' },
        { id: 'r4', text: 'Comprehensive pytest suite' },
        { id: 'r5', text: 'Documented in a README' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'pip install -e . works' },
        { id: 'a2', text: 'CLI command runs from anywhere' },
        { id: 'a3', text: 'Coverage report included' },
      ], skillsPracticed: ['Python', 'Packaging', 'CLI', 'Testing'], estimatedHours: 4 },
    repositories: [
      {
        id: 'repo-1', name: 'cpython', url: 'https://github.com/python/cpython', whyStudy: 'Understand how core types behave under the hood.', whatToLookFor: 'List/dict implementations, memory management.', importantFiles: ['Objects/listobject.c', 'Objects/dictobject.c'], concepts: ['Reference counting', 'GIL', 'Memory management'], guidedSteps: [
          { id: 's1', text: 'Read the repository README and developer guide' },
          { id: 's2', text: 'Skim Objects/listobject.c for overall structure' },
          { id: 's3', text: 'Understand why lists overallocate' },
          { id: 's4', text: 'Note the GIL design in Include/cpython/pystate.h' },
        ] },
    ],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'Which collection is best for fast membership tests?', options: ['list', 'tuple', 'set', 'deque'], correctOption: 2, idealAnswer: 'set — O(1) average membership' },
      { id: 'q2', type: 'mcq', question: 'What does `__enter__`/`__exit__` implement?', options: ['Iteration', 'Context manager protocol', 'Descriptor protocol', 'Comparison protocol'], correctOption: 1, idealAnswer: 'The context manager protocol used by `with`' },
      { id: 'q3', type: 'short_answer', question: 'Explain the difference between `list` and `tuple`.', idealAnswer: 'list is mutable, tuple is immutable; tuple can be a dict key.' },
      { id: 'q4', type: 'architecture', question: 'Design how you would structure a Python package with models, services, and CLI.', idealAnswer: 'models (dataclasses), services (business logic), cli (argparse), tests (pytest), pyproject.toml' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'When would you use a generator instead of a list?', idealAnswer: 'When you don\'t need all items in memory at once — streaming/large data' },
      { id: 'iq-2', question: 'What is the GIL and why does it matter?', idealAnswer: 'Global Interpreter Lock — one thread executes Python bytecode at a time; affects CPU-bound threads' },
      { id: 'iq-3', question: 'How does asyncio achieve concurrency without threads?', idealAnswer: 'Event loop + cooperative multitasking of coroutines on I/O boundaries' },
      { id: 'iq-4', question: 'Explain duck typing vs. explicit interfaces.', idealAnswer: 'Duck typing relies on behavior; interfaces (Protocol) declare structure explicitly' },
    ],
  },

  'typescript-modern-web': {
    topicId: 'rm-2',
    introduction: 'TypeScript adds a type system to JavaScript, making large React codebases maintainable. Learn the type system, then React with hooks and modern tooling.',
    estimatedHours: 30,
    difficulty: 'beginner',
    objectives: [
      { id: 'obj-1', text: 'Explain basic and advanced TypeScript types' },
      { id: 'obj-2', text: 'Use generics and utility types' },
      { id: 'obj-3', text: 'Model application data with interfaces' },
      { id: 'obj-4', text: 'Build functional React components with hooks' },
      { id: 'obj-5', text: 'Manage client-side routing' },
      { id: 'obj-6', text: 'Write type-safe, testable code' },
    ],
    resources: [
      { id: 'res-1', title: 'TypeScript Handbook', kind: 'documentation', source: 'typescriptlang.org', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', description: 'The official TypeScript reference.', difficulty: 'beginner', estimatedMinutes: 300, priority: 'high' },
      { id: 'res-2', title: 'TypeScript Handbook: Everyday Types', kind: 'documentation', source: 'typescriptlang.org', url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html', description: 'Core types used daily: unions, aliases, generics.', difficulty: 'beginner', estimatedMinutes: 60, priority: 'high' },
      { id: 'res-3', title: 'React Docs: Describing the UI', kind: 'documentation', source: 'react.dev', url: 'https://react.dev/learn', description: 'The official React learning path.', difficulty: 'beginner', estimatedMinutes: 240, priority: 'high' },
      { id: 'res-4', title: 'React Docs: Managing State', kind: 'documentation', source: 'react.dev', url: 'https://react.dev/learn/managing-state', description: 'Hooks, reducers, and state architecture.', difficulty: 'intermediate', estimatedMinutes: 120, priority: 'high' },
      { id: 'res-5', title: 'React Router Docs', kind: 'documentation', source: 'reactrouter.com', url: 'https://reactrouter.com/', description: 'Client-side routing for SPAs.', difficulty: 'intermediate', estimatedMinutes: 90, priority: 'medium' },
      { id: 'res-6', title: 'TypeScript Deep Dive', kind: 'tutorial', source: 'basarat.gitbook.io', url: 'https://basarat.gitbook.io/typescript', description: 'A practical, community-driven dive into the TS type system.', difficulty: 'intermediate', estimatedMinutes: 120, priority: 'medium' },
      { id: 'res-7', title: 'React Docs: Reusing Logic with Custom Hooks', kind: 'documentation', source: 'react.dev', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks', description: 'Extracting and composing hook-based logic.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'medium' },
      { id: 'res-8', title: 'TypeScript & Modern Web Playlist', kind: 'video', source: 'youtube.com', url: 'https://www.youtube.com/playlist?list=PLbtI3_MArDOkXRLxdMt1NOMtCS-84ibHH', description: 'YouTube playlist covering TypeScript and modern web development.', difficulty: 'beginner', estimatedMinutes: 600, priority: 'medium' },
      { id: 'res-9', title: 'TypeScript & Modern Web Playlist 2', kind: 'video', source: 'youtube.com', url: 'https://www.youtube.com/playlist?list=PLbtI3_MArDOm777bemDCy1abP1t1Rnnbx', description: 'Additional TypeScript and modern web development videos.', difficulty: 'beginner', estimatedMinutes: 600, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Typed Todo App', problem: 'Build a typed React todo application with hooks.', whyItMatters: 'Consolidates types, components, and state.', prerequisites: ['React basics reflect', 'TypeScript aliases'], requirements: [
          { id: 'r1', text: 'Define Todo type with status union' },
          { id: 'r2', text: 'Add / toggle / delete todos' },
          { id: 'r3', text: 'Persist to localStorage' },
          { id: 'r4', text: 'Filter by status' },
        ], hints: 'Use useReducer for state transitions.', expectedOutput: 'A working typed todo app.', acceptanceCriteria: [
          { id: 'a1', text: 'No `any` in the codebase' },
          { id: 'a2', text: 'State persists after refresh' },
          { id: 'a3', text: 'tc passes' },
        ], skillsPracticed: ['TypeScript', 'React'], estimatedMinutes: 150, difficulty: 'beginner' },
      {
        id: 'lab-2', title: 'Type-safe API Client', problem: 'Build a typed fetch wrapper for an API.', whyItMatters: 'Pattern used everywhere for typed data fetching.', prerequisites: ['Generics'], requirements: [
          { id: 'r1', text: 'Generic get<T>(url) wrapper' },
          { id: 'r2', text: 'Handle error responses with discriminated unions' },
          { id: 'r3', text: 'Define API response types' },
          { id: 'r4', text: 'Use it in a React component with loading state' },
        ], hints: 'Model API result as { ok: true, data } | { ok: false, error } for exhaustiveness.', expectedOutput: 'A reusable typed fetcher used by a component.', acceptanceCriteria: [
          { id: 'a1', text: 'Callers get compile-time response types' },
          { id: 'a2', text: 'Errors are handled explicitly' },
        ], skillsPracticed: ['TypeScript', 'Network', 'React'], estimatedMinutes: 120, difficulty: 'intermediate' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Markdown Notes Explorer', problem: 'Build a typed React app that lists, views, and searches markdown notes.', requirements: [
        { id: 'r1', text: 'Strict typed models' },
        { id: 'r2', text: 'Search + filter' },
        { id: 'r3', text: 'Routing to note pages' },
        { id: 'r4', text: 'Vitest tests for pure logic' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'Runs as SPA' },
        { id: 'a2', text: 'All user interactions typed' },
      ], skillsPracticed: ['TypeScript', 'React', 'Routing'], estimatedHours: 4 },
    repositories: [],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'What does the `readonly` modifier do?', options: ['Makes a property read-only at compile time', 'Freezes the object at runtime', 'Removes a property', 'Adds optionality'], correctOption: 0, idealAnswer: 'Compile-time immutability of the property assignment' },
      { id: 'q2', type: 'short_answer', question: 'When would you use a union type vs an interface?', idealAnswer: 'Union for closed value sets (status), interface for object shapes' },
      { id: 'q3', type: 'architecture', question: 'How would you structure state for a medium-size SPA?', idealAnswer: 'Colocate local UI state, lift shared state, use reducers for complex transitions' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'Difference between interface and type alias?', idealAnswer: 'Interfaces can be extended/merged; type aliases support unions/mapped types' },
      { id: 'iq-2', question: 'Explain a discriminated union.', idealAnswer: 'Union of object types with a literal discriminant field enabling exhaustive narrowing' },
    ],
  },

  'git-github-mastery': {
    topicId: 'rm-3',
    introduction: 'Version control is non-negotiable for professional AI engineering. Master git workflows, branching strategies, and GitHub collaboration.',
    estimatedHours: 15,
    difficulty: 'beginner',
    objectives: [
      { id: 'obj-1', text: 'Use core git commands fluently' },
      { id: 'obj-2', text: 'Resolve merge conflicts confidently' },
      { id: 'obj-3', text: 'Use interactive rebase and fixup' },
      { id: 'obj-4', text: 'Understand feature-branch workflows' },
      { id: 'obj-5', text: 'Use GitHub PRs, issues, and actions' },
      { id: 'obj-6', text: 'Write conventional commit messages' },
    ],
    resources: [
      { id: 'res-1', title: 'Pro Git Book', kind: 'tutorial', source: 'git-scm.com', url: 'https://git-scm.com/book/en/v2', description: 'The canonical git reference.', difficulty: 'beginner', estimatedMinutes: 300, priority: 'high' },
      { id: 'res-2', title: 'GitHub Skills', kind: 'tutorial', source: 'github.com', url: 'https://skills.github.com/', description: 'Hands-on GitHub courses.', difficulty: 'beginner', estimatedMinutes: 120, priority: 'medium' },
      { id: 'res-3', title: 'Conventional Commits', kind: 'article', source: 'conventionalcommits.org', url: 'https://www.conventionalcommits.org/', description: 'Commit message conventions.', difficulty: 'beginner', estimatedMinutes: 20, priority: 'high' },
      { id: 'res-4', title: 'GitHub Docs: About pull requests', kind: 'documentation', source: 'docs.github.com', url: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests', description: 'Collaboration and review flows.', difficulty: 'beginner', estimatedMinutes: 60, priority: 'medium' },
      { id: 'res-5', title: 'GitHub Docs: Get started with Git', kind: 'documentation', source: 'docs.github.com', url: 'https://docs.github.com/en/get-started', description: 'Official Git and GitHub onboarding path.', difficulty: 'beginner', estimatedMinutes: 90, priority: 'medium' },
      { id: 'res-6', title: 'GitHub Actions Docs', kind: 'documentation', source: 'docs.github.com', url: 'https://docs.github.com/en/actions', description: 'Automate builds, tests, and deployments.', difficulty: 'intermediate', estimatedMinutes: 90, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Conflict Resolution Drill', problem: 'Simulate a merge conflict and resolve it cleanly.', whyItMatters: 'Conflicts are inevitable; practice is the only teacher.', prerequisites: ['git basics'], requirements: [
          { id: 'r1', text: 'Create two branches editing the same file' },
          { id: 'r2', text: 'Merge and land in a conflict' },
          { id: 'r3', text: 'Resolve manually choosing correct content' },
          { id: 'r4', text: 'Keep commit history clean' },
        ], hints: 'Use `git log --merge` and `git diff` to understand both sides.', expectedOutput: 'A cleanly merged branch with a well-written merge commit.', acceptanceCriteria: [
          { id: 'a1', text: 'No conflicted markers remain' },
          { id: 'a2', text: 'Both branches\' changes preserved' },
        ], skillsPracticed: ['Git', 'Merging'], estimatedMinutes: 60, difficulty: 'beginner' },
      {
        id: 'lab-2', title: 'Clean History with Rebase', problem: 'Take a messy branch and produce a clean linear history.', whyItMatters: 'PRs with clean history review faster.', prerequisites: ['rebase'], requirements: [
          { id: 'r1', text: 'Create ~6 commits with noise (typos, fixups)' },
          { id: 'r2', text: 'Use interactive rebase to squash and reword' },
          { id: 'r3', text: 'Split a bad commit into logical commits' },
          { id: 'r4', text: 'Rebase onto latest main' },
        ], hints: 'Practice on a throwaway branch first.', expectedOutput: 'A concise, logical commit sequence.', acceptanceCriteria: [
          { id: 'a1', text: 'History reads as a narrative' },
          { id: 'a2', text: 'No WIP/typo commits remain' },
        ], skillsPracticed: ['Git', 'Rebase'], estimatedMinutes: 90, difficulty: 'intermediate' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Contribution Qualities Repo', problem: 'Turn a small project into a model open-source repo: docs, conventions, CI.', requirements: [
        { id: 'r1', text: 'Feature-branch workflow' },
        { id: 'r2', text: 'Conventional commits' },
        { id: 'r3', text: 'PR template and CONTRIBUTING' },
        { id: 'r4', text: 'CI with npm test' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'PRs merge through CI' },
        { id: 'a2', text: 'README documents the workflow' },
      ], skillsPracticed: ['Git', 'GitHub', 'CI'], estimatedHours: 2 },
    repositories: [],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'What distinguishes `git pull --rebase` from `git pull`?', options: ['Rebases local commits onto remote instead of merging', 'Deletes local commits', 'Forces push', 'Nothing'], correctOption: 0, idealAnswer: 'Replays local commits onto the updated remote base' },
      { id: 'q2', type: 'short_answer', question: 'When should you NOT rebase?', idealAnswer: 'On shared/public branches where rewriting history breaks collaborators' },
      { id: 'q3', type: 'architecture', question: 'Design a branching strategy for a 3-person AI project team.', idealAnswer: 'main always deployable, short-lived feature branches, PR-based review, tags for releases' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'How do you resolve a merge conflict?', idealAnswer: 'Inspect both sides with git status/log/diff, edit affected files, stage, commit' },
      { id: 'iq-2', question: 'What is rerere?', idealAnswer: 'Reuse recorded resolution — git remembers past conflict resolutions' },
    ],
  },

  'rest-api-design': {
    topicId: 'rm-4',
    introduction: 'Design and build resilient REST APIs: resource modeling, status codes, validation, authentication, pagination, and documentation.',
    estimatedHours: 20,
    difficulty: 'beginner',
    objectives: [
      { id: 'obj-1', text: 'Model resources and their relationships' },
      { id: 'obj-2', text: 'Use HTTP methods and status codes correctly' },
      { id: 'obj-3', text: 'Design pagination, filtering, and sorting' },
      { id: 'obj-4', text: 'Implement authentication and authorization' },
      { id: 'obj-5', text: 'Handle errors consistently' },
      { id: 'obj-6', text: 'Document APIs with OpenAPI' },
    ],
    resources: [
      { id: 'res-1', title: 'MDN: An overview of HTTP', kind: 'documentation', source: 'developer.mozilla.org', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview', description: 'HTTP fundamentals: methods, headers, status codes.', difficulty: 'beginner', estimatedMinutes: 60, priority: 'high' },
      { id: 'res-2', title: 'MDN: HTTP status codes', kind: 'documentation', source: 'developer.mozilla.org', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status', description: 'Reference for all status codes.', difficulty: 'beginner', estimatedMinutes: 30, priority: 'high' },
      { id: 'res-3', title: 'RESTful API Design', kind: 'article', source: 'restfulapi.net', url: 'https://restfulapi.net/resource-naming/', description: 'Resource naming and design conventions.', difficulty: 'beginner', estimatedMinutes: 45, priority: 'medium' },
      { id: 'res-4', title: 'OpenAPI Specification', kind: 'documentation', source: 'spec.openapis.org', url: 'https://spec.openapis.org/oas/latest.html', description: 'Describe APIs for tooling and docs.', difficulty: 'intermediate', estimatedMinutes: 90, priority: 'medium' },
      { id: 'res-5', title: 'json:api Specification', kind: 'documentation', source: 'jsonapi.org', url: 'https://jsonapi.org/', description: 'Conventions for JSON API requests and responses.', difficulty: 'beginner', estimatedMinutes: 45, priority: 'medium' },
      { id: 'res-6', title: 'Azure Architecture: API design best practices', kind: 'article', source: 'learn.microsoft.com', url: 'https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design', description: 'Pragmatic guidelines for REST API design at scale.', difficulty: 'intermediate', estimatedMinutes: 60, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Bookshelf API', problem: 'Build a REST API for managing books with categories and authors.', whyItMatters: 'Core CRUD design with relationships.', prerequisites: ['FastAPI or Express'], requirements: [
          { id: 'r1', text: 'Resources: books, authors, categories' },
          { id: 'r2', text: 'Nested filtering and pagination' },
          { id: 'r3', text: 'Consistent error format' },
          { id: 'r4', text: 'Input validation' },
          { id: 'r5', text: 'OpenAPI docs generated' },
        ], hints: 'Design /books/, /authors/, /categories/ as top-level resources with query params for filtering.', expectedOutput: 'A documented API tested with curl and automated tests.', acceptanceCriteria: [
          { id: 'a1', text: 'All CRUD endpoints tested' },
          { id: 'a2', text: 'Pagination implemented and documented' },
          { id: 'a3', text: 'Errors return structured JSON' },
        ], skillsPracticed: ['REST APIs', 'Modeling', 'Validation'], estimatedMinutes: 180, difficulty: 'beginner' },
      {
        id: 'lab-2', title: 'Auth Layer', problem: 'Add scoped authentication to the Bookshelf API.', whyItMatters: 'Auth is the #1 thing static-site devs get wrong.', prerequisites: ['JWT concepts'], requirements: [
          { id: 'r1', text: 'User registration/login' },
          { id: 'r2', text: 'JWT issuance with expiry' },
          { id: 'r3', text: 'Role-based access (admin vs reader)' },
          { id: 'r4', text: 'Protect write endpoints' },
          { id: 'r5', text: 'Tests for unauthorized access' },
        ], hints: 'Store password hashes only; never return tokens in logs.', expectedOutput: 'An API where writes require a valid scoped token.', acceptanceCriteria: [
          { id: 'a1', text: 'Anonymous cannot create books' },
          { id: 'a2', text: 'Token expiry enforced' },
          { id: 'a3', text: 'No secrets in frontend' },
        ], skillsPracticed: ['Authentication', 'Authorization', 'Security'], estimatedMinutes: 180, difficulty: 'intermediate' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Knowledge-base API', problem: 'A searchable API over your own study notes with auth.', requirements: [
        { id: 'r1', text: 'Notes + tags resources' },
        { id: 'r2', text: 'Full-text search endpoint' },
        { id: 'r3', text: 'Scoped JWT auth' },
        { id: 'r4', text: 'OpenAPI + live docs' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'Runnable with docker compose' },
        { id: 'a2', text: 'Search returns ranked results' },
      ], skillsPracticed: ['REST APIs', 'Auth', 'Search'], estimatedHours: 5 },
    repositories: [],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'Which status code signals a successfully created resource?', options: ['200', '201', '204', '302'], correctOption: 1, idealAnswer: '201 Created with Location header' },
      { id: 'q2', type: 'short_answer', question: 'When would you return 204 vs 200?', idealAnswer: '204 No Content when the response body is intentionally empty (e.g., DELETE)' },
      { id: 'q3', type: 'architecture', question: 'Design pagination for an API returning 10M rows.', idealAnswer: 'Cursor-based pagination with id/keyset; offsets are slow/racy at scale' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'GET vs POST vs PUT vs PATCH semantics?', idealAnswer: 'GET retrieves; POST creates/arbitrary; PUT replaces; PATCH partially updates' },
      { id: 'iq-2', question: 'How do you version an API?', idealAnswer: 'URI (/v1) or Accept header; choose and stay consistent' },
      { id: 'iq-3', question: 'What is idempotency and why does it matter?', idealAnswer: 'Repeated identical requests have the same effect; critical for retries' },
    ],
  },

  'docker-containers': {
    topicId: 'rm-5',
    introduction: 'Containerize applications, manage multi-service environments, and understand the build→ship→run pipeline that production AI systems rely on.',
    estimatedHours: 15,
    difficulty: 'beginner',
    objectives: [
      { id: 'obj-1', text: 'Write optimized Dockerfiles' },
      { id: 'obj-2', text: 'Work with images, layers, and caches' },
      { id: 'obj-3', text: 'Orchestrate services with docker compose' },
      { id: 'obj-4', text: 'Manage volumes and networking' },
      { id: 'obj-5', text: 'Understand healthchecks and non-root users' },
    ],
    resources: [
      { id: 'res-1', title: 'Docker Get Started', kind: 'documentation', source: 'docs.docker.com', url: 'https://docs.docker.com/get-started/', description: 'First-contact Docker guides.', difficulty: 'beginner', estimatedMinutes: 120, priority: 'high' },
      { id: 'res-2', title: 'Dockerfile Best Practices', kind: 'article', source: 'docs.docker.com', url: 'https://docs.docker.com/develop/develop-images/dockerfile_best-practices/', description: 'Layer caching, ordering, and efficiency.', difficulty: 'beginner', estimatedMinutes: 45, priority: 'high' },
      { id: 'res-3', title: 'Compose Specification', kind: 'documentation', source: 'docs.docker.com', url: 'https://docs.docker.com/compose/compose-file/', description: 'Declare multi-container apps.', difficulty: 'beginner', estimatedMinutes: 90, priority: 'medium' },
      { id: 'res-4', title: 'Dockerfile reference', kind: 'documentation', source: 'docs.docker.com', url: 'https://docs.docker.com/reference/dockerfile/', description: 'Every Dockerfile instruction.', difficulty: 'intermediate', estimatedMinutes: 60, priority: 'medium' },
      { id: 'res-5', title: 'Docker Docs: Multi-stage builds', kind: 'documentation', source: 'docs.docker.com', url: 'https://docs.docker.com/build/building/multi-stage/', description: 'Right-size images with staged builds.', difficulty: 'beginner', estimatedMinutes: 30, priority: 'medium' },
      { id: 'res-6', title: 'The Twelve-Factor App', kind: 'article', source: '12factor.net', url: 'https://12factor.net/', description: 'Config, process, and environment principles for services.', difficulty: 'beginner', estimatedMinutes: 45, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Python Service Container', problem: 'Containerize the FastAPI service from an earlier module.', whyItMatters: 'Standardize runtime across environments.', prerequisites: ['Docker basics'], requirements: [
          { id: 'r1', text: 'Multi-stage build separating deps and runtime' },
          { id: 'r2', text: 'Non-root user' },
          { id: 'r3', text: 'Expose healthcheck' },
          { id: 'r4', text: 'Minimize resulting image size' },
        ], hints: 'Order README-influenced layers: copy requirements first for cache hits.', expectedOutput: 'A small, secure image serving the API.', acceptanceCriteria: [
          { id: 'a1', text: 'docker build succeeds' },
          { id: 'a2', text: 'Healthcheck passes' },
          { id: 'a3', text: 'Process runs as non-root' },
        ], skillsPracticed: ['Docker', 'Infrastructure'], estimatedMinutes: 120, difficulty: 'beginner' },
      {
        id: 'lab-2', title: 'Compose Stack', problem: 'Stand up API + Postgres + reverse proxy via compose.', whyItMatters: 'The classic local AI-stack topology.', prerequisites: ['Compose'], requirements: [
          { id: 'r1', text: 'API service with env-based DB URL' },
          { id: 'r2', text: 'Postgres with named volume' },
          { id: 'r3', text: 'Compose healthchecks and depends_on conditions' },
          { id: 'r4', text: '.env.example for secrets' },
        ], hints: 'Never hardcode DB credentials in compose file.' , expectedOutput: 'One command (`docker compose up`) runs the whole stack.', acceptanceCriteria: [
          { id: 'a1', text: 'Services become healthy in order' },
          { id: 'a2', text: 'DB data persists across restart' },
          { id: 'a3', text: 'Secrets come from .env' },
        ], skillsPracticed: ['Docker', 'PostgreSQL', 'Compose'], estimatedMinutes: 150, difficulty: 'intermediate' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Reproducible Dev Environment', problem: 'Ship a dev container spec for your whole career-os project.', requirements: [
        { id: 'r1', text: 'DevContainer with Node + tools' },
        { id: 'r2', text: 'Shared setup script' },
        { id: 'r3', text: 'README with quickstart' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'New machine spins up in minutes' },
        { id: 'a2', text: 'Build works in container' },
      ], skillsPracticed: ['Docker', 'DevEx'], estimatedHours: 3 },
    repositories: [],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'Why order layers by change frequency?', options: ['Cache invalidation', 'Smaller builds when deps unchanged', 'Faster pull', 'All of the above'], correctOption: 3, idealAnswer: 'Frequent changes should sit in later layers to maximize cache reuse' },
      { id: 'q2', type: 'short_answer', question: 'Why run containers as a non-root user?', idealAnswer: 'Least-privilege: limits blast radius if a process is compromised' },
      { id: 'q3', type: 'architecture', question: 'How would you persist Postgres data across container restarts?', idealAnswer: 'Named volume mounted at /var/lib/postgresql/data' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'Image vs container?', idealAnswer: 'Image is the immutable template; container is the running instance' },
      { id: 'iq-2', question: 'You have a fat image (2GB). Debug it.', idealAnswer: 'Use distroless/scratch, multi-stage, check layers, strip deps and dev packages' },
      { id: 'iq-3', question: 'What is a Dockerfile ARG vs ENV?', idealAnswer: 'ARG is build-time only; ENV is runtime and baked into image metadata' },
    ],
  },

  'llm-api-integration': {
    topicId: 'rm-6',
    introduction: 'Connect reliably to LLM providers: authentication, chat/completions, retries, rate limits, streaming, model selection, and cost tracking.',
    estimatedHours: 25,
    difficulty: 'beginner',
    objectives: [
      { id: 'obj-1', text: 'Authenticate with LLM provider APIs' },
      { id: 'obj-2', text: 'Compose chat/completions requests correctly' },
      { id: 'obj-3', text: 'Handle streaming responses' },
      { id: 'obj-4', text: 'Implement retries with exponential backoff' },
      { id: 'obj-5', text: 'Respect rate limits and timeouts' },
      { id: 'obj-6', text: 'Track token usage and cost' },
      { id: 'obj-7', text: 'Select appropriate models for tasks' },
    ],
    resources: [
      { id: 'res-1', title: 'OpenAI API Reference', kind: 'documentation', source: 'platform.openai.com', url: 'https://platform.openai.com/docs/api-reference', description: 'Completions, chat, streaming, and auth.', difficulty: 'beginner', estimatedMinutes: 120, priority: 'high' },
      { id: 'res-2', title: 'Anthropic Documentation', kind: 'documentation', source: 'docs.anthropic.com', url: 'https://docs.anthropic.com/en/docs', description: 'Messages API, streaming, and best practices.', difficulty: 'beginner', estimatedMinutes: 120, priority: 'high' },
      { id: 'res-3', title: 'OpenAI Cookbook', kind: 'repository', source: 'github.com', url: 'https://cookbook.openai.com/', description: 'Real recipes: retries, streaming, cost tracking.', difficulty: 'intermediate', estimatedMinutes: 90, priority: 'high' },
      { id: 'res-4', title: 'OpenAI Python SDK', kind: 'repository', source: 'github.com', url: 'https://github.com/openai/openai-python', description: 'The reference Python client.', difficulty: 'beginner', estimatedMinutes: 60, priority: 'medium' },
      { id: 'res-5', title: 'LiteLLM', kind: 'repository', source: 'github.com', url: 'https://github.com/BerriAI/litellm', description: 'Unified interface across 100+ LLM providers.', difficulty: 'beginner', estimatedMinutes: 60, priority: 'medium' },
      { id: 'res-6', title: 'Anthropic Cookbook', kind: 'repository', source: 'github.com', url: 'https://github.com/anthropics/anthropic-cookbook', description: 'Ready-to-run Anthropic API recipes.', difficulty: 'intermediate', estimatedMinutes: 90, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Basic LLM Client', problem: 'Build a clean client wrapping chat completions.', whyItMatters: 'Establish the foundation every later lab reuses.', prerequisites: ['Python'], requirements: [
          { id: 'r1', text: 'Abstract provider config (model, temperature)' },
          { id: 'r2', text: 'Load API key from environment' },
          { id: 'r3', text: 'Simple chat completion call' },
          { id: 'r4', text: 'Print token usage' },
        ], hints: 'Use openai or anthropic official SDK; keep the provider swap behind an interface.', expectedOutput: 'A script that answers a prompt and prints usage.', acceptanceCriteria: [
          { id: 'a1', text: 'Key is never hardcoded' },
          { id: 'a2', text: 'Usage/cost reported' },
        ], skillsPracticed: ['LLM APIs', 'Python'], estimatedMinutes: 90, difficulty: 'beginner' },
      {
        id: 'lab-2', title: 'Streaming + Retries', problem: 'Stream tokens and retry transient failures.', whyItMatters: 'Production UX and reliability.', prerequisites: ['Lab 1'], requirements: [
          { id: 'r1', text: 'Stream tokens to stdout incrementally' },
          { id: 'r2', text: 'Retry on 429/5xx with exponential backoff + jitter' },
          { id: 'r3', text: 'Timeout per request' },
          { id: 'r4', text: 'Bounded total retries' },
        ], hints: 'tenacity library simplifies retry logic; be careful with jitter.', expectedOutput: 'A stream UI that survives flaky connections.', acceptanceCriteria: [
          { id: 'a1', text: 'Disconnection mid-stream is handled' },
          { id: 'a2', text: 'Retry policy is observable' },
        ], skillsPracticed: ['Streaming', 'Reliability', 'Error handling'], estimatedMinutes: 120, difficulty: 'intermediate' },
      {
        id: 'lab-3', title: 'Cost Tracking', problem: 'Track per-call and cumulative spend.', whyItMatters: 'Cost is a first-class production metric.', prerequisites: ['Lab 1'], requirements: [
          { id: 'r1', text: 'Look up per-model pricing' },
          { id: 'r2', text: 'Compute cost per request' },
          { id: 'r3', text: 'Log to a CSV/JSONL ledger' },
          { id: 'r4', text: 'Report session totals' },
        ], hints: 'Pricing data can live in a small config table.', expectedOutput: 'A ledger showing every call and cumulative cost.', acceptanceCriteria: [
          { id: 'a1', text: 'Cost matches documented pricing' },
          { id: 'a2', text: 'Ledger is inspectable' },
        ], skillsPracticed: ['Cost optimization', 'Data'], estimatedMinutes: 90, difficulty: 'beginner' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Provider Abstraction Layer', problem: 'Build an interface supporting OpenAI + Anthropic transparently.', requirements: [
        { id: 'r1', text: 'CompanyAPI interface with chat() + stream()' },
        { id: 'r2', text: 'OpenAI and Anthropic implementations' },
        { id: 'r3', text: 'Model selection by quality/cost' },
        { id: 'r4', text: 'Usage normalization to a common shape' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'Swapping providers is a one-line change' },
        { id: 'a2', text: 'Costs comparable across providers' },
      ], skillsPracticed: ['LLM APIs', 'Architecture', 'Abstraction'], estimatedHours: 4 },
    repositories: [
      {
        id: 'repo-1', name: 'openai-python', url: 'https://github.com/openai/openai-python', whyStudy: 'See how a production SDK structures requests, auth, and errors.', whatToLookFor: 'Client design, retry strategy, streaming internals.', importantFiles: ['src/openai/_client.py', 'src/openai/_streaming.py'], concepts: ['Sync/async duality', 'Type providers', 'Error taxonomy'], guidedSteps: [
          { id: 's1', text: 'Read README and quickstart' },
          { id: 's2', text: 'Open _client.py and trace a chat call' },
          { id: 's3', text: 'Study streaming chunk handling' },
          { id: 's4', text: 'Note the retry defaults in DEFAULT_RETRYS' },
        ] },
    ],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'How should you handle HTTP 429?', options: ['Ignore it', 'Retry immediately', 'Back off respecting Retry-After with jitter', 'Fail fast'], correctOption: 2, idealAnswer: 'Respect Retry-After and back off with jitter' },
      { id: 'q2', type: 'mcq', question: 'What is temperature primarily controlling?', options: ['Vocabulary', 'Output randomness/diversity', 'Response length', 'Token limit'], correctOption: 1, idealAnswer: 'Sampling randomness' },
      { id: 'q3', type: 'short_answer', question: 'Why track usage tokens per request?', idealAnswer: 'Cost + observability; billing and regression detection' },
      { id: 'q4', type: 'architecture', question: 'Design a provider-failover system.', idealAnswer: 'Abstraction layer + health checks + circuit breaker + cost routing' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'How do streaming responses work under the hood?', idealAnswer: 'SSE chunks delivered incrementally; each chunk carries partial delta' },
      { id: 'iq-2', question: 'How do you choose between models?', idealAnswer: 'Benchmark quality vs latency vs cost for the actual task' },
    ],
  },

  'structured-outputs-function-calling': {
    topicId: 'rm-7',
    introduction: 'Escape unstructured text: get JSON from LLMs, define tool schemas, execute tools, and validate results safely.',
    estimatedHours: 20,
    difficulty: 'intermediate',
    objectives: [
      { id: 'obj-1', text: 'Explain JSON-schema-based structured outputs' },
      { id: 'obj-2', text: 'Define tool/function schemas precisely' },
      { id: 'obj-3', text: 'Execute tool round-trips reliably' },
      { id: 'obj-4', text: 'Validate model output against schemas' },
      { id: 'obj-5', text: 'Handle tool errors and partial failures' },
      { id: 'obj-6', text: 'Structure tool results for safe reuse' },
    ],
    resources: [
      { id: 'res-1', title: 'OpenAI Structured Outputs Guide', kind: 'documentation', source: 'platform.openai.com', url: 'https://platform.openai.com/docs/guides/structured-outputs', description: 'JSON schemas and strict mode.', difficulty: 'beginner', estimatedMinutes: 90, priority: 'high' },
      { id: 'res-2', title: 'OpenAI Function Calling Guide', kind: 'documentation', source: 'platform.openai.com', url: 'https://platform.openai.com/docs/guides/function-calling', description: 'Tools, schemas, and round-trips.', difficulty: 'beginner', estimatedMinutes: 60, priority: 'high' },
      { id: 'res-3', title: 'Anthropic Tool Use', kind: 'documentation', source: 'docs.anthropic.com', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use', description: 'Tool use patterns.', difficulty: 'beginner', estimatedMinutes: 60, priority: 'high' },
      { id: 'res-4', title: 'Pydantic', kind: 'documentation', source: 'docs.pydantic.dev', url: 'https://docs.pydantic.dev/latest/', description: 'Schema-validate model outputs in Python.', difficulty: 'beginner', estimatedMinutes: 60, priority: 'medium' },
      { id: 'res-5', title: 'JSON Schema: What is JSON Schema?', kind: 'documentation', source: 'json-schema.org', url: 'https://json-schema.org/overview/what-is-jsonschema', description: 'Foundations of schema validation.', difficulty: 'beginner', estimatedMinutes: 30, priority: 'medium' },
      { id: 'res-6', title: 'Pydantic Validators', kind: 'documentation', source: 'docs.pydantic.dev', url: 'https://docs.pydantic.dev/latest/concepts/validators/', description: 'Field-level validation hooks and patterns.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Structured Extraction', problem: 'Extract typed entities from unstructured text.', whyItMatters: 'Foundation for all agentic workflows.', prerequisites: ['LLM API basics'], requirements: [
          { id: 'r1', text: 'Define a JSON schema (e.g., persons with name/age/role)' },
          { id: 'r2', text: 'Request structured output' },
          { id: 'r3', text: 'Validate with pydantic' },
          { id: 'r4', text: 'Handle malformed output' },
        ], hints: 'Combine response_format with pydantic validation.', expectedOutput: 'A function text → validated typed objects.', acceptanceCriteria: [
          { id: 'a1', text: 'Output always parses to the model' },
          { id: 'a2', text: 'Invalid input is reported' },
        ], skillsPracticed: ['Structured outputs', 'Validation'], estimatedMinutes: 90, difficulty: 'beginner' },
      {
        id: 'lab-2', title: 'Calculator Tool', problem: 'Implement a function-calling round trip with a calculator.', whyItMatters: 'Shows tooling mechanics end to end.', prerequisites: ['Function calling'], requirements: [
          { id: 'r1', text: 'Define a calculator schema (expr) ' },
          { id: 'r2', text: 'Model requests a call' },
          { id: 'r3', text: 'Execute safely (restricted eval)' },
          { id: 'r4', text: 'Return result and continue the loop' },
          { id: 'r5', text: 'Guard against injection in expressions' },
        ], hints: 'Never eval user text; parse the expression AST or use a safe evaluator.', expectedOutput: 'A fully working tool round trip with error recovery.', acceptanceCriteria: [
          { id: 'a1', text: 'Loop terminates naturally or on max iterations' },
          { id: 'a2', text: 'Malicious expressions are rejected' },
        ], skillsPracticed: ['Function calling', 'Tool execution', 'Safety'], estimatedMinutes: 120, difficulty: 'intermediate' },
      {
        id: 'lab-3', title: 'Multi-Tool Agent', problem: 'Expose multiple tools (weather, search, files) to the model.', whyItMatters: 'Real agents choose among tools.', prerequisites: ['Lab 2'], requirements: [
          { id: 'r1', text: 'Registry mapping names to handlers' },
          { id: 'r2', text: 'Permission gating per tool' },
          { id: 'r3', text: 'Schema introspection for the model' },
          { id: 'r4', text: 'Consistent tool-result shape' },
          { id: 'r5', text: 'Cap tool-result size in context' },
        ], hints: 'Design ToolResult dataclass with status, data, metadata.', expectedOutput: 'An agent that picks correct tools across a session.', acceptanceCriteria: [
          { id: 'a1', text: 'Tools are independently testable' },
          { id: 'a2', text: 'Unavailable tools are handled gracefully' },
        ], skillsPracticed: ['Tool systems', 'Abstraction', 'Context management'], estimatedMinutes: 150, difficulty: 'intermediate' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Validation-First Agent Toolkit', problem: 'Assemble a reusable toolkit: structured outputs + tools + validation.', requirements: [
        { id: 'r1', text: 'Declarative tool definitions from schemas' },
        { id: 'r2', text: 'Automatic output validation' },
        { id: 'r3', text: 'Retry on validation failure' },
        { id: 'r4', text: 'Observability hooks' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'Add a new tool in <10 lines' },
        { id: 'a2', text: 'Bad schema output auto-retried' },
      ], skillsPracticed: ['Structured outputs', 'Tool engineering'], estimatedHours: 4 },
    repositories: [
      {
        id: 'repo-1', name: 'pydantic-ai', url: 'https://github.com/pydantic/pydantic-ai', whyStudy: 'Type-safe agent framework built around structured outputs.', whatToLookFor: 'Tool registration, result validation, dependency injection.', importantFiles: ['pydantic_ai/tools.py', 'pydantic_ai/result.py'], concepts: ['Schema-driven tools', 'Dynamic tools', 'Result validation'], guidedSteps: [
          { id: 's1', text: 'Read README quickstart' },
          { id: 's2', text: 'Study how tools are typed' },
          { id: 's3', text: 'Trace a validated result' },
          { id: 's4', text: 'Note retry on validation error' },
        ] },
    ],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'What problem does structured output solve?', options: ['Speed', 'Non-deterministic text shape', 'Model cost', 'Prompt length'], correctOption: 1, idealAnswer: 'Guarantees a parseable, schema-conformant shape' },
      { id: 'q2', type: 'short_answer', question: 'Why validate tool results before feeding back to the model?', idealAnswer: 'Prevent breaking context with malformed data and limit injection surface' },
      { id: 'q3', type: 'architecture', question: 'Design permissioning for a file-system tool exposed to an agent.', idealAnswer: 'Scoped virtual paths, allow-list operations, generated symlink-safe paths, audit logs' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'Compare function calling vs structured output on the same response.', idealAnswer: 'Function calls encode multiple candidate calls; structured output enforces one schema on the reply' },
      { id: 'iq-2', question: 'How do you keep tool schemas from blowing up the context window?', idealAnswer: 'Lazy loading, essential-only fields, caching schemas' },
      { id: 'iq-3', question: 'What happens when the model returns a tool call with invalid args?', idealAnswer: 'Validate, surface typed error to model, allow it to retry' },
    ],
  },

  'embeddings-token-management': {
    topicId: 'rm-8',
    introduction: 'Understand tokenization, context windows, embeddings, similarity, chunking, and cost—the substrate of RAG.',
    estimatedHours: 20,
    difficulty: 'intermediate',
    objectives: [
      { id: 'obj-1', text: 'Explain tokenization and context windows' },
      { id: 'obj-2', text: 'Count tokens for different models' },
      { id: 'obj-3', text: 'Understand embeddings and similarity' },
      { id: 'obj-4', text: 'Compare chunking strategies' },
      { id: 'obj-5', text: 'Estimate and optimize cost' },
    ],
    resources: [
      { id: 'res-1', title: 'OpenAI Embeddings Guide', kind: 'documentation', source: 'platform.openai.com', url: 'https://platform.openai.com/docs/guides/embeddings', description: 'Embeddings use cases and best practices.', difficulty: 'beginner', estimatedMinutes: 60, priority: 'high' },
      { id: 'res-2', title: 'OpenAI: What are tokens?', kind: 'documentation', source: 'help.openai.com', url: 'https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them', description: 'Token fundamentals.', difficulty: 'beginner', estimatedMinutes: 20, priority: 'high' },
      { id: 'res-3', title: 'tiktoken', kind: 'repository', source: 'github.com', url: 'https://github.com/openai/tiktoken', description: 'Byte-pair tokenizer for OpenAI models.', difficulty: 'beginner', estimatedMinutes: 40, priority: 'medium' },
      { id: 'res-4', title: 'Embeddings: meaning beyond tokens', kind: 'blog', source: 'openai.com', url: 'https://openai.com/index/embeddings/', description: 'Why embeddings capture semantics.', difficulty: 'beginner', estimatedMinutes: 30, priority: 'medium' },
      { id: 'res-5', title: 'Sentence-Transformers Documentation', kind: 'documentation', source: 'sbert.net', url: 'https://sbert.net/', description: 'High-quality sentence embeddings in Python.', difficulty: 'beginner', estimatedMinutes: 60, priority: 'medium' },
      { id: 'res-6', title: 'Hugging Face NLP Course: Tokenizers', kind: 'tutorial', source: 'huggingface.co', url: 'https://huggingface.co/learn/nlp-course/en/chapter6/3', description: 'How subword tokenizers actually work.', difficulty: 'intermediate', estimatedMinutes: 60, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Token Counter', problem: 'Build an exact token counter + cost estimator.', whyItMatters: 'Every context budget starts with token counting.', prerequisites: ['tiktoken'], requirements: [
          { id: 'r1', text: 'Use correct tokenizer per model' },
          { id: 'r2', text: 'Estimate cost from a pricing table' },
          { id: 'r3', text: 'Handle multibyte/text truncation' },
          { id: 'r4', text: 'CLI + simple API' },
        ], hints: 'Keep the pricing table in one config file.', expectedOutput: 'Counter returning tokens and cost for any text.', acceptanceCriteria: [
          { id: 'a1', text: 'Matches OpenAI\'s tokenizer output' },
          { id: 'a2', text: 'Truncation respects token limit' },
        ], skillsPracticed: ['Token management', 'Tooling'], estimatedMinutes: 90, difficulty: 'beginner' },
      {
        id: 'lab-2', title: 'Embedding Search', problem: 'Index a corpus and search by similarity.', whyItMatters: 'Core RAG primitive.', prerequisites: ['Embeddings', 'Vector similarity'], requirements: [
          { id: 'r1', text: 'Embed documents in chunks' },
          { id: 'r2', text: 'Store vectors (list or simple store)' },
          { id: 'r3', text: 'Implement cosine similarity search' },
          { id: 'r4', text: 'Return top-k with scores' },
          { id: 'r5', text: 'Write a small evaluation check' },
        ], hints: 'Normalize vectors for cosine == dot product.', expectedOutput: 'A corpus search returning ranked results.', acceptanceCriteria: [
          { id: 'a1', text: 'Relevant document surfaces for a probe query' },
          { id: 'a2', text: 'Search is deterministic given the corpus' },
        ], skillsPracticed: ['Embeddings', 'Retrieval'], estimatedMinutes: 120, difficulty: 'intermediate' },
      {
        id: 'lab-3', title: 'Chunking Experiment', problem: 'Compare chunking strategies on task accuracy.', whyItMatters: 'Chunk choice materially changes RAG quality.', prerequisites: ['Embedding search'], requirements: [
          { id: 'r1', text: 'Fixed vs semantic vs recursive chunkers' },
          { id: 'r2', text: 'Multiple chunk sizes/overlaps' },
          { id: 'r3', text: 'Evaluate retrieval hit rate on golden questions' },
          { id: 'r4', text: 'Report tokens-per-query impact' },
        ], hints: 'Build a tiny golden set of question→chunk mappings.', expectedOutput: 'A comparison table of strategy vs hit-rate vs cost.', acceptanceCriteria: [
          { id: 'a1', text: 'Reproducible results' },
          { id: 'a2', text: 'Recommendation stated with data' },
        ], skillsPracticed: ['Chunking', 'Evaluation'], estimatedMinutes: 150, difficulty: 'intermediate' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Cost-Aware Mini RAG', problem: 'Combine token counting, embedding, and chunking into a mini RAG with reported cost.', requirements: [
        { id: 'r1', text: 'Ingest pipeline with metrics' },
        { id: 'r2', text: 'Per-query token/cost report' },
        { id: 'r3', text: 'Configurable chunk strategy' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'End-to-end Q&A works' },
        { id: 'a2', text: 'Cost visible per query' },
      ], skillsPracticed: ['RAG', 'Cost optimization'], estimatedHours: 5 },
    repositories: [
      {
        id: 'repo-1', name: 'tiktoken', url: 'https://github.com/openai/tiktoken', whyStudy: 'Understand BPE tokenization models use.', whatToLookFor: 'Encoding registry, merge resolution.', importantFiles: ['src/tiktoken/core.py'], concepts: ['BPE', 'Special tokens'], guidedSteps: [
          { id: 's1', text: 'Read README' },
          { id: 's2', text: 'Trace encode() on a sample' },
          { id: 's3', text: 'Note special token handling' },
          { id: 's4', text: 'Compare encodings across models' },
        ] },
    ],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'Cosine similarity between normalized embeddings equals…?', options: ['Euclidean distance', 'Dot product', 'Manhattan distance', 'Rank'], correctOption: 1, idealAnswer: 'Dot product when vectors are unit-normalized' },
      { id: 'q2', type: 'short_answer', question: 'Why chunk before embedding long documents?', idealAnswer: 'Model context limits + focused semantics for retrieval' },
      { id: 'q3', type: 'architecture', question: 'Design a cost cap for an embedding pipeline.', idealAnswer: 'Estimate tokens via tiktoken, budget per doc, cache embeddings, dedupe, log spend' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'Embeddings vs bag-of-words?', idealAnswer: 'Dense learned semantics vs sparse lexical; embeddings capture context' },
      { id: 'iq-2', question: 'What do tokens represent?', idealAnswer: 'Subword units; roughly 3-4 chars or ~0.75 English words' },
    ],
  },

  'agent-loops-state-management': {
    topicId: 'rm-9',
    introduction: 'Build autonomous agents: the observe→think→act loop, state tracking, planning, termination, and failure recovery.',
    estimatedHours: 25,
    difficulty: 'intermediate',
    objectives: [
      { id: 'obj-1', text: 'Explain the agent loop primitives' },
      { id: 'obj-2', text: 'Design agent state and transitions' },
      { id: 'obj-3', text: 'Implement planning and tool execution' },
      { id: 'obj-4', text: 'Implement termination and max-iteration guards' },
      { id: 'obj-5', text: 'Build failure recovery and retries' },
      { id: 'obj-6', text: 'Persist and resume agent state' },
    ],
    resources: [
      { id: 'res-1', title: 'OpenAI Agents SDK Guide', kind: 'documentation', source: 'openai.github.io', url: 'https://openai.github.io/openai-agents-python/', description: 'Official agents framework docs.', difficulty: 'beginner', estimatedMinutes: 120, priority: 'high' },
      { id: 'res-2', title: 'LangGraph Concepts', kind: 'documentation', source: 'langchain-ai.github.io', url: 'https://langchain-ai.github.io/langgraph/concepts/', description: 'State machines and graphs for agents.', difficulty: 'intermediate', estimatedMinutes: 120, priority: 'high' },
      { id: 'res-3', title: 'LangGraph 101', kind: 'repository', source: 'github.com', url: 'https://github.com/langchain-ai/langgraph-101', description: 'Hands-on repository teaching LangGraph.', difficulty: 'intermediate', estimatedMinutes: 90, priority: 'high' },
      { id: 'res-4', title: 'Building Effective Agents', kind: 'article', source: 'anthropic.com', url: 'https://www.anthropic.com/research/building-effective-agents', description: 'Anthropic\'s agent design principles.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'high' },
      { id: 'res-5', title: 'OpenAI Agents SDK: Tracing', kind: 'documentation', source: 'openai.github.io', url: 'https://openai.github.io/openai-agents-python/tracing/', description: 'Trace agent runs for debugging and evaluation.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'medium' },
      { id: 'res-6', title: 'LangGraph Persistence', kind: 'documentation', source: 'langchain-ai.github.io', url: 'https://langchain-ai.github.io/langgraph/concepts/persistence/', description: 'Checkpointing agent state across steps.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Basic Agent Loop', problem: 'Implement a minimal agent loop from scratch.', whyItMatters: 'Understand loops before using frameworks.', prerequisites: ['Structured outputs'], requirements: [
          { id: 'r1', text: 'Loop: call model → tool results → next call' },
          { id: 'r2', text: 'Maintain a message history' },
          { id: 'r3', text: 'Stop on tool-less final answer' },
          { id: 'r4', text: 'Halt after N iterations' },
          { id: 'r5', text: 'Print reasoning trace' },
        ], hints: 'Treat tool invocation as a first-class message.', expectedOutput: 'An agent that answers a multi-step question.', acceptanceCriteria: [
          { id: 'a1', text: 'Max iterations enforced' },
          { id: 'a2', text: 'Trace is readable' },
        ], skillsPracticed: ['Agent loops', 'LLM APIs'], estimatedMinutes: 120, difficulty: 'intermediate' },
      {
        id: 'lab-2', title: 'Stateful Agent', problem: 'Add typed state that persists across loop steps.', whyItMatters: 'Production agents need structured state.', prerequisites: ['Lab 1'], requirements: [
          { id: 'r1', text: 'Define a state schema (pydantic)' },
          { id: 'r2', text: 'Update state after each step' },
          { id: 'r3', text: 'Handoff state between tool calls' },
          { id: 'r4', text: 'Checkpoint state to disk/JSON' },
        ], hints: 'Keep state in a reducer-like update that always returns a validated model.', expectedOutput: 'An agent that survives a restart mid-task.', acceptanceCriteria: [
          { id: 'a1', text: 'Checkpoint/resume works' },
          { id: 'a2', text: 'State invariants hold' },
        ], skillsPracticed: ['State management', 'Persistence'], estimatedMinutes: 120, difficulty: 'intermediate' },
      {
        id: 'lab-3', title: 'Retry/Recovery System', problem: 'Make the agent recover from tool failures.', whyItMatters: 'Real tools fail constantly.', prerequisites: ['Lab 2'], requirements: [
          { id: 'r1', text: 'Classify failures (transient vs fatal)' },
          { id: 'r2', text: 'Retry with backoff' },
          { id: 'r3', text: 'Feed structured error back to model' },
          { id: 'r4', text: 'Circuit-break after repeated failure' },
          { id: 'r5', text: 'Log recovery decisions' },
        ], hints: 'Distinguish tool-crash vs model-error paths.', expectedOutput: 'Agent completes despite injected failures.', acceptanceCriteria: [
          { id: 'a1', text: 'Consecutive failures stop the loop safely' },
          { id: 'a2', text: 'Recovery observable in logs' },
        ], skillsPracticed: ['Reliability', 'Error handling'], estimatedMinutes: 120, difficulty: 'advanced' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Stateful Task Execution Agent', problem: 'Build a production-flavored agent executing a project task list.', requirements: [
        { id: 'r1', text: 'Plan → execute → verify stages' },
        { id: 'r2', text: 'Persistent state' },
        { id: 'r3', text: 'Failure recovery' },
        { id: 'r4', text: 'Action logging' },
        { id: 'r5', text: 'Resume from checkpoint' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'Completes a compound task' },
        { id: 'a2', text: 'Restart continues, not redoes' },
      ], skillsPracticed: ['Agent loops', 'State', 'Planning'], estimatedHours: 6 },
    repositories: [
      {
        id: 'repo-1', name: 'openai-agents-python', url: 'https://github.com/openai/openai-agents-python', whyStudy: 'Reference production agent SDK.', whatToLookFor: 'Loop, guards, handoffs, tracing.', importantFiles: ['src/agents/run.py', 'src/agents/agent.py'], concepts: ['Agents', 'Handoffs', 'Guardrails', 'Tracing'], guidedSteps: [
          { id: 's1', text: 'Read README and quickstart' },
          { id: 's2', text: 'Understand Agent and Runner' },
          { id: 's3', text: 'Study handoffs' },
          { id: 's4', text: 'Study guardrails and input processing' },
          { id: 's5', text: 'Read lifecycle hooks (Tracing)' },
          { id: 's6', text: 'Build your own implementation' },
        ] },
      {
        id: 'repo-2', name: 'langgraph', url: 'https://github.com/langchain-ai/langgraph', whyStudy: 'Graph/state-machine approach to agents.', whatToLookFor: 'StateGraph, reducers, persistence.', importantFiles: ['libs/langgraph/langgraph/graph/state.py'], concepts: ['StateGraph', 'Reducers', 'Checkpointers'], guidedSteps: [
          { id: 's1', text: 'Read README' },
          { id: 's2', text: 'Understand StateGraph' },
          { id: 's3', text: 'Build a basic graph' },
          { id: 's4', text: 'Study persistence/checkpointing' },
          { id: 's5', text: 'Study human-in-the-loop' },
          { id: 's6', text: 'Read relevant examples' },
          { id: 's7', text: 'Build your own implementation' },
        ] },
    ],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'Why cap agent iterations?', options: ['Cost control', 'Prevent infinite loops', 'Latency budget', 'All of the above'], correctOption: 3, idealAnswer: 'Prevents runaway cost and non-termination' },
      { id: 'q2', type: 'short_answer', question: 'State vs history in an agent?', idealAnswer: 'History is raw messages; state is validated structured data used for decisions' },
      { id: 'q3', type: 'architecture', question: 'Design an agent that must be resumable after a server crash.', idealAnswer: 'Checkpoint full state per step + idempotent tool side effects + resume entry point' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'What are common failure modes of agent loops?', idealAnswer: 'Loops, drift, cost explosion, tool errors, unverified outputs' },
      { id: 'iq-2', question: 'When is a state graph better than a simple while loop?', idealAnswer: 'Branching, shared state, persistence, HITL, and controllable transitions' },
    ],
  },

  'tool-integration': {
    topicId: 'rm-10',
    introduction: 'Give agents superpowers through tools: schemas, selection, execution, permissions, validation, and result hygiene.',
    estimatedHours: 20,
    difficulty: 'intermediate',
    objectives: [
      { id: 'obj-1', text: 'Write precise tool schemas' },
      { id: 'obj-2', text: 'Implement tool selection and dispatch' },
      { id: 'obj-3', text: 'Handle tool errors and partial results' },
      { id: 'obj-4', text: 'Enforce permission boundaries' },
      { id: 'obj-5', text: 'Sanitize tool results for context' },
      { id: 'obj-6', text: 'Validate/limit tool arguments' },
    ],
    resources: [
      { id: 'res-1', title: 'OpenAI Function Calling Guide', kind: 'documentation', source: 'platform.openai.com', url: 'https://platform.openai.com/docs/guides/function-calling', description: 'Core tool definition patterns.', difficulty: 'beginner', estimatedMinutes: 60, priority: 'high' },
      { id: 'res-2', title: 'Anthropic Tool Use', kind: 'documentation', source: 'docs.anthropic.com', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use', description: 'Tool use on Claude.', difficulty: 'beginner', estimatedMinutes: 60, priority: 'high' },
      { id: 'res-3', title: 'OpenAI Agents SDK: Tools', kind: 'documentation', source: 'openai.github.io', url: 'https://openai.github.io/openai-agents-python/tools/', description: 'Tool abstractions in the SDK.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'medium' },
      { id: 'res-4', title: 'Anthropic: Why tool use can fail', kind: 'blog', source: 'anthropic.com', url: 'https://www.anthropic.com/engineering/browser-use-tactics', description: 'Real-world tool reliability lessons.', difficulty: 'intermediate', estimatedMinutes: 40, priority: 'medium' },
      { id: 'res-5', title: 'OpenAI Agents SDK: Tools', kind: 'documentation', source: 'openai.github.io', url: 'https://openai.github.io/openai-agents-python/tools/', description: 'Tool abstractions and function schemas.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'medium' },
      { id: 'res-6', title: 'Pydantic AI: Tools', kind: 'documentation', source: 'ai.pydantic.dev', url: 'https://ai.pydantic.dev/tools/', description: 'Type-safe tool definitions and validation.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Weather Tool', problem: 'Expose a weather tool to the agent.', whyItMatters: 'Enough complexity to show schema + execution.', prerequisites: ['Function calling'], requirements: [
          { id: 'r1', text: 'Schema with city/units params' },
          { id: 'r2', text: 'Real or mocked provider call' },
          { id: 'r3', text: 'Return structured WeatherResult' },
          { id: 'r4', text: 'Timeout + error path' },
        ], hints: 'Mock provider in tests; keep interface tiny.', expectedOutput: 'Agent answers "what\'s the weather" using the tool.', acceptanceCriteria: [
          { id: 'a1', text: 'Tool result reaches the model' },
          { id: 'a2', text: 'Provider failure surfaces an error' },
        ], skillsPracticed: ['Tool schemas', 'Errors'], estimatedMinutes: 90, difficulty: 'beginner' },
      {
        id: 'lab-2', title: 'Database Tool', problem: 'Safe read-only query tool over a database.', whyItMatters: 'DB tools need strict guardrails.', prerequisites: ['SQL'], requirements: [
          { id: 'r1', text: 'Allow only SELECT' },
          { id: 'r2', text: 'Limit rows and time' },
          { id: 'r3', text: 'Parametrized access, no raw input concat' },
          { id: 'r4', text: 'Return schema-typed rows' },
        ], hints: 'Rewrite user query into a constrained wrapper query.', expectedOutput: 'Agent answers questions from DB without data loss.', acceptanceCriteria: [
          { id: 'a1', text: 'Non-SELECT statements rejected' },
          { id: 'a2', text: 'Row caps enforced' },
          { id: 'a3', text: 'No SQL injection via tool args' },
        ], skillsPracticed: ['Permissions', 'Safety'], estimatedMinutes: 120, difficulty: 'intermediate' },
      {
        id: 'lab-3', title: 'File Tool', problem: 'A file read/write tool with a virtual workspace.', whyItMatters: 'File tools are among the riskiest.', prerequisites: ['Lab 2'], requirements: [
          { id: 'r1', text: 'Virtual root, path sandbox' },
          { id: 'r2', text: 'Allow-list operations' },
          { id: 'r3', text: 'Size caps' },
          { id: 'r4', text: 'Audit log of every op' },
        ], hints: 'Resolve paths then verify containment.', expectedOutput: 'Agent edits files without escaping sandbox.', acceptanceCriteria: [
          { id: 'a1', text: 'Paths outside root rejected' },
          { id: 'a2', text: 'Ops audited' },
        ], skillsPracticed: ['Sandboxing', 'Security'], estimatedMinutes: 120, difficulty: 'advanced' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Multi-Tool Agent Runtime', problem: 'A runtime with registry, permissions, validation, and result shaping.', requirements: [
        { id: 'r1', text: 'Declarative tool registry' },
        { id: 'r2', text: 'Per-tool permission policies' },
        { id: 'r3', text: 'Result size/budget control' },
        { id: 'r4', text: 'Testing each tool in isolation' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'Adding tools is declarative' },
        { id: 'a2', text: 'Context budget respected after big results' },
      ], skillsPracticed: ['Tool engineering', 'Context management'], estimatedHours: 5 },
    repositories: [
      {
        id: 'repo-1', name: 'modelcontextprotocol/sdks', url: 'https://github.com/modelcontextprotocol/python-sdk', whyStudy: 'Standardized tool protocol.', whatToLookFor: 'Server/client shape, message protocol.', importantFiles: ['src/mcp/server/lowlevel/server.py'], concepts: ['Tools', 'Resources', 'Prompts'], guidedSteps: [
          { id: 's1', text: 'Read MCP official docs' },
          { id: 's2', text: 'Study server implementation' },
          { id: 's3', text: 'Run an example server' },
          { id: 's4', text: 'Write a client interacting with it' },
        ] },
    ],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'What is the purpose of a permission gate on tools?', options: ['Speed', 'Contain blast radius', 'Token savings', 'Aesthetics'], correctOption: 1, idealAnswer: 'Least privilege; limits damage from misuse or compromise' },
      { id: 'q2', type: 'mcq', question: 'How to prevent massive tool output from polluting context?', options: ['Ignore it', 'Summarize/truncate and cap size', 'Never use tools', 'Increase context window'], correctOption: 1, idealAnswer: 'Shrink, summarize, and budget tool results before injection' },
      { id: 'q3', type: 'short_answer', question: 'Validate tool args before execution?', idealAnswer: 'Yes — schema validity, bounds, and policy checks before side effects' },
      { id: 'q4', type: 'architecture', question: 'Design a tool plan where results must not leak secrets.', idealAnswer: 'Redact, allow-list fields, only include needed columns, never echo raw output' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'What to do when model invokes a tool with invalid args?', idealAnswer: 'Validate, return a typed error as tool result, allow the model to correct' },
      { id: 'iq-2', question: 'How to keep tool-count/context manageable as tools grow?', idealAnswer: 'Categorize tools, lazy-load schemas, only expose relevant subsets' },
    ],
  },

  'multi-agent-systems': {
    topicId: 'rm-11',
    introduction: 'Coordinate multiple agents: supervisor patterns, handoffs, parallelism, shared state, and knowing when NOT to use multi-agent.',
    estimatedHours: 25,
    difficulty: 'advanced',
    objectives: [
      { id: 'obj-1', text: 'Distinguish single vs multi-agent trade-offs' },
      { id: 'obj-2', text: 'Design supervisor and worker patterns' },
      { id: 'obj-3', text: 'Implement handoffs between agents' },
      { id: 'obj-4', text: 'Run parallel and sequential agent pipelines' },
      { id: 'obj-5', text: 'Manage shared state safely' },
      { id: 'obj-6', text: 'Handle failures across agents' },
      { id: 'obj-7', text: 'Identify when multi-agent is overkill' },
    ],
    resources: [
      { id: 'res-1', title: 'OpenAI Agents SDK: Handoffs', kind: 'documentation', source: 'openai.github.io', url: 'https://openai.github.io/openai-agents-python/handoffs/', description: 'Handoff mechanics.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'high' },
      { id: 'res-2', title: 'OpenAI Agents SDK: Multi-agent architecture', kind: 'documentation', source: 'openai.github.io', url: 'https://openai.github.io/openai-agents-python/agents/architecture/', description: 'Reference multi-agent patterns.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'high' },
      { id: 'res-3', title: 'LangGraph Multi-Agent', kind: 'documentation', source: 'langchain-ai.github.io', url: 'https://langchain-ai.github.io/langgraph/concepts/multi_agent/', description: 'Multi-agent graph patterns.', difficulty: 'advanced', estimatedMinutes: 60, priority: 'high' },
      { id: 'res-4', title: 'Anthropic: Multi-agent research system', kind: 'blog', source: 'anthropic.com', url: 'https://www.anthropic.com/engineering/multi-agent-research-system', description: 'Real multi-agent system write-up.', difficulty: 'intermediate', estimatedMinutes: 40, priority: 'medium' },
      { id: 'res-5', title: 'OpenAI Swarm', kind: 'repository', source: 'github.com', url: 'https://github.com/openai/swarm', description: 'Lightweight multi-agent handoff framework.', difficulty: 'intermediate', estimatedMinutes: 60, priority: 'medium' },
      { id: 'res-6', title: 'CrewAI', kind: 'repository', source: 'github.com', url: 'https://github.com/crewAIInc/crewAI', description: 'Role-based agent teams for collaborative tasks.', difficulty: 'intermediate', estimatedMinutes: 60, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Research Agent Team', problem: 'Researcher + analyst + writer agents cooperating on a report.', whyItMatters: 'The canonical specialization demo.', prerequisites: ['Agents', 'Tools'], requirements: [
          { id: 'r1', text: 'Separate roles with distinct system prompts' },
          { id: 'r2', text: 'Pass research results between agents' },
          { id: 'r3', text: 'Writer consumes analyst summaries only' },
          { id: 'r4', text: 'Trace each hop' },
        ], hints: 'Keep interface between agents as structured data.', expectedOutput: 'A researched, structured report.', acceptanceCriteria: [
          { id: 'a1', text: 'Each agent has clear duties' },
          { id: 'a2', text: 'No prompt leakage between roles' },
        ], skillsPracticed: ['Multi-agent', 'Handoffs'], estimatedMinutes: 150, difficulty: 'intermediate' },
      {
        id: 'lab-2', title: 'Supervisor Architecture', problem: 'A supervisor routes tasks to specialist workers.', whyItMatters: 'Scales to many specialists.', prerequisites: ['Lab 1'], requirements: [
          { id: 'r1', text: 'Supervisor picks worker by task type' },
          { id: 'r2', text: 'Workers return structured results' },
          { id: 'r3', text: 'Supervisor merges/decides next step' },
          { id: 'r4', text: 'Max delegation depth' },
          { id: 'r5', text: 'Fallback when no worker fits' },
        ], hints: 'Model supervisor as a policy layer over a worker registry.', expectedOutput: 'Misc task stream routed correctly.', acceptanceCriteria: [
          { id: 'a1', text: 'Routing is correct on golden tasks' },
          { id: 'a2', text: 'Delegation bounded' },
        ], skillsPracticed: ['Orchestration', 'Router design'], estimatedMinutes: 150, difficulty: 'advanced' },
      {
        id: 'lab-3', title: 'Single vs Multi-agent Benchmark', problem: 'Compare one general agent vs a multi-agent team.', whyItMatters: 'Prove necessity empirically.', prerequisites: ['Lab 2'], requirements: [
          { id: 'r1', text: 'Shared task set (e.g., 20 tasks)' },
          { id: 'r2', text: 'Shared budget cap' },
          { id: 'r3', text: 'Measure accuracy, cost, latency' },
          { id: 'r4', text: 'Report when multi-agent wins/loses' },
        ], hints: 'Include cheap simple tasks to show overhead.', expectedOutput: 'A comparison table with a clear recommendation.', acceptanceCriteria: [
          { id: 'a1', text: 'Metrics computed from logs' },
          { id: 'a2', text: 'Honest about trade-offs' },
        ], skillsPracticed: ['Evaluation', 'Systems thinking'], estimatedMinutes: 180, difficulty: 'advanced' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Planner/Researcher/Writer System', problem: 'A production-shaped content pipeline with failure isolation.', requirements: [
        { id: 'r1', text: 'Planner decomposes brief' },
        { id: 'r2', text: 'Researcher executes parallel subtasks' },
        { id: 'r3', text: 'Writer synthesizes' },
        { id: 'r4', text: 'Failure in one worker handling' },
        { id: 'r5', text: 'Observability throughout' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'One failed subtask doesn\'t sink the run' },
        { id: 'a2', text: 'Cost and latency reported' },
      ], skillsPracticed: ['Multi-agent', 'Planning', 'Reliability'], estimatedHours: 6 },
    repositories: [
      {
        id: 'repo-1', name: 'langgraph', url: 'https://github.com/langchain-ai/langgraph', whyStudy: 'Graph-native multi-agent coordination.', whatToLookFor: 'Supervisor, handoff, swarm patterns.', importantFiles: ['examples'], concepts: ['Supervisor', 'Swarm', 'Handoffs'], guidedSteps: [
          { id: 's1', text: 'Read multi-agent concepts' },
          { id: 's2', text: 'Run supervisor example' },
          { id: 's3', text: 'Study handoff example' },
          { id: 's4', text: 'Build a trio of your own' },
        ] },
    ],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'Main cost of multi-agent systems?', options: ['Coordination Friction', 'Increased latency/cost + coordination complexity', 'None', 'Model quality'], correctOption: 1, idealAnswer: 'More calls, more latency, harder to debug' },
      { id: 'q2', type: 'mcq', question: 'When is a single agent clearly better?', options: ['Simple focused tasks', 'Coordinated research', 'Parallel data collection', 'Large file processing'], correctOption: 0, idealAnswer: 'Overhead not justified for narrow tasks' },
      { id: 'q3', type: 'short_answer', question: 'How do agents share state safely?', idealAnswer: 'Structured validated messages + single writer per field + versioning' },
      { id: 'q4', type: 'architecture', question: 'Design failure handling across 5 worker agents.', idealAnswer: 'Per-worker retries, DLQ for bad tasks, supervisor fallback, degraded partial result' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'Supervisor vs swarm vs single chain — when each?', idealAnswer: 'Supervisor for routing, swarm for peer handoffs, single for linear work' },
      { id: 'iq-2', question: 'How do you prevent prompt/context leakage between agents?', idealAnswer: 'Structured interfaces, scope isolation, role-based system prompts, redaction' },
    ],
  },

  'context-selection-construction': {
    topicId: 'rm-12',
    introduction: 'What context is, context budgets, relevance ranking, assembly, and the art of giving an LLM exactly what it needs.',
    estimatedHours: 20,
    difficulty: 'intermediate',
    objectives: [
      { id: 'obj-1', text: 'Explain what context is and why it constrains quality' },
      { id: 'obj-2', text: 'Define and manage context budgets' },
      { id: 'obj-3', text: 'Rank relevance and select context' },
      { id: 'obj-4', text: 'Assemble system/user/task/tool context correctly' },
      { id: 'obj-5', text: 'Measure the impact of context choices' },
    ],
    resources: [
      { id: 'res-1', title: 'Anthropic: Effective Context Engineering for AI Agents', kind: 'blog', source: 'anthropic.com', url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents', description: 'The field\'s foundational write-up.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'high' },
      { id: 'res-2', title: 'Anthropic: Context Engineering with Claude', kind: 'article', source: 'anthropic.com', url: 'https://anthropic.com/engineering/context-engineering', description: 'Practical techniques for Claude.', difficulty: 'intermediate', estimatedMinutes: 40, priority: 'high' },
      { id: 'res-3', title: 'OpenAI: Prompt engineering guide', kind: 'documentation', source: 'platform.openai.com', url: 'https://platform.openai.com/docs/guides/prompt-engineering', description: 'System prompts and structure.', difficulty: 'beginner', estimatedMinutes: 60, priority: 'medium' },
      { id: 'res-4', title: 'The Curse of Recursion in LLMs', kind: 'paper', source: 'arxiv.org', url: 'https://arxiv.org/abs/2410.21687', description: 'How irrelevant context degrades reasoning.', difficulty: 'advanced', estimatedMinutes: 40, priority: 'medium' },
      { id: 'res-5', title: 'Needle In A Haystack Testing', kind: 'tutorial', source: 'github.com', url: 'https://github.com/gkamradt/LLMTest_NeedleInAHaystack', description: 'Probe long-context retrieval accuracy.', difficulty: 'advanced', estimatedMinutes: 60, priority: 'medium' },
      { id: 'res-6', title: 'OpenAI: Prompt caching', kind: 'documentation', source: 'platform.openai.com', url: 'https://platform.openai.com/docs/guides/prompt-caching', description: 'Cut cost and latency on stable context prefixes.', difficulty: 'intermediate', estimatedMinutes: 30, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Context Selector', problem: 'Build a component that selects the best subset of available context.', whyItMatters: 'Selection before construction.', prerequisites: ['Embeddings'], requirements: [
          { id: 'r1', text: 'Score candidate context by relevance' },
          { id: 'r2', text: 'Respect a token budget' },
          { id: 'r3', text: 'Return selected + rejected with reasons' },
          { id: 'r4', text: 'Deterministic under same inputs' },
        ], hints: 'Budget-aware greedy selection from scored items.', expectedOutput: 'Selector producing optimal-priced context given limits.', acceptanceCriteria: [
          { id: 'a1', text: 'Budget always respected' },
          { id: 'a2', text: 'Selection explainable' },
        ], skillsPracticed: ['Context selection', 'Retrieval'], estimatedMinutes: 120, difficulty: 'intermediate' },
      {
        id: 'lab-2', title: 'Relevance Ranking', problem: 'Rank candidate context snippets against a query.', whyItMatters: 'Ranking > raw retrieval.', prerequisites: ['Embeddings'], requirements: [
          { id: 'r1', text: 'Implement embedding cosine + optional reranker' },
          { id: 'r2', text: 'Evaluate ranking on a golden set' },
          { id: 'r3', text: 'Compare with lexical BM25-style baseline' },
          { id: 'r4', text: 'Report NDCG@k' },
        ], hints: 'Keep eval set tiny (~30 queries) for lab.', expectedOutput: 'Ranker with measured quality vs baseline.', acceptanceCriteria: [
          { id: 'a1', text: 'NDCG reported' },
          { id: 'a2', text: 'Baseline vs improved compared' },
        ], skillsPracticed: ['Ranking', 'Evaluation'], estimatedMinutes: 120, difficulty: 'advanced' },
      {
        id: 'lab-3', title: 'Context Builder', problem: 'Assemble a final context = system + instructions + task + selected docs + tool info.', whyItMatters: 'Order and structure change behavior.', prerequisites: ['Lab 1'], requirements: [
          { id: 'r1', text: 'Templated assembly with sections' },
          { id: 'r2', text: 'Deduplicate overlapping context' },
          { id: 'r3', text: 'Track assembled token counts per section' },
          { id: 'r4', text: 'Emit a builder audit trail' },
        ], hints: 'Compute per-section budget and resize down if over.', expectedOutput: 'A builder with visible per-section budgets.', acceptanceCriteria: [
          { id: 'a1', text: 'Total <= budget' },
          { id: 'a2', text: 'Sections labeled and sized' },
        ], skillsPracticed: ['Context construction', 'Token management'], estimatedMinutes: 120, difficulty: 'intermediate' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Context Budget Optimizer', problem: 'Tool that optimizes a fixed budget across competing context needs.', requirements: [
        { id: 'r1', text: 'Configurable budget per source type' },
        { id: 'r2', text: 'Auto-adjust when over budget' },
        { id: 'r3', text: 'Compare option quality vs cost' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'Deterministic output' },
        { id: 'a2', text: 'Trade-off visible' },
      ], skillsPracticed: ['Context engineering', 'Optimization'], estimatedHours: 5 },
    repositories: [],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'Why does irrelevant context hurt LLM outputs?', options: ['Slower only', 'Distracts attention → quality drop', 'No effect', 'Improves it'], correctOption: 1, idealAnswer: 'Attention dilutes; measured in models like lost-in-the-middle' },
      { id: 'q2', type: 'short_answer', question: 'What is a context budget?', idealAnswer: 'The token allocation across system/task/retrieved context within model limits' },
      { id: 'q3', type: 'architecture', question: 'Order sections in a production system prompt.', idealAnswer: 'Identity → task → process → examples → constraints → available tools/data, stable first' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'Why does context selection matter more than prompt text alone?', idealAnswer: 'The content population of the budget determines what the model can ground on' },
      { id: 'iq-2', question: 'What are the main context primitives to engineer?', idealAnswer: 'System instructions, user task, tool results, retrieved docs, memory' },
      { id: 'iq-3', question: 'How do you measure context quality?', idealAnswer: 'End-task accuracy, faithfulness, cost/token, and ablated comparisons' },
    ],
  },

  'context-compression-pruning': {
    topicId: 'rm-13',
    introduction: 'Compress and prune context to fit budgets while preserving the information agents actually need.',
    estimatedHours: 20,
    difficulty: 'intermediate',
    objectives: [
      { id: 'obj-1', text: 'Explain why context becomes a bottleneck' },
      { id: 'obj-2', text: 'Implement conversation summarization' },
      { id: 'obj-3', text: 'Compress tool results' },
      { id: 'obj-4', text: 'Prune redundant context' },
      { id: 'obj-5', text: 'Measure information loss vs token reduction' },
      { id: 'obj-6', text: 'Compare compression strategies' },
      { id: 'obj-7', text: 'Design a production context strategy' },
    ],
    resources: [
      { id: 'res-1', title: 'Anthropic: Context engineering (compression/prompts)', kind: 'blog', source: 'anthropic.com', url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents', description: 'Includes pruning & compression guidance.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'high' },
      { id: 'res-2', title: 'OpenAI Cookbook: Shrinking context / summarization', kind: 'tutorial', source: 'cookbook.openai.com', url: 'https://cookbook.openai.com/examples/reduce_costs_by_summarizing_conversations', description: 'Summarize to reduce cost.', difficulty: 'intermediate', estimatedMinutes: 30, priority: 'high' },
      { id: 'res-3', title: 'Lost in the Middle', kind: 'paper', source: 'arxiv.org', url: 'https://arxiv.org/abs/2307.03172', description: 'Position effects that compression must respect.', difficulty: 'advanced', estimatedMinutes: 45, priority: 'medium' },
      { id: 'res-4', title: 'LLMLingua', kind: 'repository', source: 'github.com', url: 'https://github.com/microsoft/LLMLingua', description: 'Prompt compression library: 20x token reduction.', difficulty: 'advanced', estimatedMinutes: 60, priority: 'medium' },
      { id: 'res-5', title: 'LangChain: Summarize conversation history', kind: 'documentation', source: 'python.langchain.com', url: 'https://python.langchain.com/docs/how_to/summarize_conversation/', description: 'Patterns for compressing long dialogs.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Conversation Summarizer', problem: 'Summarize an ongoing conversation into running context.', whyItMatters: 'The classic memory strategy.', prerequisites: ['LLM APIs'], requirements: [
          { id: 'r1', text: 'Rolling summary updated incrementally' },
          { id: 'r2', text: 'Preserve facts, decisions, open questions' },
          { id: 'r3', text: 'Reconstruct answer from summary only' },
          { id: 'r4', text: 'Measure tokens saved and info loss' },
        ], hints: 'Prompt the model to output structured fields (facts/decisions/todos).', expectedOutput: 'A summarizer whose answers match full-context 80%+ on a test script.', acceptanceCriteria: [
          { id: 'a1', text: 'Token reduction reported' },
          { id: 'a2', text: 'Fact-retention evaluated' },
        ], skillsPracticed: ['Compression', 'Evaluation'], estimatedMinutes: 120, difficulty: 'intermediate' },
      {
        id: 'lab-2', title: 'Tool-Result Compressor', problem: 'Compress noisy tool outputs (JSON, logs, web) before injection.', whyItMatters: 'Tool bloat is a top context cost.', prerequisites: ['Structured outputs'], requirements: [
          { id: 'r1', text: 'Detect a concrete "answer" from a big tool result' },
          { id: 'r2', text: 'Drop irrelevant fields/columns' },
          { id: 'r3', text: 'Cap size with a budget' },
          { id: 'r4', text: 'Compare answer quality with/without compression' },
        ], hints: 'Use JSON schema to project only needed fields.', expectedOutput: 'A compressor that cuts tokens 5-10x with equal answer quality.', acceptanceCriteria: [
          { id: 'a1', text: 'Answer quality preserved on eval set' },
          { id: 'a2', text: 'Compression ratio reported' },
        ], skillsPracticed: ['Tool-result management', 'Compression'], estimatedMinutes: 120, difficulty: 'advanced' },
      {
        id: 'lab-3', title: 'Compression Strategy Benchmark', problem: 'Compare full vs summary vs retrieval vs hybrid on one task.', whyItMatters: 'The core Context Engineering Lab experiment.', prerequisites: ['Lab 1', 'Lab 2'], requirements: [
          { id: 'r1', text: 'Four strategies: full, summary, retrieval, hybrid' },
          { id: 'r2', text: 'Fixed task + golden answers' },
          { id: 'r3', text: 'Measure accuracy, tokens, cost, latency' },
          { id: 'r4', text: 'Chart the trade-offs' },
        ], hints: 'Reuse experiments data shapes from the existing Context Engineering Lab.', expectedOutput: 'Comparative tables/charts with a recommendation.', acceptanceCriteria: [
          { id: 'a1', text: 'All metrics logged per strategy' },
          { id: 'a2', text: 'Trade-off recommendation stated' },
        ], skillsPracticed: ['Benchmarking', 'Experimentation'], estimatedMinutes: 180, difficulty: 'advanced' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Context Optimizer', problem: 'An end-to-end tool choosing the best strategy per conversation state.', requirements: [
        { id: 'r1', text: 'Policy: when to compress vs retrieve vs keep full' },
        { id: 'r2', text: 'Auto budget enforcement' },
        { id: 'r3', text: 'Metrics dashboard' },
        { id: 'r4', text: 'Strategy switching mid-conversation' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'Quality maintained within budget' },
        { id: 'a2', text: 'Decisions logged and explainable' },
      ], skillsPracticed: ['Context engineering', 'Planning'], estimatedHours: 6 },
    repositories: [
      {
        id: 'repo-1', name: 'Mem0', url: 'https://github.com/mem0ai/mem0', whyStudy: 'Production memory with compression/extraction.', whatToLookFor: 'Memory extraction pipeline, relevance, decay.', importantFiles: ['mem0/memory/main.py'], concepts: ['Memory extraction', 'Scoring', 'Decay'], guidedSteps: [
          { id: 's1', text: 'Read README' },
          { id: 's2', text: 'Understand extraction pipeline' },
          { id: 's3', text: 'Study relevance scoring' },
          { id: 's4', text: 'Try a local SQLite run' },
        ] },
    ],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'What info should never be compressed?', options: ['Verbose logs', 'User instructions & critical constraints', 'Pricing tables', 'Anything'], correctOption: 1, idealAnswer: 'User-instructed constraints must stay verbatim' },
      { id: 'q2', type: 'short_answer', question: 'How to evaluate a summarization strategy?', idealAnswer: 'Task accuracy on golden questions + fact-recall + token/cost + loss audits' },
      { id: 'q3', type: 'short_answer', question: 'Risks of aggressive compression?', idealAnswer: 'Faithfulness loss, hallucination from missing grounding, constraint erosion' },
      { id: 'q4', type: 'architecture', question: 'Design tool-result bloat reduction for a long agent run.', idealAnswer: 'Budget + summarize + schema-projection + prune + keep audit trail of what was dropped' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'Why does context compression matter?', idealAnswer: 'Tighter budgets, lower cost/latency, less distraction, longer histories' },
      { id: 'iq-2', question: 'What should never be compressed?', idealAnswer: 'User constraints, instructions, identities, security-relevant statements' },
      { id: 'iq-3', question: 'How would you evaluate a summarization strategy?', idealAnswer: 'Fact retention, downstream task accuracy, token savings, embarrassing-failure audits' },
      { id: 'iq-4', question: 'How would you reduce tool-result bloat?', idealAnswer: 'Project schema fields, summarize, cap size, route only answering sub-slices' },
      { id: 'iq-5', question: 'Risks of aggressive compression?', idealAnswer: 'Loss of grounding → hallucination; violated constraints; irreversibility' },
    ],
  },

  'memory-systems': {
    topicId: 'rm-14',
    introduction: 'Working, short-term, episodic and semantic memory: how agents remember, retrieve, and forget—and how to evaluate memory quality.',
    estimatedHours: 20,
    difficulty: 'advanced',
    objectives: [
      { id: 'obj-1', text: 'Distinguish memory types and their roles' },
      { id: 'obj-2', text: 'Design working-memory management' },
      { id: 'obj-3', text: 'Build long-term memory with retrieval' },
      { id: 'obj-4', text: 'Handle memory conflicts and decay' },
      { id: 'obj-5', text: 'Evaluate memory relevance and precision' },
    ],
    resources: [
      { id: 'res-1', title: 'Mem0 Documentation', kind: 'documentation', source: 'docs.mem0.ai', url: 'https://docs.mem0.ai/', description: 'Production memory architecture.', difficulty: 'intermediate', estimatedMinutes: 60, priority: 'high' },
      { id: 'res-2', title: 'MemGPT (Letta) Paper', kind: 'paper', source: 'arxiv.org', url: 'https://arxiv.org/abs/2310.08560', description: 'OS-style memory hierarchy for agents.', difficulty: 'advanced', estimatedMinutes: 60, priority: 'medium' },
      { id: 'res-3', title: 'LangGraph Persistence', kind: 'documentation', source: 'langchain-ai.github.io', url: 'https://langchain-ai.github.io/langgraph/concepts/persistence/', description: 'Checkpointing and memory.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'medium' },
      { id: 'res-4', title: 'Letta (MemGPT)', kind: 'repository', source: 'github.com', url: 'https://github.com/letta-ai/letta', description: 'Agent platform with OS-style memory hierarchy.', difficulty: 'advanced', estimatedMinutes: 60, priority: 'medium' },
      { id: 'res-5', title: 'Mem0 Documentation', kind: 'documentation', source: 'docs.mem0.ai', url: 'https://docs.mem0.ai/', description: 'Memory layer APIs for agents.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Working-Memory Agent', problem: 'Agent that manages a bounded working memory.', whyItMatters: 'Replicates production short-term context.', prerequisites: ['Agent loops'], requirements: [
          { id: 'r1', text: 'Push/pop/evict operations' },
          { id: 'r2', text: 'Budget enforcement' },
          { id: 'r3', text: 'LRU/importance eviction' },
          { id: 'r4', text: 'Expose memory state each step' },
        ], hints: 'Importance score from model at write time.', expectedOutput: 'Memory that stays within budget over a long run.', acceptanceCriteria: [
          { id: 'a1', text: 'Budget respected' },
          { id: 'a2', text: 'Important items survive evictions' },
        ], skillsPracticed: ['Working memory', 'Agent loops'], estimatedMinutes: 120, difficulty: 'intermediate' },
      {
        id: 'lab-2', title: 'Long-Term Memory System', problem: 'Episodic + semantic memory over past sessions.', whyItMatters: 'Personalization across sessions.', prerequisites: ['Embeddings', 'IndexedDB/swappable store'], requirements: [
          { id: 'r1', text: 'Write episodes with metadata' },
          { id: 'r2', text: 'Aggregate semantic facts' },
          { id: 'r3', text: 'Retrieve by query' },
          { id: 'r4', text: 'Handle conflicts (updated facts)' },
          { id: 'r5', text: 'Decay stale entries' },
        ], hints: 'Keep store behind an interface (swap SQLite/local file).', expectedOutput: 'Agent recalls relevant prior facts in a session.', acceptanceCriteria: [
          { id: 'a1', text: 'Retrieval precision reasonable on demo' },
          { id: 'a2', text: 'Conflict resolution defined' },
        ], skillsPracticed: ['Long-term memory', 'Persistence', 'Retrieval'], estimatedMinutes: 150, difficulty: 'advanced' },
      {
        id: 'lab-3', title: 'Memory Evaluation', problem: 'Benchmark memory recall precision/recall.', whyItMatters: 'Trustworthy memory needs measurement.', prerequisites: ['Lab 2'], requirements: [
          { id: 'r1', text: 'Golden recall set' },
          { id: 'r2', text: 'Map answers to memory sources' },
          { id: 'r3', text: 'Measure precision, recall, faithfulness' },
          { id: 'r4', text: 'Compare retrieval strategies' },
        ], hints: 'Small eval: feed docs, later test recall.', expectedOutput: 'A memory eval report.', acceptanceCriteria: [
          { id: 'a1', text: 'Metrics meaningful and stable' },
          { id: 'a2', text: 'Baseline vs enhanced compared' },
        ], skillsPracticed: ['Evaluation', 'Recognition'], estimatedMinutes: 120, difficulty: 'advanced' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Persistent Study Assistant', problem: 'Assistant that remembers user interests across weeks.', requirements: [
        { id: 'r1', text: 'Episodic memory of sessions' },
        { id: 'r2', text: 'Semantic profile' },
        { id: 'r3', text: 'Retrieval into context' },
        { id: 'r4', text: 'Forgetting/decay configured' },
      ], acceptanceCriteria: [
        { id: 'a1', text: '2nd session references 1st session facts' },
        { id: 'a2', text: 'Incorrect memory can be corrected' },
      ], skillsPracticed: ['Memory', 'Persistence', 'Retrieval'], estimatedHours: 5 },
    repositories: [
      {
        id: 'repo-1', name: 'Mem0', url: 'https://github.com/mem0ai/mem0', whyStudy: 'Full memory stack reference.', whatToLookFor: 'Add/update/get flow.', importantFiles: ['mem0/memory/main.py'], concepts: ['Extraction', 'Summarization'], guidedSteps: [
          { id: 's1', text: 'Read README' },
          { id: 's2', text: 'Understand add() flow' },
          { id: 's3', text: 'Study update/merge of facts' },
          { id: 's4', text: 'Note storage backends' },
        ] },
    ],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'Working vs long-term memory?', options: ['Same thing', 'Short-scope active context vs durable store', 'Only names differ', 'Both in system prompt'], correctOption: 1, idealAnswer: 'Working = current task context; long-term = durable cross-session store' },
      { id: 'q2', type: 'short_answer', question: 'How to resolve contradictory stored facts?', idealAnswer: 'Version facts, trust recency+source authority, allow explicit correction' },
      { id: 'q3', type: 'architecture', question: 'Design a personalization memory bounded and private.', idealAnswer: 'Local store, explicit opt-in, scoped retrieval, expiry, export/delete' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'What is memory decay and why do we want it?', idealAnswer: 'Fading stale facts reduces conflicts and clutter' },
      { id: 'iq-2', question: 'How do you keep memory from dominating context?', idealAnswer: 'Retrieve top-k by relevance, budget-aware, summaries for aggregates' },
    ],
  },

  'evaluation-observability': {
    topicId: 'rm-15',
    introduction: 'Make AI systems measurable: golden datasets, LLM-as-judge, tracing, logging, and regression testing.',
    estimatedHours: 25,
    difficulty: 'intermediate',
    objectives: [
      { id: 'obj-1', text: 'Build evaluation datasets and golden sets' },
      { id: 'obj-2', text: 'Use LLM-as-judge responsibly' },
      { id: 'obj-3', text: 'Write deterministic tests for AI logic' },
      { id: 'obj-4', text: 'Instrument tracing and logging' },
      { id: 'obj-5', text: 'Run regression tests on prompts/pipelines' },
      { id: 'obj-6', text: 'Monitor metrics over time' },
    ],
    resources: [
      { id: 'res-1', title: 'LangSmith Documentation', kind: 'documentation', source: 'docs.langchain.com', url: 'https://docs.langchain.com/development/evaluation', description: 'Evaluation tooling for LLM apps.', difficulty: 'intermediate', estimatedMinutes: 60, priority: 'high' },
      { id: 'res-2', title: 'OpenAI Cookbook: Evaluation', kind: 'tutorial', source: 'cookbook.openai.com', url: 'https://cookbook.openai.com/examples/evaluation/how_to_eval_abstractive_summarization', description: 'Practical eval recipes.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'medium' },
      { id: 'res-3', title: 'LLM-as-a-Judge Paper (Zheng et al.)', kind: 'paper', source: 'arxiv.org', url: 'https://arxiv.org/abs/2306.05685', description: 'MT-Bench judge reliability.', difficulty: 'advanced', estimatedMinutes: 45, priority: 'medium' },
      { id: 'res-4', title: 'OpenTelemetry GenAI Semconv', kind: 'documentation', source: 'opentelemetry.io', url: 'https://opentelemetry.io/docs/specs/semconv/gen-ai/', description: 'Standard AI observability events.', difficulty: 'intermediate', estimatedMinutes: 40, priority: 'medium' },
      { id: 'res-5', title: 'RAGAS', kind: 'repository', source: 'github.com', url: 'https://github.com/explodinggradients/ragas', description: 'Metrics for retrieval and generation quality.', difficulty: 'intermediate', estimatedMinutes: 60, priority: 'medium' },
      { id: 'res-6', title: 'OpenAI Cookbook', kind: 'tutorial', source: 'cookbook.openai.com', url: 'https://cookbook.openai.com/', description: 'Eval and observability recipes for LLM apps.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Golden Dataset Builder', problem: 'Create a golden eval set for a RAG task.', whyItMatters: 'All eval starts with data.', prerequisites: ['RAG basics'], requirements: [
          { id: 'r1', text: '20+ question→answer pairs with source docs' },
          { id: 'r2', text: 'Difficulty spread' },
          { id: 'r3', text: 'Why-correct annotations' },
          { id: 'r4', text: 'Ready for automated scoring' },
        ], hints: 'Include adversarial/hallucination-bait questions.', expectedOutput: 'A versioned golden JSONL dataset.', acceptanceCriteria: [
          { id: 'a1', text: 'Loadable by an eval harness' },
          { id: 'a2', text: 'Answers traceable to sources' },
        ], skillsPracticed: ['Evaluation', 'Dataset design'], estimatedMinutes: 90, difficulty: 'intermediate' },
      {
        id: 'lab-2', title: 'RAG Evaluation Harness', problem: 'Automate retrieval + generation scoring.', whyItMatters: 'Continuous quality tracking.', prerequisites: ['Lab 1'], requirements: [
          { id: 'r1', text: 'Retrieval metrics (recall, MRR)' },
          { id: 'r2', text: 'Generation metrics (faithfulness, correctness)' },
          { id: 'r3', text: 'LLM-as-judge with rubric' },
          { id: 'r4', text: 'CLI run + report' },
        ], hints: 'Separate judge prompts from scoring code.', expectedOutput: '`run_eval.py` printing a scorecard.', acceptanceCriteria: [
          { id: 'a1', text: 'Deterministic vs seeded' },
          { id: 'a2', text: 'Regressions visible' },
        ], skillsPracticed: ['Evaluation', 'LLM-as-judge'], estimatedMinutes: 150, difficulty: 'advanced' },
      {
        id: 'lab-3', title: 'Agent Tracing', problem: 'Trace an agent run step by step.', whyItMatters: 'Debugging production agents.', prerequisites: ['Agents'], requirements: [
          { id: 'r1', text: 'Emit spans for loop iterations' },
          { id: 'r2', text: 'Record tool calls + results size' },
          { id: 'r3', text: 'Record token counts/cost per span' },
          { id: 'r4', text: 'Visualize with a simple local UI or file' },
        ], hints: 'Follow an OpenTelemetry-like span tree JSON.', expectedOutput: 'A trace viewer for any agent run.', acceptanceCriteria: [
          { id: 'a1', text: 'Full run reconstructable from trace' },
          { id: 'a2', text: 'Cost/latency per step visible' },
        ], skillsPracticed: ['Observability', 'Tracing'], estimatedMinutes: 120, difficulty: 'intermediate' },
      {
        id: 'lab-4', title: 'Prompt Regression Suite', problem: 'Keep prompts from silently regressing.', whyItMatters: 'Prompt changes are breaking changes.', prerequisites: ['Lab 1'], requirements: [
          { id: 'r1', text: 'Snapshot current outputs' },
          { id: 'r2', text: 'Golden assertions per prompt' },
          { id: 'r3', text: 'Run on each prompt change' },
          { id: 'r4', text: 'Gate merge/CI on regressions' },
        ], hints: 'Semantic similarity to snapshot for fuzz.', expectedOutput: 'A CI-friendly regression check.', acceptanceCriteria: [
          { id: 'a1', text: 'Fails on real regressions' },
          { id: 'a2', text: 'Tolerates harmless rewording' },
        ], skillsPracticed: ['Testing', 'CI/CD'], estimatedMinutes: 120, difficulty: 'advanced' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Agent Evaluation Suite', problem: 'Production eval for one agent with metrics + dashboard.', requirements: [
        { id: 'r1', text: 'Golden tasks + rubrics' },
        { id: 'r2', text: 'Trace capture' },
        { id: 'r3', text: 'Cost/latency/quality dashboards' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'Triaged by quality regressions' },
        { id: 'a2', text: 'Jobs runnable in CI' },
      ], skillsPracticed: ['Evaluation', 'Observability'], estimatedHours: 6 },
    repositories: [
      {
        id: 'repo-1', name: 'dspy', url: 'https://github.com/stanfordnlp/dspy', whyStudy: 'Programmatic prompts + automated optimization/eval.', whatToLookFor: 'Metrics, asserts, optimizers.', importantFiles: ['dspy/evaluate/evaluate.py'], concepts: ['Metrics', 'Compilation'], guidedSteps: [
          { id: 's1', text: 'Read README' },
          { id: 's2', text: 'Understand Metrics' },
          { id: 's3', text: 'Run an evaluation example' },
          { id: 's4', text: 'Note how optimization uses EVAL' },
        ] },
    ],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'Why pre-register golden answers?', options: ['Faster', 'Moves eval off vibes onto verifiable criteria', 'Cheaper', 'Required by law'], correctOption: 1, idealAnswer: 'Deterministic, auditable quality signal' },
      { id: 'q2', type: 'short_answer', question: 'When is LLM-as-judge inappropriate?', idealAnswer: 'Subtle factual claims, security-critical, multi-factorial where humans are authoritative' },
      { id: 'q3', type: 'short_answer', question: 'What is a regression test for an AI pipeline?', idealAnswer: 'Automated check that a prompt/pipeline change didn\'t drop quality on golden set' },
      { id: 'q4', type: 'architecture', question: 'Design observability for a fleet of agents.', idealAnswer: 'Trace tree, per-request cost, tool dashboards, drift alerts on quality metrics' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'How do you evaluate a RAG system?', idealAnswer: 'Retrieval (recall/MRR) + generation (faithfulness, answer correct) + end-user metrics' },
      { id: 'iq-2', question: 'How do you find silent regressions?', idealAnswer: 'Golden sets run on every change + canary in production + alerting' },
      { id: 'iq-3', question: 'LLM-as-judge pitfalls?', idealAnswer: 'Position bias, verbosity bias, self-grading bias, rubric brittleness' },
    ],
  },

  'security-guardrails': {
    topicId: 'rm-16',
    introduction: 'Prompt injection, data leakage, tool abuse, permissions, input/output validation, human approval, and sandboxing.',
    estimatedHours: 20,
    difficulty: 'advanced',
    objectives: [
      { id: 'obj-1', text: 'Explain prompt injection and its defenses' },
      { id: 'obj-2', text: 'Protect against data leakage' },
      { id: 'obj-3', text: 'Prevent tool abuse and over-permission' },
      { id: 'obj-4', text: 'Implement input/output validation' },
      { id: 'obj-5', text: 'Add human-approval workflows' },
      { id: 'obj-6', text: 'Sandbox unsafe action classes' },
    ],
    resources: [
      { id: 'res-1', title: 'OWASP LLM Top 10', kind: 'article', source: 'owasp.org', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/', description: 'The standard threat taxonomy.', difficulty: 'beginner', estimatedMinutes: 60, priority: 'high' },
      { id: 'res-2', title: 'Anthropic: How to defend against prompt injection', kind: 'article', source: 'anthropic.com', url: 'https://www.anthropic.com/engineering/prompt-injection-defenses', description: 'Layered defense guidance.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'high' },
      { id: 'res-3', title: 'Simon Willison: prompt injection insights', kind: 'blog', source: 'simonwillison.net', url: 'https://simonwillison.net/2025/Mar/14/prompt-injection/', description: 'Practical injection taxonomy.', difficulty: 'intermediate', estimatedMinutes: 30, priority: 'medium' },
      { id: 'res-4', title: 'OpenAI Agents Guardrails', kind: 'documentation', source: 'openai.github.io', url: 'https://openai.github.io/openai-agents-python/guardrails/', description: 'Guardrail APIs.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'medium' },
      { id: 'res-5', title: 'OWASP GenAI Security', kind: 'article', source: 'genai.owasp.org', url: 'https://genai.owasp.org/', description: 'The GenAI security community and guidance.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'medium' },
      { id: 'res-6', title: 'Garak', kind: 'repository', source: 'github.com', url: 'https://github.com/NVIDIA/garak', description: 'Automated LLM vulnerability scanner.', difficulty: 'advanced', estimatedMinutes: 60, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Injection Test Suite', problem: 'Build a battery of injection attempts against a sandbox agent.', whyItMatters: 'You cannot defend what you cannot trigger.', prerequisites: ['Agents'], requirements: [
          { id: 'r1', text: 'Categories: direct, indirect, encoded, tool-mediated' },
          { id: 'r2', text: 'Golden "attack success" definitions' },
          { id: 'r3', text: 'Run suite and report pass/fail' },
          { id: 'r4', text: 'Expose failure traces' },
        ], hints: 'Keep prompts/data segregated (delimiters + trust labels).', expectedOutput: 'A suite with baseline success rate.', acceptanceCriteria: [
          { id: 'a1', text: 'Attacks reproducible' },
          { id: 'a2', text: 'Each attack logged with verdict' },
        ], skillsPracticed: ['Security', 'Testing'], estimatedMinutes: 120, difficulty: 'advanced' },
      {
        id: 'lab-2', title: 'Tool Permission System', problem: 'Fine-grained permissions for agent tools.', whyItMatters: 'Least privilege.', prerequisites: ['Tools'], requirements: [
          { id: 'r1', text: 'Policy strings per agent-role' },
          { id: 'r2', text: 'Deny-by-default' },
          { id: 'r3', text: 'Action-level allow rules' },
          { id: 'r4', text: 'Deny logging for audit' },
        ], hints: 'Model RBAC: role → allowed tools → allowed operations.', expectedOutput: 'Agent constrained to permitted ops.', acceptanceCriteria: [
          { id: 'a1', text: 'Deny paths tested' },
          { id: 'a2', text: 'Audit trail complete' },
        ], skillsPracticed: ['Authorization', 'Policy design'], estimatedMinutes: 120, difficulty: 'advanced' },
      {
        id: 'lab-3', title: 'Human Approval Workflow', problem: 'Pause before irreversible actions.', whyItMatters: 'Guard against costly/tool-damaging actions.', prerequisites: ['Agents'], requirements: [
          { id: 'r1', text: 'Classify action risk' },
          { id: 'r2', text: 'Queue for human review at threshold' },
          { id: 'r3', text: 'Approve/deny changes behavior' },
          { id: 'r4', text: 'Timeout and fallback on approval' },
        ], hints: 'Implement approval as a tool result await.', expectedOutput: 'High-risk ops gated by approval.', acceptanceCriteria: [
          { id: 'a1', text: 'No bypass obvious' },
          { id: 'a2', text: 'Denied op leaves no side effect' },
        ], skillsPracticed: ['Human-in-the-loop', 'Safety'], estimatedMinutes: 120, difficulty: 'intermediate' },
      {
        id: 'lab-4', title: 'Security Evaluation', problem: 'Score overall agent security posture.', whyItMatters: 'Know where you stand.', prerequisites: ['Lab 1-3'], requirements: [
          { id: 'r1', text: 'Rubric across injection, leakage, abuse, permissions' },
          { id: 'r2', text: 'Automated scoring harness' },
          { id: 'r3', text: 'Findings report with severity' },
        ], hints: 'Reuse earlier lab outputs as evidence.', expectedOutput: 'Posture scorecard with findings.', acceptanceCriteria: [
          { id: 'a1', text: 'Repeatable between runs' },
          { id: 'a2', text: 'Severity-ranked findings' },
        ], skillsPracticed: ['Security', 'Evaluation'], estimatedMinutes: 120, difficulty: 'advanced' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Hardened Agent Sandbox', problem: 'A sandboxed agent runtime with audit + approvals.', requirements: [
        { id: 'r1', text: 'Sandboxed execution (subprocess/Firecracker-style)' },
        { id: 'r2', text: 'Tool policies' },
        { id: 'r3', text: 'Injection defenses' },
        { id: 'r4', text: 'Full audit log' },
        { id: 'r5', text: 'Human approval' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'Defense-in-depth visible' },
        { id: 'a2', text: 'Threat model documented' },
      ], skillsPracticed: ['Security', 'Sandboxing', 'Authorization'], estimatedHours: 8 },
    repositories: [
      {
        id: 'repo-1', name: 'OWASP Top 10 for LLM Apps', url: 'https://github.com/OWASP/www-project-top-10-for-large-language-model-applications', whyStudy: 'Standard threat list to map defenses against.', whatToLookFor: 'Mitigation tables per top-10 entry.', importantFiles: ['2_0_vulns'], concepts: ['OWASP', 'Threat modeling'], guidedSteps: [
          { id: 's1', text: 'Read the LLM top-10 intro' },
          { id: 's2', text: 'Study Prompt Injection entry' },
          { id: 's3', text: 'Study Excessive Agency entry' },
          { id: 's4', text: 'Map mitigations to your agent' },
        ] },
    ],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'Best defense against prompt injection?', options: ['Longer prompts', 'Layered: isolation + validation + least privilege + monitoring', 'Blocklist of words', 'Ignore messages'], correctOption: 1, idealAnswer: 'Defense-in-depth; no single prompt technique is sufficient' },
      { id: 'q2', type: 'short_answer', question: 'What is data leakage in agent context?', idealAnswer: 'Sensitive data reaching the model or a tool output that shouldn\'t' },
      { id: 'q3', type: 'short_answer', question: 'What is excessive agency?', idealAnswer: 'Too much tool power relative to the agent\'s trust' },
      { id: 'q4', type: 'architecture', question: 'Design an agent allowed to email on users\' behalf.', idealAnswer: 'Explicit scope, address allowlisting, content review step, human approval, audit + revocation' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'How do you defend against indirect prompt injection?', idealAnswer: 'Trust-boundary data labeling, input filtering, output checks, human gates on risky actions' },
      { id: 'iq-2', question: 'When would you sandbox an agent?', idealAnswer: 'Untrusted input, file/network ops, code execution — isolate and cap resources' },
      { id: 'iq-3', question: 'How to secure secrets used by agents?', idealAnswer: 'Never in context/prompt; server-side vault, scoped short-lived tokens' },
    ],
  },

  'mcp-advanced-integrations': {
    topicId: 'rm-17',
    introduction: 'Model Context Protocol: the open standard connecting agents to tools, resources, and prompts. Build servers, clients, and secure integrations.',
    estimatedHours: 20,
    difficulty: 'advanced',
    objectives: [
      { id: 'obj-1', text: 'Explain MCP architecture (client/server/transport)' },
      { id: 'obj-2', text: 'Build an MCP server with tools and resources' },
      { id: 'obj-3', text: 'Connect an agent/client to MCP' },
      { id: 'obj-4', text: 'Implement secure tool permissions' },
      { id: 'obj-5', text: 'Use MCP discovery patterns' },
    ],
    resources: [
      { id: 'res-1', title: 'MCP Specification', kind: 'documentation', source: 'modelcontextprotocol.io', url: 'https://modelcontextprotocol.io/specification/2025-06-18', description: 'The protocol spec.', difficulty: 'intermediate', estimatedMinutes: 120, priority: 'high' },
      { id: 'res-2', title: 'MCP Python SDK', kind: 'repository', source: 'github.com', url: 'https://github.com/modelcontextprotocol/python-sdk', description: 'Official Python SDK.', difficulty: 'intermediate', estimatedMinutes: 60, priority: 'high' },
      { id: 'res-3', title: 'MCP TypeScript SDK', kind: 'repository', source: 'github.com', url: 'https://github.com/modelcontextprotocol/typescript-sdk', description: 'Official TS SDK.', difficulty: 'intermediate', estimatedMinutes: 60, priority: 'high' },
      { id: 'res-4', title: 'MCP Quickstart', kind: 'tutorial', source: 'modelcontextprotocol.io', url: 'https://modelcontextprotocol.io/quickstart/server', description: 'Build your first server.', difficulty: 'beginner', estimatedMinutes: 60, priority: 'high' },
      { id: 'res-5', title: 'MCP: Tools concept', kind: 'documentation', source: 'modelcontextprotocol.io', url: 'https://modelcontextprotocol.io/docs/concepts/tools', description: 'How tools are defined and invoked.', difficulty: 'intermediate', estimatedMinutes: 30, priority: 'medium' },
      { id: 'res-6', title: 'Anthropic: Introducing MCP', kind: 'article', source: 'anthropic.com', url: 'https://www.anthropic.com/news/model-context-protocol', description: 'The original MCP announcement.', difficulty: 'beginner', estimatedMinutes: 20, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Build an MCP Server', problem: 'Implement an MCP server exposing 2 tools + 1 resource.', whyItMatters: 'Core competency for this specialization.', prerequisites: ['Python'], requirements: [
          { id: 'r1', text: 'Use python-sdk FastMCP' },
          { id: 'r2', text: 'Two tools with schemas' },
          { id: 'r3', text: 'One resource template' },
          { id: 'r4', text: 'Run over stdio + test with client' },
        ], hints: 'FastMCP wraps low-level types with decorators.', expectedOutput: 'A server passable to any MCP client.', acceptanceCriteria: [
          { id: 'a1', text: 'Client can list+call tools' },
          { id: 'a2', text: 'Schemas validated' },
        ], skillsPracticed: ['MCP', 'Protocols'], estimatedMinutes: 120, difficulty: 'advanced' },
      {
        id: 'lab-2', title: 'MCP Client + Agent', problem: 'Wire the server tools into an agent loop.', whyItMatters: 'Agents consume MCP for real work.', prerequisites: ['Lab 1', 'Agents'], requirements: [
          { id: 'r1', text: 'Client connects over stdio' },
          { id: 'r2', text: 'Agent exposes MCP tools as functions' },
          { id: 'r3', text: 'Handle tool errors through agent' },
          { id: 'r4', text: 'Trace tool round trip' },
        ], hints: 'Map MCP tool schemas onto your tool abstraction.', expectedOutput: 'Agent completes tasks using MCP tools.', acceptanceCriteria: [
          { id: 'a1', text: 'Schema round-trip clean' },
          { id: 'a2', text: 'Result flows back faithfully' },
        ], skillsPracticed: ['MCP', 'Agents'], estimatedMinutes: 120, difficulty: 'advanced' },
      {
        id: 'lab-3', title: 'Tool Permissions on MCP', problem: 'Gate which tools/resources an agent can use.', whyItMatters: 'MCP surfaces many capabilities at once.', prerequisites: ['Lab 2'], requirements: [
          { id: 'r1', text: 'Policy filter on tool list' },
          { id: 'r2', text: 'Deny by default for unknown tools' },
          { id: 'r3', text: 'Audit every invocation' },
          { id: 'r4', text: 'Rate/size caps per tool' },
        ], hints: 'Proxy between agent and client with a policy layer.', expectedOutput: 'An MCP agent honoring least privilege.', acceptanceCriteria: [
          { id: 'a1', text: 'Denied tools unobtainable' },
          { id: 'a2', text: 'Invocation log complete' },
        ], skillsPracticed: ['Authorization', 'MCP'], estimatedMinutes: 120, difficulty: 'advanced' },
    ],
    miniProject: {
      id: 'mini-1', title: 'MCP Business Agent', problem: 'Connect an agent to 2 business-style servers with auth.', requirements: [
        { id: 'r1', text: 'Two servers (e.g., todo, calendar)' },
        { id: 'r2', text: 'Authenticated access' },
        { id: 'r3', text: 'Permission policies' },
        { id: 'r4', text: 'Failure/retry handling' },
        { id: 'r5', text: 'Dashboard of usage' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'Real tasks completed end-to-end' },
        { id: 'a2', text: 'Secure by default' },
      ], skillsPracticed: ['MCP', 'Systems', 'Security'], estimatedHours: 6 },
    repositories: [
      {
        id: 'repo-1', name: 'modelcontextprotocol/python-sdk', url: 'https://github.com/modelcontextprotocol/python-sdk', whyStudy: 'Reference MCP server implementation.', whatToLookFor: 'FastMCP + low-level server.', importantFiles: ['src/mcp/server/fastmcp/server.py'], concepts: ['Tools', 'Resources', 'Prompts', 'Transports'], guidedSteps: [
          { id: 's1', text: 'Read official docs' },
          { id: 's2', text: 'Run an example server' },
          { id: 's3', text: 'Study FastMCP decorators' },
          { id: 's4', text: 'Compare stdio vs SSE transport' },
          { id: 's5', text: 'Build your own server' },
        ] },
    ],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'MCP is primarily…?', options: ['A model', 'A client-server protocol over tools/resources/prompts', 'A vector DB', 'A UI'], correctOption: 1, idealAnswer: 'Open standard for connecting agents to capabilities' },
      { id: 'q2', type: 'short_answer', question: 'Resource vs Tool in MCP?', idealAnswer: 'Resource = read-only data exposed to model; tool = invokable operations' },
      { id: 'q3', type: 'architecture', question: 'Design remote MCP access across the internet securely.', idealAnswer: 'OAuth/authorized transport, TLS, server allowlists, scope-limited tokens, audit' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'Why standardize integration on MCP vs bespoke APIs?', idealAnswer: 'One protocol, discoverable tools, reusable servers, security model' },
      { id: 'iq-2', question: 'How to make MCP tools safe for multi-tenant agents?', idealAnswer: 'Per-tenant authorization, sandboxed contexts, secret isolation, quotas' },
    ],
  },

  'browser-computer-use-agents': {
    topicId: 'rm-18',
    introduction: 'Agents that operate browsers and computer interfaces: automation, DOM interaction, screenshots, action planning, verification, and security.',
    estimatedHours: 25,
    difficulty: 'advanced',
    objectives: [
      { id: 'obj-1', text: 'Automate browsers with Playwright/CDP' },
      { id: 'obj-2', text: 'Plan actions from DOM/screenshots' },
      { id: 'obj-3', text: 'Verify outcomes after actions' },
      { id: 'obj-4', text: 'Recover from navigation/action failures' },
      { id: 'obj-5', text: 'Apply security constraints to web agents' },
    ],
    resources: [
      { id: 'res-1', title: 'Playwright Python Docs', kind: 'documentation', source: 'playwright.dev', url: 'https://playwright.dev/python/docs/intro', description: 'Browser automation primitives.', difficulty: 'beginner', estimatedMinutes: 90, priority: 'high' },
      { id: 'res-2', title: 'Anthropic: Building effective browser agents', kind: 'blog', source: 'anthropic.com', url: 'https://www.anthropic.com/engineering/browser-use-tactics', description: 'Proven tactics for reliable browser agents.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'high' },
      { id: 'res-3', title: 'OpenAI: Computer-Using Agent (CUA)', kind: 'documentation', source: 'platform.openai.com', url: 'https://platform.openai.com/docs/guides/tools-computer-use', description: 'Computer use tooling.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'medium' },
      { id: 'res-4', title: 'SWE-agent', kind: 'repository', source: 'github.com', url: 'https://github.com/SWE-agent/SWE-agent', description: 'Repository-scale agent using terminals/browsers.', difficulty: 'advanced', estimatedMinutes: 45, priority: 'medium' },
      { id: 'res-5', title: 'Browser-Use', kind: 'repository', source: 'github.com', url: 'https://github.com/browser-use/browser-use', description: 'Make websites accessible to AI agents.', difficulty: 'intermediate', estimatedMinutes: 60, priority: 'medium' },
      { id: 'res-6', title: 'Microsoft OmniParser', kind: 'repository', source: 'github.com', url: 'https://github.com/microsoft/OmniParser', description: 'Screen parsing for GUI agents.', difficulty: 'advanced', estimatedMinutes: 45, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Browser Research Agent', problem: 'Agent that searches, reads pages, and collects facts.', whyItMatters: 'Foundation of web agents.', prerequisites: ['Playwright', 'Agents'], requirements: [
          { id: 'r1', text: 'Navigate to search + follow results' },
          { id: 'r2', text: 'Extract structured facts' },
          { id: 'r3', text: 'Stay on allowed domains' },
          { id: 'r4', text: 'Report sources for each fact' },
        ], hints: 'Return citations with every claim.', expectedOutput: 'A cited research summary.', acceptanceCriteria: [
          { id: 'a1', text: 'Every claim has source' },
          { id: 'a2', text: 'No off-list navigation' },
        ], skillsPracticed: ['Browser automation', 'Agents'], estimatedMinutes: 150, difficulty: 'intermediate' },
      {
        id: 'lab-2', title: 'Form Filling Agent', problem: 'Complete a multi-field form from a task description.', whyItMatters: 'Real automation scenario.', prerequisites: ['Lab 1'], requirements: [
          { id: 'r1', text: 'Locate fields (labels, ids, aria)' },
          { id: 'r2', text: 'Fill with data from a task' },
          { id: 'r3', text: 'Validate submission outcome' },
          { id: 'r4', text: 'Handle validation errors' },
        ], hints: 'Prefer accessible locators; verify by post-submit state.', expectedOutput: 'Agent submits form successfully.', acceptanceCriteria: [
          { id: 'a1', text: 'Correct fields targeted' },
          { id: 'a2', text: 'Failure recovery present' },
        ], skillsPracticed: ['DOM interaction', 'Verification'], estimatedMinutes: 120, difficulty: 'intermediate' },
      {
        id: 'lab-3', title: 'Web Navigation Agent', problem: 'Multi-page journey with step planning.', whyItMatters: 'Long-horizon navigation.', prerequisites: ['Lab 2'], requirements: [
          { id: 'r1', text: 'Plan multi-step route' },
          { id: 'r2', text: 'Track current page state' },
          { id: 'r3', text: 'Backtrack on dead ends' },
          { id: 'r4', text: 'Report plan vs actual' },
        ], hints: 'Re-plan frequently rather than trusting a long plan.', expectedOutput: 'A completed multi-step task with log.', acceptanceCriteria: [
          { id: 'a1', text: 'Dead-end recovery works' },
          { id: 'a2', text: 'Plan/actual diff visible' },
        ], skillsPracticed: ['Planning', 'Navigation'], estimatedMinutes: 150, difficulty: 'advanced' },
      {
        id: 'lab-4', title: 'Agent Verification System', problem: 'Verify screenshots/DOM match expected outcome.', whyItMatters: 'Trust web agents only with verification.', prerequisites: ['Lab 3'], requirements: [
          { id: 'r1', text: 'Capture before/after states' },
          { id: 'r2', text: 'Compare against acceptance rules' },
          { id: 'r3', text: 'Re-run or escalate on mismatch' },
          { id: 'r4', text: 'Keep evidence trail' },
        ], hints: 'Semantic checks (labels present, elements state) beat pixel diffing.', expectedOutput: 'Verifier that catches agent mistakes.', acceptanceCriteria: [
          { id: 'a1', text: 'Catches real failures in demo' },
          { id: 'a2', text: 'Evidence reproducible' },
        ], skillsPracticed: ['Verification', 'Evaluation'], estimatedMinutes: 120, difficulty: 'advanced' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Supervised Browser Agent', problem: 'Research-then-report agent with approval gates for risky actions.', requirements: [
        { id: 'r1', text: 'Browser sandbox' },
        { id: 'r2', text: 'Allow/deny domains' },
        { id: 'r3', text: 'Human approval before navigation + downloads' },
        { id: 'r4', text: 'Verification step' },
        { id: 'r5', text: 'Full audit trail' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'Completes research task' },
        { id: 'a2', text: 'Never leaves approved set' },
      ], skillsPracticed: ['Browser agents', 'Security', 'Verification'], estimatedHours: 8 },
    repositories: [
      {
        id: 'repo-1', name: 'SWE-agent', url: 'https://github.com/SWE-agent/SWE-agent', whyStudy: 'Reference agent interacting with tools via terminal/UI.', whatToLookFor: 'Agent-Tool interface, action states.', importantFiles: ['sweagent/agent/agents.py'], concepts: ['Observation', 'Action', 'State'], guidedSteps: [
          { id: 's1', text: 'Read README' },
          { id: 's2', text: 'Understand its action space' },
          { id: 's3', text: 'Study how observations feed decisions' },
          { id: 's4', text: 'Try it on a small issue-style task' },
        ] },
    ],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'Why verify after browser actions?', options: ['Aesthetics', 'Navigation rarely matters', 'Models can hallucinate page state; verify actual DOM', 'Nothing'], correctOption: 2, idealAnswer: 'Ground on real page state, not model belief' },
      { id: 'q2', type: 'short_answer', question: 'Screenshots vs DOM for deciding next action?', idealAnswer: 'DOM = precise targeted ops; screenshots = layout understanding; hybrids best' },
      { id: 'q3', type: 'architecture', question: 'Design a secure browser agent for financial tasks.', idealAnswer: 'Session isolation, hard allowlist, approval on submits, redaction, audit + revocation' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'What are the failure modes of computer-use agents?', idealAnswer: 'Click mis-targets, layout drift, incomplete renders, stale state, locked sessions' },
      { id: 'iq-2', question: 'How do you evaluate a browser agent?', idealAnswer: 'Task success on a golden web-tasks set + efficiency + safety violations tracking' },
    ],
  },

  'relational-databases': {
    topicId: 'rm-19',
    introduction: 'Model, query, and optimize data with SQL and PostgreSQL, then bridge it to Python applications and vector search.',
    estimatedHours: 25,
    difficulty: 'beginner',
    objectives: [
      { id: 'obj-1', text: 'Model data with relational schemas, keys, and normalization' },
      { id: 'obj-2', text: 'Write SQL for CRUD, joins, grouping, and window functions' },
      { id: 'obj-3', text: 'Use transactions and isolation levels correctly' },
      { id: 'obj-4', text: 'Apply constraints, keys, and indexes for integrity' },
      { id: 'obj-5', text: 'Read execution plans and optimize slow queries' },
      { id: 'obj-6', text: 'Design migrations for schema evolution' },
      { id: 'obj-7', text: 'Work with PostgreSQL from Python via psycopg' },
      { id: 'obj-8', text: 'Store and query embeddings with pgvector' },
    ],
    resources: [
      { id: 'res-1', title: 'PostgreSQL Documentation', kind: 'documentation', source: 'postgresql.org', url: 'https://www.postgresql.org/docs/', description: 'The authoritative reference for SQL, schema, transactions, and admin.', difficulty: 'beginner', estimatedMinutes: 180, priority: 'high' },
      { id: 'res-2', title: 'SQL Tutorial', kind: 'tutorial', source: 'w3schools.com', url: 'https://www.w3schools.com/sql/', description: 'Hands-on SQL basics with live examples.', difficulty: 'beginner', estimatedMinutes: 240, priority: 'high' },
      { id: 'res-3', title: 'PostgreSQL Tutorial', kind: 'tutorial', source: 'postgresqltutorial.com', url: 'https://www.postgresqltutorial.com/', description: 'PostgreSQL-specific features and advanced queries.', difficulty: 'beginner', estimatedMinutes: 180, priority: 'medium' },
      { id: 'res-4', title: 'Mode SQL Tutorial', kind: 'tutorial', source: 'mode.com', url: 'https://mode.com/sql-tutorial/', description: 'Analytical SQL: aggregations, joins, window functions.', difficulty: 'beginner', estimatedMinutes: 120, priority: 'medium' },
      { id: 'res-5', title: 'psycopg Documentation', kind: 'documentation', source: 'psycopg.org', url: 'https://www.psycopg.org/docs/', description: 'PostgreSQL adapter for Python: pools, cursors, transactions.', difficulty: 'intermediate', estimatedMinutes: 90, priority: 'medium' },
      { id: 'res-6', title: 'pgvector', kind: 'repository', source: 'github.com', url: 'https://github.com/pgvector/pgvector', description: 'Vector similarity search inside PostgreSQL.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'low' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Library Database Schema', problem: 'Design a normalized schema for a lending library and load realistic seed data.', whyItMatters: 'Schema design and integrity constraints are the foundation of every data product.', prerequisites: ['SQL basics'], requirements: [
          { id: 'r1', text: 'Tables for authors, books, members, and loans' },
          { id: 'r2', text: 'Primary and foreign keys with referential actions' },
          { id: 'r3', text: 'CHECK constraints for data quality' },
          { id: 'r4', text: 'Seed with at least 50 realistic rows' },
          { id: 'r5', text: 'Index the columns used by common queries' },
        ], hints: 'Normalize to 3NF first, then add indexes based on the queries you want to run.', expectedOutput: 'A SQL script that creates the schema and passes a set of hand-written query checks.', acceptanceCriteria: [
          { id: 'a1', text: 'Schema normalizes cleanly' },
          { id: 'a2', text: 'Constraint violations fail loudly' },
          { id: 'a3', text: 'Reports query joins work' },
        ], skillsPracticed: ['Schema design', 'SQL', 'Constraints'], estimatedMinutes: 150, difficulty: 'beginner' },
      {
        id: 'lab-2', title: 'Python Data Access Layer', problem: 'Build a typed repository layer over PostgreSQL with psycopg.', whyItMatters: 'Production agents and services need safe, pooled database access.', prerequisites: ['psycopg', 'Transactions'], requirements: [
          { id: 'r1', text: 'Connection pooling' },
          { id: 'r2', text: 'Parameterized queries only' },
          { id: 'r3', text: 'Transactions with commit and rollback paths' },
          { id: 'r4', text: 'CRUD methods with type hints' },
          { id: 'r5', text: 'Tests that run against a throwaway database' },
        ], hints: 'Wrap DataError and IntegrityError into domain-specific exceptions.', expectedOutput: 'A repository used by a small CLI or test suite.', acceptanceCriteria: [
          { id: 'a1', text: 'No SQL injection in any query' },
          { id: 'a2', text: 'Rollback on raised errors' },
          { id: 'a3', text: 'All tests pass' },
        ], skillsPracticed: ['Python', 'PostgreSQL', 'Transactions'], estimatedMinutes: 180, difficulty: 'intermediate' },
      {
        id: 'lab-3', title: 'Query Optimization', problem: 'Take a set of slow analytical queries, explain, optimize, and prove the improvement.', whyItMatters: 'Latency on data access becomes agent latency.', prerequisites: ['Lab 1', 'Indexes'], requirements: [
          { id: 'r1', text: 'Generate 100k+ rows to make queries slow' },
          { id: 'r2', text: 'EXPLAIN ANALYZE every target query' },
          { id: 'r3', text: 'Add indexes and rewrite where needed' },
          { id: 'r4', text: 'Compare before and after timing' },
          { id: 'r5', text: 'Write a short optimization report' },
        ], hints: 'Watch for sequential scans, missing indexes, and implicit type casts.', expectedOutput: 'A report showing 5+ queries with before/after plans and timings.', acceptanceCriteria: [
          { id: 'a1', text: 'At least 5 queries optimized' },
          { id: 'a2', text: 'Improvement measured with evidence' },
        ], skillsPracticed: ['Query optimization', 'EXPLAIN', 'Indexing'], estimatedMinutes: 150, difficulty: 'intermediate' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Event Analytics Database', problem: 'Ingest event stream data into a star schema and expose reporting queries.', requirements: [
        { id: 'r1', text: 'Fact and dimension tables' },
        { id: 'r2', text: 'Bulk loading script for 100k+ rows' },
        { id: 'r3', text: '3 reporting queries with dashboards in mind' },
        { id: 'r4', text: 'Migration script for schema v1 to v2' },
        { id: 'r5', text: 'Tests validating report outputs' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'Reports answer the business questions' },
        { id: 'a2', text: 'Migrations apply cleanly' },
        { id: 'a3', text: 'Query plans are index-backed' },
      ], skillsPracticed: ['Relational modeling', 'ETL', 'SQL reports'], estimatedHours: 6 },
    repositories: [
      {
        id: 'repo-1', name: 'postgres', url: 'https://github.com/postgres/postgres', whyStudy: 'Understand planner and index internals.', whatToLookFor: 'Cost model, executor nodes, btree pages.', importantFiles: ['src/backend/optimizer/', 'src/backend/access/nbtree/'], concepts: ['Query planning', 'Index access methods', 'Buffer manager'], guidedSteps: [
          { id: 's1', text: 'Read the README and developer docs' },
          { id: 's2', text: 'Skim the optimizer list structure' },
          { id: 's3', text: 'Understand what a scan node records' },
          { id: 's4', text: 'Relate a cost estimate to an EXPLAIN output' },
        ] },
    ],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'Which isolation level stops dirty reads with the least overhead?', options: ['READ UNCOMMITTED', 'READ COMMITTED', 'REPEATABLE READ', 'SERIALIZABLE'], correctOption: 1, idealAnswer: 'READ COMMITTED blocks dirty reads; higher levels add more protection and cost' },
      { id: 'q2', type: 'mcq', question: 'When would you prefer window functions over GROUP BY?', options: ['Never', 'When you need per-group aggregates alongside the rows', 'Only for date math', 'For faster full scans'], correctOption: 1, idealAnswer: 'Window functions keep row detail while computing aggregates' },
      { id: 'q3', type: 'short_answer', question: 'Why does an index speed up reads but slow down writes?', idealAnswer: 'Indexes add structures that must be maintained on every write, trading write cost for read speed' },
      { id: 'q4', type: 'architecture', question: 'Design a database layer that supports both OLTP writes and heavy reporting.', idealAnswer: 'Normalized OLTP plus denormalized/reporting views or a replica; use indexes and scheduled aggregation' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'Why is it payload > fetches > remote calls when querying a relational store?', idealAnswer: 'One query beats N+1 small queries; fetch only needed columns; keep joins in the database' },
      { id: 'iq-2', question: 'What does an index scan vs seq scan tell you about a query?', idealAnswer: 'Index scan implies selectivity is being used; seq scan means the planner expects to touch most rows' },
      { id: 'iq-3', question: 'How do transactions and isolation affect a resumable agent?', idealAnswer: 'Use short transactions, avoid holding locks across LLM calls; persist intent and retry' },
      { id: 'iq-4', question: 'When is a vector index insufficient for RAG retrieval?', idealAnswer: 'When ranking needs metadata filters, freshness, or lexical precision — combine with filters and hybrid search' },
    ],
  },

  'streaming-real-time-responses': {
    topicId: 'rm-20',
    introduction: 'Stream tokens to the client for perceived speed, and build real-time, cancellable LLM interactions across the stack.',
    estimatedHours: 20,
    difficulty: 'intermediate',
    objectives: [
      { id: 'obj-1', text: 'Explain streaming vs buffered responses and time-to-first-token' },
      { id: 'obj-2', text: 'Stream from OpenAI and Anthropic SDKs token by token' },
      { id: 'obj-3', text: 'Serve Server-Sent Events from a backend' },
      { id: 'obj-4', text: 'Parse streams in the browser with ReadableStream' },
      { id: 'obj-5', text: 'Implement cancellation with AbortController end to end' },
      { id: 'obj-6', text: 'Stream tool-call deltas and partial JSON safely' },
      { id: 'obj-7', text: 'Build full-duplex streaming with WebSockets' },
      { id: 'obj-8', text: 'Apply backpressure and markdown-debounced rendering' },
    ],
    resources: [
      { id: 'res-1', title: 'OpenAI Streaming Docs', kind: 'documentation', source: 'platform.openai.com', url: 'https://platform.openai.com/docs/api-reference/streaming', description: 'Chunked response format and usage.', difficulty: 'beginner', estimatedMinutes: 45, priority: 'high' },
      { id: 'res-2', title: 'Anthropic Messages Streaming', kind: 'documentation', source: 'docs.anthropic.com', url: 'https://docs.anthropic.com/en/api/messages-streaming', description: 'Event stream for content deltas and tool use.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'high' },
      { id: 'res-3', title: 'MDN Server-Sent Events', kind: 'documentation', source: 'developer.mozilla.org', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events', description: 'SSE protocol, EventSource, and reconnect behavior.', difficulty: 'beginner', estimatedMinutes: 60, priority: 'high' },
      { id: 'res-4', title: 'MDN WebSocket API', kind: 'documentation', source: 'developer.mozilla.org', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSocket', description: 'Full-duplex messages for two-way traffic.', difficulty: 'beginner', estimatedMinutes: 60, priority: 'high' },
      { id: 'res-5', title: 'Vercel AI SDK', kind: 'documentation', source: 'ai-sdk.dev', url: 'https://ai-sdk.dev/', description: 'useChat hook and streamText primitives for LLM UIs.', difficulty: 'beginner', estimatedMinutes: 60, priority: 'medium' },
      { id: 'res-6', title: 'openai-python', kind: 'repository', source: 'github.com', url: 'https://github.com/openai/openai-python', description: 'Reference SDK streaming helpers.', difficulty: 'beginner', estimatedMinutes: 45, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'SSE Chat Backend', problem: 'Build a FastAPI endpoint that streams an LLM response over Server-Sent Events and stops on disconnect.', whyItMatters: 'The backend contract drives the whole streaming experience.', prerequisites: ['HTTP basics', 'FastAPI'], requirements: [
          { id: 'r1', text: 'text/event-stream response with proper headers' },
          { id: 'r2', text: 'Yield text deltas as they arrive' },
          { id: 'r3', text: 'Detect client disconnect and abort the model call' },
          { id: 'r4', text: 'Pass through an id and done event' },
          { id: 'r5', text: 'Cap max tokens server-side' },
        ], hints: 'Use an async generator; expose the request disconnect via FastAPI request object.', expectedOutput: 'curl -N returns incremental tokens and a final done event.', acceptanceCriteria: [
          { id: 'a1', text: 'Tokens arrive before the response is complete' },
          { id: 'a2', text: 'Aborted clients stop costly generation' },
          { id: 'a3', text: 'No shared mutable state across sessions' },
        ], skillsPracticed: ['SSE', 'FastAPI', 'OpenAI streaming'], estimatedMinutes: 150, difficulty: 'intermediate' },
      {
        id: 'lab-2', title: 'Token-by-Token Client', problem: 'Render an LLM stream in the browser one token at a time.', whyItMatters: 'User-perceived latency is what users experience.', prerequisites: ['React'], requirements: [
          { id: 'r1', text: 'Read the stream with ReadableStream and TextDecoder' },
          { id: 'r2', text: 'Update state per chunk, not per model response' },
          { id: 'r3', text: 'Abort on unmount and on stop click' },
          { id: 'r4', text: 'Debounce markdown parsing to 16ms' },
          { id: 'r5', text: 'Show a cursor while streaming and regenerate when done' },
        ], hints: 'Keep the decoder.flags, stream: true so multi-byte UTF-8 survives chunk boundaries.', expectedOutput: 'A chat UI where text appears progressively and stop works.', acceptanceCriteria: [
          { id: 'a1', text: 'Stream renders progressively' },
          { id: 'a2', text: 'Stop cancels the request immediately' },
          { id: 'a3', text: 'No layout thrash while tokens arrive' },
        ], skillsPracticed: ['ReadableStream', 'React', 'AbortController'], estimatedMinutes: 150, difficulty: 'intermediate' },
      {
        id: 'lab-3', title: 'WebSocket Agent Stream', problem: 'Stream agent steps over a WebSocket with bidirectional control.', whyItMatters: 'Real agents stream tool calls and steps, not just text.', prerequisites: ['Lab 1', 'Lab 2'], requirements: [
          { id: 'r1', text: 'Full-duplex: client can cut the run mid-step' },
          { id: 'r2', text: 'Emit event types for text, tool_call, tool_result, done' },
          { id: 'r3', text: 'Accumulate and parse partial tool JSON once complete' },
          { id: 'r4', text: 'Reconnect with last-seen event for resume' },
          { id: 'r5', text: 'Bound message size and frequency' },
        ], hints: 'Prefix every frame with a type so the client does not guess.', expectedOutput: 'A live agent transcript with expandable tool cards.', acceptanceCriteria: [
          { id: 'a1', text: 'Tool calls stream incrementally' },
          { id: 'a2', text: 'Cancel halts server work' },
          { id: 'a3', text: 'Resume works after a reconnect' },
        ], skillsPracticed: ['WebSockets', 'Agent streaming', 'Partial JSON'], estimatedMinutes: 180, difficulty: 'advanced' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Streaming Chat Application', problem: 'End-to-end streaming chat with stop, regenerate, and token accounting.', requirements: [
        { id: 'r1', text: 'SSE backend with server-side abort' },
        { id: 'r2', text: 'Token-by-token frontend with markdown' },
        { id: 'r3', text: 'Stop and regenerate controls' },
        { id: 'r4', text: 'Per-message token and latency stats' },
        { id: 'r5', text: 'Tests for the streaming contract' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'Types feel instant on first token' },
        { id: 'a2', text: 'Abort stops generation server-side' },
        { id: 'a3', text: 'Stats match the provider usage report' },
      ], skillsPracticed: ['Streaming', 'SSE', 'React', 'Token accounting'], estimatedHours: 6 },
    repositories: [
      {
        id: 'repo-1', name: 'vercel/ai', url: 'https://github.com/vercel/ai', whyStudy: 'Production streaming chat abstractions.', whatToLookFor: 'streamText, useChat, stream transport.', importantFiles: ['packages/ai/src/streams/', 'packages/react/src/use-chat.ts'], concepts: ['Stream protocol', 'Backpressure', 'Tool deltas'], guidedSteps: [
          { id: 's1', text: 'Read the README' },
          { id: 's2', text: 'Study the stream protocol semantics' },
          { id: 's3', text: 'Understand how useChat consumes it' },
          { id: 's4', text: 'Compare manual vs hook implementations' },
        ] },
    ],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'Which transport is the best default for one-way LLM streaming in a browser?', options: ['WebSocket', 'Server-Sent Events', 'gRPC', 'Polling'], correctOption: 1, idealAnswer: 'SSE gives one-way push over HTTP with auto-reconnect' },
      { id: 'q2', type: 'mcq', question: 'What actually stops token generation from billing after the user navigates away?', options: ['max_tokens', 'Propagating AbortController to the model call', 'A client timeout', 'Nothing'], correctOption: 1, idealAnswer: 'The abort signal must reach the provider call server-side' },
      { id: 'q3', type: 'short_answer', question: 'SSE vs WebSocket for an agent transcript?', idealAnswer: 'SSE for one-way token push; WebSocket when the client must inject input mid-run' },
      { id: 'q4', type: 'architecture', question: 'Design a streaming endpoint that survives proxies and reconnects.', idealAnswer: 'Chunked responses, request ids, resume-from event, idempotent model calls, server-side abort' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'Why stream instead of returning a full response?', idealAnswer: 'Time-to-first-token perception, incremental UX, and partial tool execution overlap' },
      { id: 'iq-2', question: 'What are the failure modes of streaming?', idealAnswer: 'Disconnects mid-stream, partial JSON, unbounded retries, and server work racing client abort' },
      { id: 'iq-3', question: 'How do you make a stream resumable?', idealAnswer: 'Persist events by request id and replay from last acknowledged event' },
    ],
  },

  'model-selection-cost-optimization': {
    topicId: 'rm-21',
    introduction: 'Choose the right model per task, account for every token you spend, and keep multi-user AI costs predictable.',
    estimatedHours: 15,
    difficulty: 'intermediate',
    objectives: [
      { id: 'obj-1', text: 'Map model tiers and families to task complexity' },
      { id: 'obj-2', text: 'Compute per-call token cost from pricing pages' },
      { id: 'obj-3', text: 'Implement token accounting middleware' },
      { id: 'obj-4', text: 'Use prompt and KV caching to cut input cost' },
      { id: 'obj-5', text: 'Route requests between cheap and capable models' },
      { id: 'obj-6', text: 'Benchmark models on a task suite' },
      { id: 'obj-7', text: 'Account for reasoning and tool-call token overhead' },
      { id: 'obj-8', text: 'Set spend budgets and alert thresholds' },
    ],
    resources: [
      { id: 'res-1', title: 'OpenAI Models Docs', kind: 'documentation', source: 'platform.openai.com', url: 'https://platform.openai.com/docs/models', description: 'Model families, context sizes, and capabilities.', difficulty: 'beginner', estimatedMinutes: 45, priority: 'high' },
      { id: 'res-2', title: 'Anthropic Models Overview', kind: 'documentation', source: 'docs.anthropic.com', url: 'https://docs.anthropic.com/en/docs/about-claude/models/overview', description: 'Claude model tiers and use-case fit.', difficulty: 'beginner', estimatedMinutes: 45, priority: 'high' },
      { id: 'res-3', title: 'LMSYS Chatbot Arena', kind: 'article', source: 'lmarena.ai', url: 'https://lmarena.ai/', description: 'Public model quality leaderboard.', difficulty: 'beginner', estimatedMinutes: 30, priority: 'high' },
      { id: 'res-4', title: 'OpenAI Pricing', kind: 'documentation', source: 'openai.com', url: 'https://openai.com/api/pricing/', description: 'Input, output, cache, and reasoning token pricing.', difficulty: 'beginner', estimatedMinutes: 30, priority: 'high' },
      { id: 'res-5', title: 'Anthropic Pricing', kind: 'documentation', source: 'anthropic.com', url: 'https://www.anthropic.com/pricing', description: 'Claude token pricing and cache discounts.', difficulty: 'beginner', estimatedMinutes: 30, priority: 'medium' },
      { id: 'res-6', title: 'LiteLLM', kind: 'repository', source: 'github.com', url: 'https://github.com/BerriAI/litellm', description: 'Model routing, fallback, and unified pricing.', difficulty: 'intermediate', estimatedMinutes: 60, priority: 'medium' },
      { id: 'res-7', title: 'OpenRouter Docs', kind: 'documentation', source: 'openrouter.ai', url: 'https://openrouter.ai/docs', description: 'Multi-model gateway and cost control.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Token Accounting Middleware', problem: 'Add per-request token and cost tracking to a small LLM service.', whyItMatters: 'You cannot optimize what you do not measure.', prerequisites: ['LLM APIs'], requirements: [
          { id: 'r1', text: 'Count input and output tokens per call' },
          { id: 'r2', text: 'Map counts to a model price table' },
          { id: 'r3', text: 'Track cache read and write tokens separately' },
          { id: 'r4', text: 'Expose usage on every response and in logs' },
          { id: 'r5', text: 'Roll up cost per user and per route' },
        ], hints: 'Prefer provider-reported usage over local tokenizers when available.', expectedOutput: 'A dashboard or log that shows cost per request and running totals.', acceptanceCriteria: [
          { id: 'a1', text: 'Costs match provider invoices for sample traffic' },
          { id: 'a2', text: 'Reasoning tokens are accounted for' },
          { id: 'a3', text: 'Prices are configurable without code changes' },
        ], skillsPracticed: ['Token accounting', 'Cost tracking'], estimatedMinutes: 150, difficulty: 'intermediate' },
      {
        id: 'lab-2', title: 'Model Router', problem: 'Route each request to a cheap or capable model based on task signals.', whyItMatters: 'Most traffic does not need a flagship model.', prerequisites: ['Lab 1'], requirements: [
          { id: 'r1', text: 'A rule-based tier (summaries to cheap, reasoning to flagships)' },
          { id: 'r2', text: 'A classifier that escalates hard cases' },
          { id: 'r3', text: 'Fallback when the primary model fails' },
          { id: 'r4', text: 'Measure fraction routed to expensive tier' },
          { id: 'r5', text: 'Keep response quality consistent between tiers' },
        ], hints: 'Escalate on explicit reasoning keywords, length, or tool-complexity heuristics.', expectedOutput: 'A router with a quality-vs-cost report.', acceptanceCriteria: [
          { id: 'a1', text: 'At least 70 percent of traffic lands on cheap tier' },
          { id: 'a2', text: 'Quality diffs are measured and reported' },
        ], skillsPracticed: ['Routing', 'Model selection', 'Evaluation'], estimatedMinutes: 180, difficulty: 'intermediate' },
      {
        id: 'lab-3', title: 'Model Bake-off', problem: 'Run several models on a fixed task suite and score quality against cost.', whyItMatters: 'Vendors overclaim; your data decides.', prerequisites: ['Lab 1'], requirements: [
          { id: 'r1', text: 'A task suite with graded outputs (at least 20 items)' },
          { id: 'r2', text: 'A script that runs every model on every task' },
          { id: 'r3', text: 'Score quality and total cost in one table' },
          { id: 'r4', text: 'Ranked recommendation per task type' },
          { id: 'r5', text: 'Note reasoning token overhead' },
        ], hints: 'Fix temperature and prompt for a fair comparison.', expectedOutput: 'A bake-off table with a per-task winner.', acceptanceCriteria: [
          { id: 'a1', text: 'Runs are reproducible' },
          { id: 'a2', text: 'Cost includes reasoning tokens' },
        ], skillsPracticed: ['Evaluation', 'Benchmarking', 'Cost analysis'], estimatedMinutes: 180, difficulty: 'intermediate' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Cost-Aware Model Gateway', problem: 'A gateway that routes, budgets, and meters spend across models.', requirements: [
        { id: 'r1', text: 'Unified API over multiple providers' },
        { id: 'r2', text: 'Cost-per-request accounting' },
        { id: 'r3', text: 'Per-user budget with hard stop' },
        { id: 'r4', text: 'Routing rules and fallback' },
        { id: 'r5', text: 'Spend dashboard and alerts' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'Gateway passes traffic through both tiers' },
        { id: 'a2', text: 'Budget breach blocks requests' },
        { id: 'a3', text: 'Alerts fire at 50 and 90 percent of budget' },
      ], skillsPracticed: ['Cost optimization', 'Routing', 'Budgets'], estimatedHours: 6 },
    repositories: [
      {
        id: 'repo-1', name: 'BerriAI/litellm', url: 'https://github.com/BerriAI/litellm', whyStudy: 'How a production gateway routes and counts cost.', whatToLookFor: 'Router, budget management, cost per token maps.', importantFiles: ['litellm/router.py', 'litellm/proxy/'], concepts: ['Routing', 'Budgeting', 'Provider abstraction'], guidedSteps: [
          { id: 's1', text: 'Read the README' },
          { id: 's2', text: 'Study the router decision path' },
          { id: 's3', text: 'Understand budget enforcement' },
          { id: 's4', text: 'Map cost tracking to your own middleware' },
        ] },
    ],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'Why is output cost almost always higher than input cost?', options: ['Marketing', 'Decode is sequential while prompt encoding is parallel', 'Output uses more context', 'It is arbitrary'], correctOption: 1, idealAnswer: 'Prefill is parallel; decode is token-by-token, memory-bound work' },
      { id: 'q2', type: 'mcq', question: 'What cost does prompt caching remove?', options: ['Output re-generation', 'Repeating identical prefix compute', 'Rate limits', 'Inference latency only'], correctOption: 1, idealAnswer: 'Caching reuses the KV cache of identical prefixes at discounted rates' },
      { id: 'q3', type: 'short_answer', question: 'How do reasoning tokens quietly raise spend?', idealAnswer: 'Thought tokens bill at output rates and are invisible in responses' },
      { id: 'q4', type: 'architecture', question: 'Design cost control for a chat app with 10k daily users.', idealAnswer: 'Accounting middleware, routing tiers, budgets per user, caching, cap max tokens, alert on anomaly' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'How do you decide which model a feature should use?', idealAnswer: 'Classify task difficulty, measure quality on your own set, compare cost per outcome not per token' },
      { id: 'iq-2', question: 'How would you cut an LLM bill by half?', idealAnswer: 'Route cheaper, cache prefixes, cap tokens, dedupe, compress stored context' },
      { id: 'iq-3', question: 'When is a cheaper model a false economy?', idealAnswer: 'When errors cause expensive retries, human review, or downstream failures' },
    ],
  },

  'planning-reasoning': {
    topicId: 'rm-22',
    introduction: 'Give agents explicit plans and reasoning loops so multi-step work is structured, verifiable, and bounded.',
    estimatedHours: 25,
    difficulty: 'intermediate',
    objectives: [
      { id: 'obj-1', text: 'Distinguish ReAct, plan-and-execute, ToT, and Reflexion' },
      { id: 'obj-2', text: 'Implement a ReAct loop manually' },
      { id: 'obj-3', text: 'Build a planner with structured plan output' },
      { id: 'obj-4', text: 'Add replanning driven by execution feedback' },
      { id: 'obj-5', text: 'Cap recursion to avoid loops' },
      { id: 'obj-6', text: 'Evaluate plan quality and efficiency' },
      { id: 'obj-7', text: 'Stream planner and executor events' },
      { id: 'obj-8', text: 'Design reasoning traces for debugging' },
    ],
    resources: [
      { id: 'res-1', title: 'ReAct: Synergizing Reasoning and Acting', kind: 'paper', source: 'arxiv.org', url: 'https://arxiv.org/abs/2210.03629', description: 'The reasoning-action-observation loop, the base of most agents.', difficulty: 'intermediate', estimatedMinutes: 90, priority: 'high' },
      { id: 'res-2', title: 'Plan-and-Solve Prompting', kind: 'paper', source: 'arxiv.org', url: 'https://arxiv.org/abs/2305.04091', description: 'Decompose tasks into steps before execution.', difficulty: 'intermediate', estimatedMinutes: 60, priority: 'high' },
      { id: 'res-3', title: 'Tree of Thoughts', kind: 'paper', source: 'arxiv.org', url: 'https://arxiv.org/abs/2305.10601', description: 'Branching search over reasoning steps.', difficulty: 'advanced', estimatedMinutes: 60, priority: 'medium' },
      { id: 'res-4', title: 'Reflexion', kind: 'paper', source: 'arxiv.org', url: 'https://arxiv.org/abs/2303.11366', description: 'Self-critique and retry from feedback.', difficulty: 'advanced', estimatedMinutes: 60, priority: 'medium' },
      { id: 'res-5', title: 'Anthropic: Building Effective Agents', kind: 'article', source: 'anthropic.com', url: 'https://www.anthropic.com/research/building-effective-agents', description: 'Practical agent architectures including planning patterns.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'high' },
      { id: 'res-6', title: 'LangGraph Plan-and-Execute Tutorial', kind: 'tutorial', source: 'langchain-ai.github.io', url: 'https://langchain-ai.github.io/langgraph/tutorials/plan-and-execute/plan-and-execute/', description: 'Working plan-execute-replan graph code.', difficulty: 'intermediate', estimatedMinutes: 90, priority: 'high' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'ReAct Loop From Scratch', problem: 'Implement a raw reasoning-action-observation loop with one tool, without a framework.', whyItMatters: 'Understanding the loop explains every framework.', prerequisites: ['LLM APIs', 'Tool calling'], requirements: [
          { id: 'r1', text: 'Thought, action, observation format' },
          { id: 'r2', text: 'At least one tool (calculator or web search)' },
          { id: 'r3', text: 'Max iterations guard' },
          { id: 'r4', text: 'Stop when the answer is produced' },
          { id: 'r5', text: 'Print the full trace' },
        ], hints: 'Tighten the prompt: reason briefly, then act.', expectedOutput: 'A CLI that solves a multi-step question with a visible trace.', acceptanceCriteria: [
          { id: 'a1', text: 'Solves a 3-step question' },
          { id: 'a2', text: 'Halts on budget exhaustion' },
        ], skillsPracticed: ['ReAct', 'Tool use', 'Trace debugging'], estimatedMinutes: 180, difficulty: 'intermediate' },
      {
        id: 'lab-2', title: 'Plan-and-Execute Graph', problem: 'Build a planner, executor, and replanner as a state graph with a recursion cap.', whyItMatters: 'Explicit planning cuts LLM calls and adds structure.', prerequisites: ['Lab 1', 'LangGraph basics'], requirements: [
          { id: 'r1', text: 'Planner outputs a structured step list' },
          { id: 'r2', text: 'Executor handles one step at a time' },
          { id: 'r3', text: 'Replanner revises remaining steps from results' },
          { id: 'r4', text: 'Recursion limit is enforced' },
          { id: 'r5', text: 'State is inspectable at every step' },
        ], hints: 'Give the replanner two options: finish with a response or produce a new plan.', expectedOutput: 'An agent that replans when results deviate from the plan.', acceptanceCriteria: [
          { id: 'a1', text: 'Replanning triggers in a scripted failure' },
          { id: 'a2', text: 'Infinite loops are impossible' },
        ], skillsPracticed: ['Plan-and-execute', 'LangGraph', 'State machines'], estimatedMinutes: 240, difficulty: 'intermediate' },
      {
        id: 'lab-3', title: 'Reflexion Retry Loop', problem: 'Add self-critique and insight retry after a failed attempt.', whyItMatters: 'Correctness loops matter more than scaffolds.', prerequisites: ['Lab 2'], requirements: [
          { id: 'r1', text: 'Run an attempt to completion' },
          { id: 'r2', text: 'Score the result automatically' },
          { id: 'r3', text: 'Write an insight about the failure' },
          { id: 'r4', text: 'Retry up to N times with the insight' },
          { id: 'r5', text: 'Log attempts and insights' },
        ], hints: 'Keep retry prompts small; insights should be sharp, not prose.', expectedOutput: 'An agent that improves across attempts on a benchmark.', acceptanceCriteria: [
          { id: 'a1', text: 'Improvement is measurable' },
          { id: 'a2', text: 'Retries are bounded' },
        ], skillsPracticed: ['Reflexion', 'Self-critique', 'Evaluation'], estimatedMinutes: 180, difficulty: 'advanced' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Research Planner Agent', problem: 'An agent that decomposes a research question, plans subtasks, executes, and replans as evidence arrives.', requirements: [
        { id: 'r1', text: 'Planner with structured plan output' },
        { id: 'r2', text: 'Tool-based execution (search + read)' },
        { id: 'r3', text: 'Replanning on dead ends' },
        { id: 'r4', text: 'Recursion limit and budget' },
        { id: 'r5', text: 'A written research brief with citations' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'Completes a multi-source research task' },
        { id: 'a2', text: 'Brief cites sources' },
        { id: 'a3', text: 'Traces show plan vs actual' },
      ], skillsPracticed: ['Planning', 'Reasoning', 'Tool use'], estimatedHours: 8 },
    repositories: [
      {
        id: 'repo-1', name: 'langchain-ai/langgraph', url: 'https://github.com/langchain-ai/langgraph', whyStudy: 'Production state machines for planning agents.', whatToLookFor: 'Checkpointers, interrupt, conditional edges.', importantFiles: ['libs/langgraph/checkpoint/'], concepts: ['Persistence', 'Node boundaries', 'Conditional routing'], guidedSteps: [
          { id: 's1', text: 'Read the README and concepts docs' },
          { id: 's2', text: 'Trace how state flows node to node' },
          { id: 's3', text: 'Understand checkpoint serialization' },
          { id: 's4', text: 'Model your planner graph in its terms' },
        ] },
    ],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'What does plan-and-execute improve over raw ReAct?', options: ['Nothing', 'Fewer planner LLM calls and clearer structure', 'Higher cost', 'Simpler code'], correctOption: 1, idealAnswer: 'Separation of planning from execution reduces calls and adds visibility' },
      { id: 'q2', type: 'mcq', question: 'Why enforce a recursion limit?', options: ['Style', 'LLMs can loop on ambiguous tasks', 'Limits are mandatory', 'Speed'], correctOption: 1, idealAnswer: 'Bounded exploration prevents infinite, costly loops' },
      { id: 'q3', type: 'short_answer', question: 'ReAct vs ToT?', idealAnswer: 'ReAct is a linear loop; ToT searches a branching tree of reasoning' },
      { id: 'q4', type: 'architecture', question: 'Design a planning agent that adapts when a step fails.', idealAnswer: 'Plan, execute, verify, replan; record failure insights; cap retries; expose the decision path' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'When should an agent plan explicitly rather than just react?', idealAnswer: 'Long-horizon, multi-tool, dependent tasks where step order matters' },
      { id: 'iq-2', question: 'How do you bound a thought loop?', idealAnswer: 'Recursion limit, tool-count budget, confidence-based termination, time budget' },
      { id: 'iq-3', question: 'How do you evaluate a planner?', idealAnswer: 'Step relevance, plan feasibility, replan count, end-task success' },
    ],
  },

  'human-in-the-loop': {
    topicId: 'rm-23',
    introduction: 'Design approval, interruption, and review flows so agents pause for judgment exactly where mistakes are expensive.',
    estimatedHours: 20,
    difficulty: 'intermediate',
    objectives: [
      { id: 'obj-1', text: 'Identify where to place human gates' },
      { id: 'obj-2', text: 'Implement interruptions with checkpoints' },
      { id: 'obj-3', text: 'Resume interrupted runs from saved state' },
      { id: 'obj-4', text: 'Review and edit tool-call arguments before execution' },
      { id: 'obj-5', text: 'Handle timeouts, rejections, and orphaned threads' },
      { id: 'obj-6', text: 'Persist checkpoints to durable storage' },
      { id: 'obj-7', text: 'Distinguish approve, reject, and edit flows' },
      { id: 'obj-8', text: 'Audit every human decision' },
    ],
    resources: [
      { id: 'res-1', title: 'LangGraph Human-in-the-Loop Concepts', kind: 'documentation', source: 'langchain-ai.github.io', url: 'https://langchain-ai.github.io/langgraph/concepts/human_in_the_loop/', description: 'Interrupt, resume, and review patterns.', difficulty: 'intermediate', estimatedMinutes: 60, priority: 'high' },
      { id: 'res-2', title: 'LangGraph Persistence Concepts', kind: 'documentation', source: 'langchain-ai.github.io', url: 'https://langchain-ai.github.io/langgraph/concepts/persistence/', description: 'How checkpointers make pauses durable.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'high' },
      { id: 'res-3', title: 'Anthropic: Building Effective Agents', kind: 'article', source: 'anthropic.com', url: 'https://www.anthropic.com/research/building-effective-agents', description: 'Approval patterns inside real agent workflows.', difficulty: 'intermediate', estimatedMinutes: 30, priority: 'high' },
      { id: 'res-4', title: 'langgraph Repository', kind: 'repository', source: 'github.com', url: 'https://github.com/langchain-ai/langgraph', description: 'Checkpointer and interrupt reference implementations.', difficulty: 'intermediate', estimatedMinutes: 60, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Approval Gate', problem: 'Pause an agent before a risky tool executes and let a human approve or reject.', whyItMatters: 'The core building block of supervised agents.', prerequisites: ['LangGraph basics', 'Persistence'], requirements: [
          { id: 'r1', text: 'Interrupt before the risky tool call' },
          { id: 'r2', text: 'Show the tool name, arguments, and summary' },
          { id: 'r3', text: 'Resume with approve or reject' },
          { id: 'r4', text: 'Rejected actions take a safe alternate path' },
          { id: 'r5', text: 'Record the decision and reason' },
        ], hints: 'Keep the idle step idempotent, because it runs again on resume.', expectedOutput: 'A demo where a human approves and rejects a send action.', acceptanceCriteria: [
          { id: 'a1', text: 'Pause resumes exactly where it stopped' },
          { id: 'a2', text: 'Rejection routes to a safe branch' },
        ], skillsPracticed: ['Interrupt', 'Resume', 'Approval flows'], estimatedMinutes: 150, difficulty: 'intermediate' },
      {
        id: 'lab-2', title: 'Review-and-Edit', problem: 'Let a human edit proposed tool arguments before execution.', whyItMatters: 'Editing beats rejecting for fixing arguments.', prerequisites: ['Lab 1'], requirements: [
          { id: 'r1', text: 'Pause with a proposed payload' },
          { id: 'r2', text: 'Human edits any argument' },
          { id: 'r3', text: 'Execute the edited payload' },
          { id: 'r4', text: 'Diff the original vs edited values in the log' },
          { id: 'r5', text: 'Guard against edits that break validation' },
        ], hints: 'Resume with Command(resume=edited_payload).', expectedOutput: 'A review screen that edits a draft email or search query.', acceptanceCriteria: [
          { id: 'a1', text: 'Edits propagate to execution' },
          { id: 'a2', text: 'Rejected edits do not execute' },
        ], skillsPracticed: ['State editing', 'Review flows'], estimatedMinutes: 180, difficulty: 'advanced' },
      {
        id: 'lab-3', title: 'Durable Checkpoints and Timeouts', problem: 'Persist pauses to PostgreSQL and reap stale threads.', whyItMatters: 'Real systems restart; humans walk away.', prerequisites: ['Lab 2', 'PostgreSQL'], requirements: [
          { id: 'r1', text: 'Checkpoints land in PostgreSQL, not memory' },
          { id: 'r2', text: 'A reaper marks threads waiting longer than a TTL' },
          { id: 'r3', text: 'Expired threads resume as cancelled with a reason' },
          { id: 'r4', text: 'Restarting the process finds in-flight threads' },
          { id: 'r5', text: 'Every decision writes an audit row' },
        ], hints: 'Store status transitions so you can prove what happened.', expectedOutput: 'A service where pauses survive restart and stale threads expire.', acceptanceCriteria: [
          { id: 'a1', text: 'Resume works after process restart' },
          { id: 'a2', text: 'TTL expiry marks threads cancelled' },
        ], skillsPracticed: ['Persistence', 'Timeouts', 'Auditing'], estimatedMinutes: 210, difficulty: 'advanced' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Expense Approval Agent', problem: 'An agent that auto-approves small amounts and gated large ones behind human approval with full audit.', requirements: [
        { id: 'r1', text: 'Risk-based gate placement' },
        { id: 'r2', text: 'Approval, rejection, and edit paths' },
        { id: 'r3', text: 'Checkpoints persisted to PostgreSQL' },
        { id: 'r4', text: 'Timeout and reaper for stale requests' },
        { id: 'r5', text: 'Complete audit trail' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'Large amounts never execute without approval' },
        { id: 'a2', text: 'Approvals resume after restart' },
        { id: 'a3', text: 'Audit shows every decision' },
      ], skillsPracticed: ['Human-in-the-loop', 'Persistence', 'Auditing'], estimatedHours: 8 },
    repositories: [
      {
        id: 'repo-1', name: 'langchain-ai/langgraph', url: 'https://github.com/langchain-ai/langgraph', whyStudy: 'Interrupt and checkpointer as production primitives.', whatToLookFor: 'Interrupt payload, checkpointer interface, command resume.', importantFiles: ['libs/langgraph/checkpoint/', 'libs/langgraph/langgraph/types.py'], concepts: ['Thread id', 'Checkpoint', 'Resume'], guidedSteps: [
          { id: 's1', text: 'Read the concepts docs' },
          { id: 's2', text: 'Trace interrupt state persistence' },
          { id: 's3', text: 'Understand Command resume semantics' },
          { id: 's4', text: 'Test idempotency around interrupt' },
        ] },
    ],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'Where should approval gates live?', options: ['Everywhere', 'Before consequential, irreversible actions', 'Never', 'Only in demos'], correctOption: 1, idealAnswer: 'Gate high-cost, hard-to-reverse actions; leave cheap safe ones automatic' },
      { id: 'q2', type: 'mcq', question: 'What makes a pause resumable across restarts?', options: ['Memory', 'A durable checkpointer keyed by thread id', 'Retries', 'Logs'], correctOption: 1, idealAnswer: 'Persistence of full graph state at the interrupt point' },
      { id: 'q3', type: 'short_answer', question: 'Approve vs edit vs reject?', idealAnswer: 'Approve runs as proposed; edit changes payload then runs; reject takes a safe alternate path' },
      { id: 'q4', type: 'architecture', question: 'Design HITL for a financial-payment agent.', idealAnswer: 'Gate payments, persist checkpoints, require approval above limits, audit decisions, expire stale threads' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'How do you choose between autonomy and human review?', idealAnswer: 'Evaluate error cost, reversibility, and latency tolerance; gate only where cost is high' },
      { id: 'iq-2', question: 'How do you stop a gated agent from getting stuck forever?', idealAnswer: 'TTL reapers, timeouts, default-cancel policies, and alerting on long waits' },
      { id: 'iq-3', question: 'What must be true for a resume to be safe?', idealAnswer: 'Side effects before the interrupt are idempotent and the checkpoint restores state atomically' },
    ],
  },

  'rag-systems-retrieval': {
    topicId: 'rm-24',
    introduction: 'Chunk, embed, index, and retrieve documents so grounded answers stay fast, accurate, and citeable.',
    estimatedHours: 35,
    difficulty: 'intermediate',
    objectives: [
      { id: 'obj-1', text: 'Explain the retrieval-augmented generation pipeline' },
      { id: 'obj-2', text: 'Choose chunking strategies by document type' },
      { id: 'obj-3', text: 'Embed text and store vectors in pgvector' },
      { id: 'obj-4', text: 'Combine dense and lexical search' },
      { id: 'obj-5', text: 'Use metadata filters to narrow candidates' },
      { id: 'obj-6', text: 'Write query rewrite and multi-query expansion' },
      { id: 'obj-7', text: 'Rerank candidates for final ordering' },
      { id: 'obj-8', text: 'Evaluate retrieval and generation quality' },
    ],
    resources: [
      { id: 'res-1', title: 'Pinecone: What is RAG?', kind: 'article', source: 'pinecone.io', url: 'https://www.pinecone.io/learn/retrieval-augmented-generation/', description: 'Clear visual intro to the whole pipeline.', difficulty: 'beginner', estimatedMinutes: 45, priority: 'high' },
      { id: 'res-2', title: 'Anthropic: Contextual Retrieval', kind: 'article', source: 'anthropic.com', url: 'https://www.anthropic.com/news/contextual-retrieval', description: 'Adding missing context to chunks to fix lost-config retrievals.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'high' },
      { id: 'res-3', title: 'RAG Survey', kind: 'paper', source: 'arxiv.org', url: 'https://arxiv.org/abs/2312.10997', description: 'Systematic survey of RAG techniques and evals.', difficulty: 'advanced', estimatedMinutes: 120, priority: 'medium' },
      { id: 'res-4', title: 'LangChain RAG Tutorial', kind: 'tutorial', source: 'python.langchain.com', url: 'https://python.langchain.com/docs/tutorials/rag/', description: 'Working RAG build with LangChain.', difficulty: 'intermediate', estimatedMinutes: 90, priority: 'medium' },
      { id: 'res-5', title: 'rag-from-scratch', kind: 'repository', source: 'github.com', url: 'https://github.com/langchain-ai/rag-from-scratch', description: 'Video series notebooks implementing RAG from first principles.', difficulty: 'intermediate', estimatedMinutes: 120, priority: 'medium' },
      { id: 'res-6', title: 'pgvector', kind: 'repository', source: 'github.com', url: 'https://github.com/pgvector/pgvector', description: 'Vector + SQL in one database.', difficulty: 'intermediate', estimatedMinutes: 60, priority: 'medium' },
      { id: 'res-7', title: 'RAGAS Docs', kind: 'documentation', source: 'docs.ragas.io', url: 'https://docs.ragas.io/', description: 'Off-the-shelf RAG evaluation metrics.', difficulty: 'intermediate', estimatedMinutes: 60, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Chunking Benchmark', problem: 'Compare chunking strategies on retrieval quality over a real corpus.', whyItMatters: 'Chunking decides what the model can ever see.', prerequisites: ['Embeddings'], requirements: [
          { id: 'r1', text: 'Fixed-size, recursive, and section-aware chunkers' },
          { id: 'r2', text: 'Embed all variants into separate collections' },
          { id: 'r3', text: 'A question set with expected passages' },
          { id: 'r4', text: 'Measure hit rate and mean reciprocal rank' },
          { id: 'r5', text: 'Report which chunker wins and why' },
        ], hints: 'Control for embedding model and chunk count when comparing.', expectedOutput: 'A comparison table of chunking strategies.', acceptanceCriteria: [
          { id: 'a1', text: 'All strategies scored on the same questions' },
          { id: 'a2', text: 'Winner is reproducible' },
        ], skillsPracticed: ['Chunking', 'Embeddings', 'Retrieval eval'], estimatedMinutes: 180, difficulty: 'intermediate' },
      {
        id: 'lab-2', title: 'Hybrid Search with pgvector', problem: 'Combine embedding similarity and PostgreSQL full-text search into one ranked result.', whyItMatters: 'Lexical search catches exact terms that dense search misses.', prerequisites: ['pgvector', 'PostgreSQL'], requirements: [
          { id: 'r1', text: 'Vector index with cosine distance' },
          { id: 'r2', text: 'tsvector GIN index for plain text' },
          { id: 'r3', text: 'Fuse scores with weighted reciprocal rank' },
          { id: 'r4', text: 'Support an OR and AND variant' },
          { id: 'r5', text: 'Benchmark fused vs each single method' },
        ], hints: 'Normalize each score before fusing so one family does not dominate.', expectedOutput: 'A search endpoint outperforming pure dense or pure lexical.', acceptanceCriteria: [
          { id: 'a1', text: 'Fusion beats both baselines on the eval set' },
          { id: 'a2', text: 'Queries stay under latency budget' },
        ], skillsPracticed: ['Hybrid search', 'pgvector', 'Rank fusion'], estimatedMinutes: 180, difficulty: 'advanced' },
      {
        id: 'lab-3', title: 'Query Rewrite and Filters', problem: 'Rewrite ambiguous questions, expand to multiple queries, and apply metadata filters.', whyItMatters: 'Retrieval quality starts with the query.', prerequisites: ['Lab 2'], requirements: [
          { id: 'r1', text: 'Rewrite to add missing context' },
          { id: 'r2', text: 'Generate 3 query variants for one question' },
          { id: 'r3', text: 'Merge candidate sets with dedup' },
          { id: 'r4', text: 'Extract metadata filters (date, type) from the query' },
          { id: 'r5', text: 'Measure recall improvement over single-query' },
        ], hints: 'Funnel: rewrite, expand, filter, retrieve, fuse.', expectedOutput: 'A retriever that beats single-shot on ambiguous queries.', acceptanceCriteria: [
          { id: 'a1', text: 'Metadata filter is applied' },
          { id: 'a2', text: 'Recall improves measurably' },
        ], skillsPracticed: ['Query rewriting', 'Multi-query', 'Metadata filtering'], estimatedMinutes: 180, difficulty: 'advanced' },
      {
        id: 'lab-4', title: 'RAG Evaluation', problem: 'Score a full RAG system with faithfulness and context-precision metrics.', whyItMatters: 'Good retrieval is necessary, not sufficient.', prerequisites: ['Lab 3', 'RAGAS'], requirements: [
          { id: 'r1', text: 'A golden set of 30+ question-answer pairs' },
          { id: 'r2', text: 'Retrieval metrics: precision and context recall' },
          { id: 'r3', text: 'Generation metrics: faithfulness and relevance' },
          { id: 'r4', text: 'A baseline pipeline to compare against' },
          { id: 'r5', text: 'Report failure cases with quotes' },
        ], hints: 'Log retrieved chunks with regenerated evidence for debugging.', expectedOutput: 'An eval report that names the weak link in the pipeline.', acceptanceCriteria: [
          { id: 'a1', text: 'Metrics computed on the golden set' },
          { id: 'a2', text: 'Regressions are catchable by the suite' },
        ], skillsPracticed: ['RAG eval', 'RAGAS', 'Faithfulness'], estimatedMinutes: 180, difficulty: 'advanced' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Document Q&A Assistant', problem: 'Ingest varied PDFs and answer questions with grounded, cited answers.', requirements: [
        { id: 'r1', text: 'Section-aware chunking' },
        { id: 'r2', text: 'Hybrid search in pgvector' },
        { id: 'r3', text: 'Query rewrite and metadata filters' },
        { id: 'r4', text: 'Reranking step' },
        { id: 'r5', text: 'Eval suite with 30 questions' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'Answers cite real passages' },
        { id: 'a2', text: 'Faithfulness score above 0.8' },
        { id: 'a3', text: 'Retrieval beats a single-dense baseline' },
      ], skillsPracticed: ['RAG', 'Hybrid search', 'Evaluation'], estimatedHours: 10 },
    repositories: [
      {
        id: 'repo-1', name: 'langchain-ai/rag-from-scratch', url: 'https://github.com/langchain-ai/rag-from-scratch', whyStudy: 'Step-by-step RAG implementation paths.', whatToLookFor: 'Chunking, embedding, retrieval, rerank, eval.', importantFiles: ['rag_from_scratch_9_to_10/'], concepts: ['Indexing', 'Retrieval', 'Advanced RAG'], guidedSteps: [
          { id: 's1', text: 'Read the README to map topics to notebooks' },
          { id: 's2', text: 'Copy the naive RAG, then the advanced one' },
          { id: 's3', text: 'Port the indexing into pgvector' },
          { id: 's4', text: 'Add rerank and eval' },
        ] },
    ],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'Why does pure embedding search fail on exact terms?', options: ['It never does', 'Nearest neighbors can miss rare exact tokens', 'Indexes are broken', 'Models are too big'], correctOption: 1, idealAnswer: 'Lexical terms can be lost in dense space; hybrid search recovers them' },
      { id: 'q2', type: 'mcq', question: 'What does reranking add on top of top-k retrieval?', options: ['Nothing', 'A strong cross-encoder reorders the shortlist', 'Faster search', 'Cheaper embeddings'], correctOption: 1, idealAnswer: 'A reranker scores candidates more carefully against the query' },
      { id: 'q3', type: 'short_answer', question: 'Why is context precision a key RAG metric?', idealAnswer: 'It measures whether the retrieved context actually answers the question, not just overall score' },
      { id: 'q4', type: 'architecture', question: 'Design RAG for a 1M-document corpus that stays under 800ms p95.', idealAnswer: 'Precompute chunks and embeddings, hybrid index, metadata filters, rerank on a shortlist, cache hot queries' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'Where do hallucinated RAG answers usually come from?', idealAnswer: 'Chunks missing the needed context, retrieval miss, or generation ignoring retrieved content' },
      { id: 'iq-2', question: 'How do you pick between RAG and fine-tuning?', idealAnswer: 'RAG for fresh/stable factual knowledge; fine-tuning for style, format, and domain behavior' },
      { id: 'iq-3', question: 'How do you debug a failed RAG answer?', idealAnswer: 'Inspect retrieved context at the failure point, then check chunking, query rewrite, and faithfulness' },
    ],
  },

  'llm-serving-caching-deployment': {
    topicId: 'rm-25',
    introduction: 'Run LLM workloads in production: serve with vLLM, cache aggressively, observe latency and cost, and release safely.',
    estimatedHours: 25,
    difficulty: 'advanced',
    objectives: [
      { id: 'obj-1', text: 'Serve an open model with an OpenAI-compatible endpoint' },
      { id: 'obj-2', text: 'Explain continuous batching and KV cache management' },
      { id: 'obj-3', text: 'Benchmark latency and throughput under load' },
      { id: 'obj-4', text: 'Cache semantic results with Redis' },
      { id: 'obj-5', text: 'Use prefix caching to cut repeated input cost' },
      { id: 'obj-6', text: 'Add rate limits, quotas, and health checks' },
      { id: 'obj-7', text: 'Emit structured observability for usage and errors' },
      { id: 'obj-8', text: 'Deploy a gateway with safe rollouts' },
    ],
    resources: [
      { id: 'res-1', title: 'vLLM Documentation', kind: 'documentation', source: 'docs.vllm.ai', url: 'https://docs.vllm.ai/', description: 'Serving engine, quantization, and OpenAI-compatible server.', difficulty: 'intermediate', estimatedMinutes: 90, priority: 'high' },
      { id: 'res-2', title: 'vllm-project/vllm', kind: 'repository', source: 'github.com', url: 'https://github.com/vllm-project/vllm', description: 'Reference inference engine with continuous batching.', difficulty: 'advanced', estimatedMinutes: 60, priority: 'high' },
      { id: 'res-3', title: 'Redis Documentation', kind: 'documentation', source: 'redis.io', url: 'https://redis.io/docs/latest/develop/', description: 'Data structures and caching patterns for hit-rate engineering.', difficulty: 'beginner', estimatedMinutes: 60, priority: 'medium' },
      { id: 'res-4', title: 'OpenTelemetry GenAI Semantics', kind: 'documentation', source: 'opentelemetry.io', url: 'https://opentelemetry.io/docs/specs/semconv/gen-ai/', description: 'Standard attributes for gen-AI spans and usage metrics.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'medium' },
      { id: 'res-5', title: 'LiteLLM', kind: 'repository', source: 'github.com', url: 'https://github.com/BerriAI/litellm', description: 'Gateway patterns for fallback and relay.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Serve and Benchmark', problem: 'Stand up a vLLM server and measure latency and throughput under concurrent load.', whyItMatters: 'Numbers, not guesses, drive capacity decisions.', prerequisites: ['Docker'], requirements: [
          { id: 'r1', text: 'Serve a small open model with an OpenAI-compatible API' },
          { id: 'r2', text: 'Load with concurrent clients at 1, 4, 16 concurrency' },
          { id: 'r3', text: 'Record p50/p95 latency and tokens per second' },
          { id: 'r4', text: 'Note batch sizes and KV usage' },
          { id: 'r5', text: 'Produce a capacity summary' },
        ], hints: 'Warm the model before benchmarking; prefix prompts to exercise cache hits.', expectedOutput: 'A benchmark report with a latency-throughput curve.', acceptanceCriteria: [
          { id: 'a1', text: 'Server matches client API shape' },
          { id: 'a2', text: 'Measurements are reproducible' },
        ], skillsPracticed: ['vLLM', 'Benchmarking', 'Capacity planning'], estimatedMinutes: 210, difficulty: 'advanced' },
      {
        id: 'lab-2', title: 'Semantic Cache with Redis', problem: 'Serve repeated or near-duplicate questions from a semantic cache instead of the model.', whyItMatters: 'Cache hits drop both latency and bill.', prerequisites: ['Embeddings', 'Redis'], requirements: [
          { id: 'r1', text: 'Embed the query and look up nearest cached keys' },
          { id: 'r2', text: 'Store hit distance threshold and TTL' },
          { id: 'r3', text: 'Cache miss pipelines fill the cache' },
          { id: 'r4', text: 'Track hit rate and savings' },
          { id: 'r5', text: 'Invalidate on source-document updates' },
        ], hints: 'Co-locate the embedding calculation cheaply, before the model call.', expectedOutput: 'A dashboard showing hit rate and cost saved.', acceptanceCriteria: [
          { id: 'a1', text: 'Near-duplicate questions hit cache' },
          { id: 'a2', text: 'Cache size stays bounded' },
        ], skillsPracticed: ['Semantic caching', 'Redis', 'Cost control'], estimatedMinutes: 180, difficulty: 'advanced' },
      {
        id: 'lab-3', title: 'Gateway with Observability', problem: 'Put a proxy in front of the server with rate limits, quotas, health checks, and structured telemetry.', whyItMatters: 'Production reliability comes from control and measurement.', prerequisites: ['Lab 1', 'REST APIs'], requirements: [
          { id: 'r1', text: 'Rate limit per API key' },
          { id: 'r2', text: 'Per-key monthly quota with hard stop' },
          { id: 'r3', text: 'Health and readiness endpoints' },
          { id: 'r4', text: 'Spans for latency, tokens, cache hits, and errors' },
          { id: 'r5', text: 'Fallback to a secondary backend on failure' },
        ], hints: 'Emit usage attributes in OpenTelemetry gen-ai format.', expectedOutput: 'A gateway where abuse is blocked and every call is observable.', acceptanceCriteria: [
          { id: 'a1', text: 'Rate limit triggers correctly' },
          { id: 'a2', text: 'Fallback works on server failure' },
          { id: 'a3', text: 'Dashboards show usage' },
        ], skillsPracticed: ['Gateways', 'Rate limiting', 'Observability'], estimatedMinutes: 240, difficulty: 'advanced' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Production LLM Gateway', problem: 'An end-to-end serving stack: vLLM backend, semantic cache, gateway, and monitoring.', requirements: [
        { id: 'r1', text: 'Open model served with vLLM' },
        { id: 'r2', text: 'Semantic caching layer' },
        { id: 'r3', text: 'Rate limits and quota controls' },
        { id: 'r4', text: 'Health checks and graceful rollout' },
        { id: 'r5', text: 'Latency and cost dashboards' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'Stack runs end to end on one deployment' },
        { id: 'a2', text: 'Cache hits visibly cut p95' },
        { id: 'a3', text: 'Abuse is rate-limited' },
      ], skillsPracticed: ['Serving', 'Caching', 'Observability', 'Deployment'], estimatedHours: 10 },
    repositories: [
      {
        id: 'repo-1', name: 'vllm-project/vllm', url: 'https://github.com/vllm-project/vllm', whyStudy: 'How an inference engine schedules and batches.', whatToLookFor: 'Continuous batching, KV block manager, prefix caching.', importantFiles: ['vllm/engine/', 'vllm/worker/'], concepts: ['Continuous batching', 'Paged KV cache', 'Prefix caching'], guidedSteps: [
          { id: 's1', text: 'Read the README and serve docs' },
          { id: 's2', text: 'Trace how requests enter the scheduler' },
          { id: 's3', text: 'Understand the KV block table' },
          { id: 's4', text: 'Explain why batch composition shifts throughput' },
        ] },
    ],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'Why is continuous batching faster than static batching?', options: ['It is not', 'It admits new requests as soon as slots free', 'It uses bigger GPUs', 'More prompts'], correctOption: 1, idealAnswer: 'Tokens, not requests, fill the batch so GPU idle time shrinks' },
      { id: 'q2', type: 'mcq', question: 'What does prefix caching reuse?', options: ['Generated text', 'KV cache for identical prompt prefixes', 'Embeddings', 'Nothing'], correctOption: 1, idealAnswer: 'Repeated prefixes avoid recomputing attention for shared tokens' },
      { id: 'q3', type: 'short_answer', question: 'Semantic cache vs exact cache?', idealAnswer: 'Semantic cache matches by embedding distance to serve paraphrases; exact only repeats' },
      { id: 'q4', type: 'architecture', question: 'Design a reliable LLM service at 50k requests a day.', idealAnswer: 'vLLM backend, gateway with quotas and fallback, semantic cache, dashboards, canary rollout, capacity by measured throughput' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'How do you choose batch size and concurrency for serving?', idealAnswer: 'Benchmark latency vs throughput trade-off and match SLOs; watch KV cache pressure' },
      { id: 'iq-2', question: 'What breaks in production that you only see at load?', idealAnswer: 'KV cache exhaustion, prefetch queue buildup, tail latency from long generations, and rate-limit thrash' },
      { id: 'iq-3', question: 'How do you safely roll out a model upgrade?', idealAnswer: 'A/B or canary with the eval suite, latency and cost dashboards, instant rollback' },
    ],
  },

  'linux-systems': {
    topicId: 'rm-26',
    introduction: 'Install and administer Linux: the shell, filesystem, permissions, processes, services, and bash scripting.',
    estimatedHours: 25,
    difficulty: 'beginner',
    objectives: [
      { id: 'obj-1', text: 'Explain the Linux filesystem hierarchy and navigation' },
      { id: 'obj-2', text: 'Use core command line utilities and pipes' },
      { id: 'obj-3', text: 'Manage files, users, and permissions' },
      { id: 'obj-4', text: 'Inspect and control processes and services' },
      { id: 'obj-5', text: 'Script common tasks with bash' },
      { id: 'obj-6', text: 'Install software with package managers' },
      { id: 'obj-7', text: 'Set up a hardened development environment on Linux' },
    ],
    resources: [
      { id: 'res-1', title: 'Introduction to Linux - Full Course for Beginners', kind: 'video', source: 'freeCodeCamp.org', url: 'https://www.youtube.com/watch?v=sWbUDq4S6Y8', description: 'Linux Foundation curriculum as a video course: families, CLI, processes, files.', difficulty: 'beginner', estimatedMinutes: 360, priority: 'high' },
      { id: 'res-2', title: 'Linux Operating System - Crash Course for Beginners', kind: 'video', source: 'freeCodeCamp.org', url: 'https://www.youtube.com/watch?v=ROjZy1WbCIA', description: 'Fast walkthrough of core commands, permissions, and the terminal.', difficulty: 'beginner', estimatedMinutes: 70, priority: 'medium' },
      { id: 'res-3', title: 'Linux Journey', kind: 'tutorial', source: 'linuxjourney.com', url: 'https://linuxjourney.com/', description: 'Free interactive lessons on the command line and filesystem.', difficulty: 'beginner', estimatedMinutes: 240, priority: 'high' },
      { id: 'res-4', title: 'The Missing Semester of Your CS Education', kind: 'tutorial', source: 'missing.csail.mit.edu', url: 'https://missing.csail.mit.edu/', description: 'MIT lecture notes on shell, processes, and tooling that classes skip.', difficulty: 'beginner', estimatedMinutes: 180, priority: 'high' },
      { id: 'res-5', title: 'The Linux Command Line', kind: 'article', source: 'linuxcommand.org', url: 'http://linuxcommand.org/tlcl.php', description: 'Free book covering bash and shell scripting in depth.', difficulty: 'intermediate', estimatedMinutes: 360, priority: 'medium' },
      { id: 'res-6', title: 'Ubuntu Server Documentation', kind: 'documentation', source: 'ubuntu.com', url: 'https://ubuntu.com/server/docs', description: 'Reference for installation, services, and administration.', difficulty: 'intermediate', estimatedMinutes: 120, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Filesystem and Permissions', problem: 'Navigate the tree, manage files, and set Unix permissions so only intended users can read or write.', whyItMatters: 'Every breach and outage trace checks decade of who-can-do-what. The kernel enforces permissions, so you must.', prerequisites: ['A Linux terminal'], requirements: [
          { id: 'r1', text: 'Create a nested worktree with a hierarchy of directories and files' },
          { id: 'r2', text: 'Set permissions both with symbolic and octal notation' },
          { id: 'r3', text: 'Create hard and symbolic links and verify they behave differently when the target is removed' },
          { id: 'r4', text: 'Use find, grep, and wc to answer questions across the tree' },
          { id: 'r5', text: 'Write a one-page note explaining each permission bit' },
        ], hints: 'Remember the chain: read on files vs execute on directories; test with ls -l and as another user.', expectedOutput: 'A directory tree whose ls -l output proves every rule works.', acceptanceCriteria: [
          { id: 'a1', text: 'Octet and symbolic permissions agree' },
          { id: 'a2', text: 'Links behave correctly on delete' },
        ], skillsPracticed: ['Command line', 'Permissions'], estimatedMinutes: 120, difficulty: 'beginner' },
      {
        id: 'lab-2', title: 'Processes and Services', problem: 'Monitor, control, and manage running processes and system services to keep the machine healthy.', whyItMatters: 'Production debugging starts with knowing what is running and why.', prerequisites: ['Lab 1'], requirements: [
          { id: 'r1', text: 'List processes by CPU and memory with ps, top or htop' },
          { id: 'r2', text: 'Send SIGTERM and SIGKILL and observe the difference' },
          { id: 'r3', text: 'Start, stop, and enable a service with systemctl' },
          { id: 'r4', text: 'Find a service failure in journalctl and fix the cause' },
          { id: 'r5', text: 'Schedule a job with crontab and verify it runs' },
        ], hints: 'Always prefer SIGTERM first; reserve SIGKILL for stuck processes.', expectedOutput: 'A controlled demo where a managed service and a scheduled job run reliably.', acceptanceCriteria: [
          { id: 'a1', text: 'Service restarts on command' },
          { id: 'a2', text: 'Scheduled job creates its expected artifact' },
        ], skillsPracticed: ['Processes', 'systemd'], estimatedMinutes: 120, difficulty: 'beginner' },
      {
        id: 'lab-3', title: 'Bash Scripting', problem: 'Write an idempotent backup script that archives, compresses, rotates old backups, and logs everything.', whyItMatters: 'Automation without error handling turns small mistakes into silent data loss.', prerequisites: ['Lab 1', 'Lab 2'], requirements: [
          { id: 'r1', text: 'Accept a source directory as an argument' },
          { id: 'r2', text: 'Use variables, conditionals, and a loop' },
          { id: 'r3', text: 'Set -euo pipefail and handle failures with exit codes' },
          { id: 'r4', text: 'Rotate backups, keeping the newest N' },
          { id: 'r5', text: 'Schedule the script with cron and test a rerun' },
        ], hints: 'Idempotent means running it twice does not duplicate or corrupt anything.', expectedOutput: 'A reusable script plus scheduled, non-duplicating backups.', acceptanceCriteria: [
          { id: 'a1', text: 'Rerun is safe' },
          { id: 'a2', text: 'Rotation keeps exactly N backups' },
        ], skillsPracticed: ['Bash', 'Automation'], estimatedMinutes: 180, difficulty: 'intermediate' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Self-Hosted Dev Server', problem: 'Provision your own Linux environment (local VM or a cheap VPS) and serve a small dev application from it.', requirements: [
        { id: 'r1', text: 'Fresh Linux install with a working SSH login' },
        { id: 'r2', text: 'Key-only SSH with root login disabled' },
        { id: 'r3', text: 'Install nginx, Node or Python, and a database' },
        { id: 'r4', text: 'Reverse-proxy a small app through nginx' },
        { id: 'r5', text: 'Snapshot or script a restore path for your setup' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'Remote login works with keys only' },
        { id: 'a2', text: 'The app is reachable through nginx' },
        { id: 'a3', text: 'Services restart after a reboot' },
        { id: 'a4', text: 'A documented way to restore from backup' },
      ], skillsPracticed: ['Linux', 'SSH', 'nginx'], estimatedHours: 8 },
    repositories: [
      {
        id: 'repo-1', name: 'missing-semester/missing-semester', url: 'https://github.com/missing-semester/missing-semester', whyStudy: 'Lecture notes for the command line, version control, and debugging.', whatToLookFor: 'The shell lecture and exercises you can run locally.', importantFiles: ['_lectures/', 'README.md'], concepts: ['Shell', 'Processes', 'Tooling'], guidedSteps: [
          { id: 's1', text: 'Read the shell lecture notes' },
          { id: 's2', text: 'Complete two exercise sheets' },
          { id: 's3', text: 'Apply the pipes and job-control patterns in your own terminal' },
        ] },
    ],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'What does chmod 640 mean?', options: ['Owner read, group read, others read', 'Owner read/write, group read, others none', 'Owner read/write/execute, group read/write, others read', 'Owner read, group none, others all'], correctOption: 1, idealAnswer: 'Owner has read and write; group has read; others have nothing' },
      { id: 'q2', type: 'mcq', question: 'Which command lists running processes?', options: ['ls', 'ps', 'grep', 'whoami'], correctOption: 1, idealAnswer: 'ps (and top/htop for live views)' },
      { id: 'q3', type: 'short_answer', question: 'Why compose small commands with pipes instead of one big script?', idealAnswer: 'Each tool does one thing well; pipes make behavior visible, testable, and reusable' },
      { id: 'q4', type: 'architecture', question: 'A production VM runs out of memory and disk. How do you investigate step by step?', idealAnswer: 'free and top/ps to find memory hogs, df and du for disk, journalctl for recent errors, then scale, clean, or tune' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'How do you find which process is listening on a port?', idealAnswer: 'ss -ltnp or lsof -i :PORT, then match PID to the process name' },
      { id: 'iq-2', question: 'You cannot write to a directory you own. Why?', idealAnswer: 'Write permission on the directory itself is required, or special bits/SELinux; check stat, mount options, and selinux denials' },
      { id: 'iq-3', question: 'How would you harden an SSH server?', idealAnswer: 'Key-only auth, disable root login, firewall/change port, and fail2ban or similar rate limiting' },
    ],
  },

  'system-design': {
    topicId: 'rm-27',
    introduction: 'Design scalable backend systems: gather requirements, scale horizontally, cache, pick databases, queue async work, and weigh trade-offs.',
    estimatedHours: 40,
    difficulty: 'intermediate',
    objectives: [
      { id: 'obj-1', text: 'Gather functional and non-functional requirements' },
      { id: 'obj-2', text: 'Choose vertical versus horizontal scaling' },
      { id: 'obj-3', text: 'Design stateless services behind a load balancer' },
      { id: 'obj-4', text: 'Pick SQL vs NoSQL and index sensibly' },
      { id: 'obj-5', text: 'Layer caching and CDNs to cut latency' },
      { id: 'obj-6', text: 'Decouple work with message queues' },
      { id: 'obj-7', text: 'Add rate limiting and idempotency' },
      { id: 'obj-8', text: 'Articulate trade-offs and failure modes' },
    ],
    resources: [
      { id: 'res-1', title: 'The System Design Primer', kind: 'repository', source: 'github.com', url: 'https://github.com/donnemartin/system-design-primer', description: 'Open curriculum covering scalability, caching, consistency, and case studies.', difficulty: 'intermediate', estimatedMinutes: 360, priority: 'high' },
      { id: 'res-2', title: 'System Design Concepts Course and Interview Prep', kind: 'video', source: 'freeCodeCamp.org', url: 'https://www.youtube.com/watch?v=F2FmTdLtb_4', description: 'Concepts plus interview walkthroughs: APIs, caching, queues, databases.', difficulty: 'beginner', estimatedMinutes: 240, priority: 'high' },
      { id: 'res-3', title: 'System Design for Beginners', kind: 'video', source: 'KodeKloud', url: 'https://www.youtube.com/watch?v=SE2KF-vxvS0', description: 'Fundamentals course on scaling a photo app from one server to many.', difficulty: 'beginner', estimatedMinutes: 180, priority: 'medium' },
      { id: 'res-4', title: 'Must-Know System Design Concepts', kind: 'article', source: 'freecodecamp.org', url: 'https://www.freecodecamp.org/news/systems-design-for-interviews/', description: 'Readable intro to the concepts asked in interviews.', difficulty: 'beginner', estimatedMinutes: 60, priority: 'medium' },
      { id: 'res-5', title: 'Designing Data-Intensive Applications', kind: 'article', source: 'dataintensive.net', url: 'https://dataintensive.net/', description: 'The reference book on storage, replication, and distributed systems.', difficulty: 'advanced', estimatedMinutes: 900, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Load Balancing and Stateless Services', problem: 'Scale an HTTP service horizontally behind a load balancer and make failures invisible to users.', whyItMatters: 'Horizontal scaling is the default path once one box is not enough.', prerequisites: ['Docker', 'HTTP basics'], requirements: [
          { id: 'r1', text: 'Run three instances of a tiny HTTP service' },
          { id: 'r2', text: 'Put nginx or HAProxy in front with health checks' },
          { id: 'r3', text: 'Keep the service stateless so any instance may serve a request' },
          { id: 'r4', text: 'Benchmark p95 with a load tool (wrk, hey, or ab)' },
          { id: 'r5', text: 'Kill one instance and show zero failed requests' },
        ], hints: 'If you need sessions, store them in a shared cache, not in instance memory.', expectedOutput: 'A service that survives instance loss within the latency budget.', acceptanceCriteria: [
          { id: 'a1', text: 'Kill test produces no failed requests' },
          { id: 'a2', text: 'p95 stays under the budget' },
        ], skillsPracticed: ['Load balancing', 'Horizontal scaling'], estimatedMinutes: 180, difficulty: 'intermediate' },
      {
        id: 'lab-2', title: 'Caching Layer', problem: 'Add a Redis cache in front of a datastore and measure the hit ratio and latency win.', whyItMatters: 'Caches are the highest-leverage latency lever for read-heavy workloads.', prerequisites: ['Lab 1', 'Docker'], requirements: [
          { id: 'r1', text: 'Implement cache-aside with a TTL' },
          { id: 'r2', text: 'Invalidate or refresh on writes' },
          { id: 'r3', text: 'Handle the cache-stampede case' },
          { id: 'r4', text: 'Report hit ratio and p95 with and without the cache' },
          { id: 'r5', text: 'Document the staleness window you accept' },
        ], hints: 'Guard concurrent misses with a single-flight or lock so one stale regeneration wins.', expectedOutput: 'A cache with measured hit ratio and latency improvement.', acceptanceCriteria: [
          { id: 'a1', text: 'Hit ratio above 80% on the workload' },
          { id: 'a2', text: 'p95 improves measurably' },
        ], skillsPracticed: ['Caching', 'Redis'], estimatedMinutes: 180, difficulty: 'intermediate' },
      {
        id: 'lab-3', title: 'Queues for Async Work', problem: 'Move slow background work out of the request path behind a message queue with retries.', whyItMatters: 'Happy-path latency drops when writes are queued instead of done inline.', prerequisites: ['Lab 2'], requirements: [
          { id: 'r1', text: 'Publish jobs and run at least two consumers' },
          { id: 'r2', text: 'Retry failures with a dead-letter queue' },
          { id: 'r3', text: 'Make consumers idempotent' },
          { id: 'r4', text: 'Kill a consumer mid-job and show no job is lost' },
          { id: 'r5', text: 'Note ordering assumptions you make' },
        ], hints: 'At-least-once plus idempotency is the reliable baseline; ordering costs throughput.', expectedOutput: 'Workers that recover from crashes without losing jobs.', acceptanceCriteria: [
          { id: 'a1', text: 'No job lost across consumer restarts' },
          { id: 'a2', text: 'Idempotency verified by replaying a job' },
        ], skillsPracticed: ['Message queues', 'Background work'], estimatedMinutes: 180, difficulty: 'advanced' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Design and Harden a URL Shortener', problem: 'Write an architecture doc and ship a minimal working URL shortener that takes real traffic.', requirements: [
        { id: 'r1', text: 'Requirements doc: QPS, p99 latency, cardinality' },
        { id: 'r2', text: 'API design with create and redirect endpoints' },
        { id: 'r3', text: 'Hash plus a SQL store for lookups' },
        { id: 'r4', text: 'Cache hot entries in Redis' },
        { id: 'r5', text: 'Rate-limit creation and count redirects asynchronously' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'Trade-off table in the doc' },
        { id: 'a2', text: 'Handles 100 rps load test' },
        { id: 'a3', text: 'p99 below 100ms on redirects' },
        { id: 'a4', text: 'Analytics captured without blocking requests' },
      ], skillsPracticed: ['System design', 'Caching', 'Queues'], estimatedHours: 10 },
    repositories: [
      {
        id: 'repo-1', name: 'donnemartin/system-design-primer', url: 'https://github.com/donnemartin/system-design-primer', whyStudy: 'The most complete open curriculum for design interviews and concepts.', whatToLookFor: 'Solutions, diagrams, and trade-off tables.', importantFiles: ['README.md', 'solutions/'], concepts: ['Load balancing', 'Caching', 'Sharding'], guidedSteps: [
          { id: 's1', text: 'Read the core concepts chapter by chapter' },
          { id: 's2', text: 'Redraw each diagram from memory' },
          { id: 's3', text: 'Apply the checklist to the URL shortener design' },
        ] },
    ],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'What makes a service stateless?', options: ['No data is stored on disk', 'It keeps no request-scoped state in memory', 'It uses no database', 'It is served over HTTP'], correctOption: 1, idealAnswer: 'Any instance can serve any request, so you scale by adding instances' },
      { id: 'q2', type: 'mcq', question: 'When is a message queue the right call?', options: ['For every write', 'To decouple bursty async work from the request path', 'To speed up one SQL query', 'To replace a cache'], correctOption: 1, idealAnswer: 'Queues absorb bursts and let slow work retry off the critical path' },
      { id: 'q3', type: 'short_answer', question: 'What can go wrong when you cache too aggressively?', idealAnswer: 'Stale reads, cache stampedes, memory cost, and a false sense of consistency' },
      { id: 'q4', type: 'architecture', question: 'Design a read-heavy news feed for 10M users under 300ms p99.', idealAnswer: 'CDN plus hot-feed cache in front of read replicas, async fan-out writes through a queue, pagination and cursor-based reads' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'How would you scale a relational database past a single node?', idealAnswer: 'Read replicas first, then indexing and caching; only then shard by access pattern while keeping joins and transactions contained' },
      { id: 'iq-2', question: 'Vertical or horizontal scaling first?', idealAnswer: 'Vertical buys time with no code change; horizontal when you hit the ceiling or need availability, at the cost of distribution complexity' },
      { id: 'iq-3', question: 'How do caches fail in production?', idealAnswer: 'Stale data, stampedes on expiry, eviction thrash, and relying on them for correctness instead of speed' },
    ],
  },

  'open-source-contribution': {
    topicId: 'rm-28',
    introduction: 'Contribute to open source responsibly: evaluate projects, follow contribution guides, open clean issues and pull requests, and collaborate with maintainers.',
    estimatedHours: 15,
    difficulty: 'beginner',
    objectives: [
      { id: 'obj-1', text: 'Explain licensing and governance basics' },
      { id: 'obj-2', text: 'Find projects with good onboarding paths' },
      { id: 'obj-3', text: 'Read CONTRIBUTING and README before acting' },
      { id: 'obj-4', text: 'Fork, branch, and open a clean pull request' },
      { id: 'obj-5', text: 'Report issues with reproduction steps' },
      { id: 'obj-6', text: 'Navigate maintainer review and feedback' },
      { id: 'obj-7', text: 'Contribute documentation and tests before risky code' },
    ],
    resources: [
      { id: 'res-1', title: 'Open Source Guide: How to Contribute', kind: 'documentation', source: 'opensource.guide', url: 'https://opensource.guide/how-to-contribute/', description: 'The canonical guide on finding projects and making contributions.', difficulty: 'beginner', estimatedMinutes: 60, priority: 'high' },
      { id: 'res-2', title: 'Complete Guide to Open Source - How to Contribute', kind: 'video', source: 'freeCodeCamp.org', url: 'https://www.youtube.com/watch?v=yzeVMecydCE', description: 'End-to-end walkthrough of issues, PRs, and communication norms.', difficulty: 'beginner', estimatedMinutes: 300, priority: 'high' },
      { id: 'res-3', title: 'First Contributions', kind: 'repository', source: 'github.com', url: 'https://github.com/firstcontributions/first-contributions', description: 'A safe repo to practice fork-branch-PR with zero risk.', difficulty: 'beginner', estimatedMinutes: 30, priority: 'high' },
      { id: 'res-4', title: 'Good First Issue', kind: 'repository', source: 'goodfirstissue.dev', url: 'https://goodfirstissue.dev/', description: 'Directory of beginner-friendly issues across popular repos.', difficulty: 'beginner', estimatedMinutes: 45, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Evaluate and Choose a Project', problem: 'Shortlist three candidate projects and make an evidence-backed pick for your first contribution.', whyItMatters: 'The project you choose decides how productive the whole contribution is.', prerequisites: ['Git'], requirements: [
          { id: 'r1', text: 'Filter by language, stars, and good-first-issue labels' },
          { id: 'r2', text: 'Read the README and CONTRIBUTING of each candidate' },
          { id: 'r3', text: 'Check recent activity: merged PRs, CI status, maintainer responses' },
          { id: 'r4', text: 'Note the licensing model and how changes get accepted' },
          { id: 'r5', text: 'Write a one-paragraph decision note with evidence' },
        ], hints: 'A slower-but-responsive maintainer beats a star count.', expectedOutput: 'A decision note naming one project and why.', acceptanceCriteria: [
          { id: 'a1', text: 'Chosen project is active' },
          { id: 'a2', text: 'Good-first-issue path exists' },
        ], skillsPracticed: ['Research', 'Evaluation'], estimatedMinutes: 90, difficulty: 'beginner' },
      {
        id: 'lab-2', title: 'First Documentation PR', problem: 'Open and land a documentation improvement on a real project.', whyItMatters: 'Docs contributions teach the full flow with minimal surface for mistakes.', prerequisites: ['Lab 1', 'Git'], requirements: [
          { id: 'r1', text: 'Fork the repo and create a descriptive branch' },
          { id: 'r2', text: 'Make one focused doc change (typo, clearer example, missing step)' },
          { id: 'r3', text: 'Add tests if the project expects them' },
          { id: 'r4', text: 'Open a PR referencing any related issue' },
          { id: 'r5', text: 'Iterate on reviewer feedback until merge or clear resolution' },
        ], hints: 'Match the repo commit style; small and focused PRs move fastest.', expectedOutput: 'A merged or reviewable pull request.', acceptanceCriteria: [
          { id: 'a1', text: 'PR references an issue or rationale' },
          { id: 'a2', text: 'Change follows the project conventions' },
        ], skillsPracticed: ['GitHub', 'PRs'], estimatedMinutes: 180, difficulty: 'beginner' },
      {
        id: 'lab-3', title: 'Actionable Bug Report', problem: 'Write a bug report good enough that a maintainer can reproduce it without phone calls.', whyItMatters: 'A reproducible report is the fastest path to a fix.', prerequisites: ['Lab 1'], requirements: [
          { id: 'r1', text: 'Reproduction steps that run from a clean state' },
          { id: 'r2', text: 'Expected versus actual behavior' },
          { id: 'r3', text: 'Environment: versions, OS, browser, config' },
          { id: 'r4', text: 'Minimal example or logs/screenshots' },
          { id: 'r5', text: 'Confidence level and any workaround tried' },
        ], hints: 'Test your own steps on a fresh machine before filing.', expectedOutput: 'An issue a maintainer can reproduce in one pass.', acceptanceCriteria: [
          { id: 'a1', text: 'Steps are copy-paste reproducible' },
          { id: 'a2', text: 'Expected vs actual is explicit' },
        ], skillsPracticed: ['Communication', 'Debugging'], estimatedMinutes: 120, difficulty: 'beginner' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Ship a Small Contribution', problem: 'Land one substantive contribution to a project you actually use: documentation, tests, or a small code fix.', requirements: [
        { id: 'r1', text: 'Pick a project from your own stack' },
        { id: 'r2', text: 'Read CONTRIBUTING fully' },
        { id: 'r3', text: 'Submit a merged or accepted PR or a well-received issue' },
        { id: 'r4', text: 'Engage with reviewer feedback constructively' },
        { id: 'r5', text: 'Reflect on what you learned in your notes' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'A real PR URL or accepted issue exists' },
        { id: 'a2', text: 'Contribution is documented' },
        { id: 'a3', text: 'Reflection is written down' },
      ], skillsPracticed: ['Open source', 'Collaboration'], estimatedHours: 6 },
    repositories: [
      {
        id: 'repo-1', name: 'firstcontributions/first-contributions', url: 'https://github.com/firstcontributions/first-contributions', whyStudy: 'Zero-risk app to practice fork, branch, and pull request.', whatToLookFor: 'The guided tutorial in the README.', importantFiles: ['README.md'], concepts: ['Forking', 'Pull requests'], guidedSteps: [
          { id: 's1', text: 'Fork the repository' },
          { id: 's2', text: 'Add your name to the contributors list' },
          { id: 's3', text: 'Create a pull request and watch it get merged' },
        ] },
    ],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'Why do projects ask you to read CONTRIBUTING first?', options: ['It is a formality', 'It defines build, test, and PR conventions', 'It lists salaries', 'It blocks beginners'], correctOption: 1, idealAnswer: 'It encodes how the project expects builds, tests, and pull requests to work' },
      { id: 'q2', type: 'mcq', question: 'Why fork a repository before contributing?', options: ['To delete it', 'You cannot push branches to repos you do not own', 'Forking pays the maintainer', 'It is required by the license'], correctOption: 1, idealAnswer: 'You need a copy you can push to, then propose changes back via a PR' },
      { id: 'q3', type: 'short_answer', question: 'What makes an issue maintainers love?', idealAnswer: 'Clean reproduction steps, expected vs actual, environment, and a minimal example' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'How do you choose an open source project to contribute to?', idealAnswer: 'Projects I use, with active maintainers, clear contribution guides, and welcoming issue labels' },
      { id: 'iq-2', question: 'Your PR gets harsh review feedback. What do you do?', idealAnswer: 'Stay curious, separate technical objections from tone, ask clarifying questions, and improve the change' },
      { id: 'iq-3', question: 'How do you make a bug report maintainers can act on?', idealAnswer: 'Minimal reproducible steps, explicit expected vs actual, environment details, and logs' },
    ],
  },

  'context-isolation': {
    topicId: 'rm-29',
    introduction: 'Keep agent context small, clean, and segmented: sub-agents with dedicated windows, sandboxed tool output, scratchpads, and just-in-time retrieval.',
    estimatedHours: 20,
    difficulty: 'intermediate',
    objectives: [
      { id: 'obj-1', text: 'Explain why large shared contexts degrade performance' },
      { id: 'obj-2', text: 'Split work across sub-agents with dedicated windows' },
      { id: 'obj-3', text: 'Sandbox token-dense tool execution' },
      { id: 'obj-4', text: 'Use scratchpads and state fields to isolate data' },
      { id: 'obj-5', text: 'Apply just-in-time retrieval instead of preloading' },
      { id: 'obj-6', text: 'Measure token usage to find bloat' },
    ],
    resources: [
      { id: 'res-1', title: 'Effective Context Engineering for AI Agents', kind: 'article', source: 'anthropic.com', url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents', description: 'Anthropic on compaction, structured note-taking, and multi-agent architectures.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'high' },
      { id: 'res-2', title: 'Context Engineering (write, select, compress, isolate)', kind: 'article', source: 'langchain.com', url: 'https://www.langchain.com/blog/context-engineering-for-agents', description: 'The four-bucket framework with isolation as a first-class strategy.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'high' },
      { id: 'res-3', title: 'How We Built Our Multi-Agent Research System', kind: 'article', source: 'anthropic.com', url: 'https://www.anthropic.com/engineering/built-multi-agent-research-system', description: 'Production example of isolated sub-agent contexts plus evidence summaries.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'medium' },
      { id: 'res-4', title: 'Context Engineering for AI Agents: Complete Course', kind: 'video', source: 'Marina Wyss', url: 'https://www.youtube.com/watch?v=-h9VVJIqtvA', description: 'Walkthrough of write-select-compress-isolate with agent examples.', difficulty: 'intermediate', estimatedMinutes: 90, priority: 'medium' },
      { id: 'res-5', title: 'Context Engineering Explained', kind: 'video', source: 'Google Cloud Tech', url: 'https://www.youtube.com/watch?v=BBPQYtR7oUk', description: 'What context engineering is and how to curate, control, and isolate.', difficulty: 'beginner', estimatedMinutes: 30, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Scratchpad vs Bloat', problem: 'Compare an agent that carries full history against one that writes decisions to a scratchpad and reads them back.', whyItMatters: 'Notes cost a fraction of raw history and survive compaction.', prerequisites: ['Agent loops', 'Types'], requirements: [
          { id: 'r1', text: 'Build a 20-step task where intermediate facts matter later' },
          { id: 'r2', text: 'Variant A keeps the whole transcript; variant B writes and reloads notes' },
          { id: 'r3', text: 'Run both on identical inputs' },
          { id: 'r4', text: 'Record tokens per turn and final task accuracy' },
          { id: 'r5', text: 'Report the token and accuracy difference' },
        ], hints: 'Keep the note schema small and explicit so the model does not recreate it.', expectedOutput: 'A comparison table showing tokens and accuracy.', acceptanceCriteria: [
          { id: 'a1', text: 'Both variants run the same task' },
          { id: 'a2', text: 'Token usage is actually logged' },
        ], skillsPracticed: ['Scratchpads', 'Context management'], estimatedMinutes: 180, difficulty: 'intermediate' },
      {
        id: 'lab-2', title: 'Sub-Agent Isolation', problem: 'Split one agent into a coordinator plus research sub-agents that return only distilled summaries.', whyItMatters: 'Each sub-agent gets a clean window and cannot poison the whole system.', prerequisites: ['Lab 1', 'Multi-agent basics'], requirements: [
          { id: 'r1', text: 'Define a narrow task and turn for each sub-agent' },
          { id: 'r2', text: 'Sub-agents write raw findings to storage, not the parent window' },
          { id: 'r3', text: 'Parents receive only a summary or pointer' },
          { id: 'r4', text: 'Compare a single-agent baseline on tokens and quality' },
          { id: 'r5', text: 'Contain a deliberately bad sub-agent and show the parent is unaffected' },
        ], hints: 'The parent should never see raw tool spew from a worker.', expectedOutput: 'A working coordinator-worker setup with token savings logged.', acceptanceCriteria: [
          { id: 'a1', text: 'Parent window stays small' },
          { id: 'a2', text: 'Bad sub-agent does not corrupt other results' },
        ], skillsPracticed: ['Sub-agents', 'Orchestration'], estimatedMinutes: 240, difficulty: 'advanced' },
      {
        id: 'lab-3', title: 'Sandboxed Tools', problem: 'Run token-heavy tools (file reads, web fetches) in a sandbox and return only a digest.', whyItMatters: 'Raw dumps vanish; the model gets what it needs, not megabytes.', prerequisites: ['Lab 2'], requirements: [
          { id: 'r1', text: 'Execute tools in a subprocess or container' },
          { id: 'r2', text: 'Return a filtered summary or pointer instead of raw output' },
          { id: 'r3', text: 'Stay under a strict token budget per turn' },
          { id: 'r4', text: 'Support read-on-demand when the model asks for more' },
          { id: 'r5', text: 'Log boundary bytes: what entered vs what stayed out' },
        ], hints: 'Apply the pattern where output is large: file dumps, search results, HTML.', expectedOutput: 'An agent whose context stays under budget regardless of tool size.', acceptanceCriteria: [
          { id: 'a1', text: 'Token budget is enforced' },
          { id: 'a2', text: 'Large outputs are never dumped in full' },
        ], skillsPracticed: ['Sandboxing', 'Tool abstraction'], estimatedMinutes: 240, difficulty: 'advanced' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Budget-Safe Agent', problem: 'Build a multi-step research agent whose context never exceeds a fixed budget while keeping task quality.', requirements: [
        { id: 'r1', text: 'A coordinator plus at least three workers' },
        { id: 'r2', text: 'Workers persist notes outside the window' },
        { id: 'r3', text: 'Sandboxed execution for token-dense tools' },
        { id: 'r4', text: 'A hard token budget with enforcement' },
        { id: 'r5', text: 'Evaluation vs a naive single-context baseline' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'Documented token savings' },
        { id: 'a2', text: 'Task quality maintained or improved' },
        { id: 'a3', text: 'No raw tool dump in the parent window' },
      ], skillsPracticed: ['Context isolation', 'Agent design', 'Evaluation'], estimatedHours: 8 },
    repositories: [
      {
        id: 'repo-1', name: 'langchain-ai/langgraph', url: 'https://github.com/langchain-ai/langgraph', whyStudy: 'Primitives for stateful, checkpointed and sub-graph agent designs.', whatToLookFor: 'State schema isolation and sub-graph patterns.', importantFiles: ['libs/langgraph/'], concepts: ['State', 'Subgraphs', 'Checkpointing'], guidedSteps: [
          { id: 's1', text: 'Read the state schema docs' },
          { id: 's2', text: 'Build a sub-graph that keeps worker state private' },
          { id: 's3', text: 'Port your lab-2 coordinator to LangGraph' },
        ] },
    ],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'Why do sub-agents improve long tasks?', options: ['They are faster models', 'Each gets a clean context window and bounds failures to one window', 'They never make mistakes', 'They use less compute'], correctOption: 1, idealAnswer: 'Clean windows stay small and a bad sub-agent cannot cascade corruption' },
      { id: 'q2', type: 'mcq', question: 'Where should megabytes of tool output live?', options: ['In the system prompt', 'Outside the context window, fetched on demand', 'In every message', 'In the evaluation set'], correctOption: 1, idealAnswer: 'Persist it and recall only digests or pointers when needed' },
      { id: 'q3', type: 'short_answer', question: 'When is context isolation overkill?', idealAnswer: 'For short single-purpose tasks where the overhead of orchestration exceeds the context savings' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'Your agent context is 90% tool output. How do you fix it?', idealAnswer: 'Sandbox execution, return digests, keep pointers to full data, and only reload on demand' },
      { id: 'iq-2', question: 'When is context isolation overkill?', idealAnswer: 'Short tasks with small inputs: extra architecture buys nothing' },
      { id: 'iq-3', question: 'How do sub-agents communicate results without bloating the coordinator?', idealAnswer: 'They persist raw work to storage and return compact summaries or references' },
    ],
  },

  'context-evaluation': {
    topicId: 'rm-30',
    introduction: 'Measure whether assembled context is actually good: relevance, precision, recall, and audits of context rot over long sessions.',
    estimatedHours: 20,
    difficulty: 'intermediate',
    objectives: [
      { id: 'obj-1', text: 'Define context quality metrics: relevance, precision, recall' },
      { id: 'obj-2', text: 'Build a golden set of context turn cases' },
      { id: 'obj-3', text: 'Score retrieved versus needed context' },
      { id: 'obj-4', text: 'Detect context rot in long sessions' },
      { id: 'obj-5', text: 'A/B test context engineering changes safely' },
      { id: 'obj-6', text: 'Log and audit failures caused by bad context' },
    ],
    resources: [
      { id: 'res-1', title: 'Effective Context Engineering for AI Agents', kind: 'article', source: 'anthropic.com', url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents', description: 'Framework for what high-quality context is and how to curate it.', difficulty: 'intermediate', estimatedMinutes: 45, priority: 'high' },
      { id: 'res-2', title: 'What Is Context Engineering? Why It Matters for AI Agents', kind: 'video', source: 'IBM Technology', url: 'https://www.youtube.com/watch?v=Qx0fCqpkBus', description: 'Good context characteristics and why more tokens can hurt.', difficulty: 'beginner', estimatedMinutes: 20, priority: 'medium' },
      { id: 'res-3', title: 'LangSmith Evaluation', kind: 'documentation', source: 'docs.smith.langchain.com', url: 'https://docs.smith.langchain.com/evaluation', description: 'Tooling to score and compare prompt and context variants.', difficulty: 'intermediate', estimatedMinutes: 90, priority: 'medium' },
      { id: 'res-4', title: 'RAGAS Documentation', kind: 'documentation', source: 'docs.ragas.io', url: 'https://docs.ragas.io/', description: 'Context precision and recall metrics for retrieval systems.', difficulty: 'intermediate', estimatedMinutes: 60, priority: 'medium' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Golden Set for Context', problem: 'Build a small curated dataset of turns with the ideal context each turn needs.', whyItMatters: 'You cannot measure context quality without a target.', prerequisites: ['Evaluation basics'], requirements: [
          { id: 'r1', text: 'Create 25+ real turns from a task you run' },
          { id: 'r2', text: 'For each, list the information the model actually needed' },
          { id: 'r3', text: 'Tag entries as missing, noisy, or conflicting context' },
          { id: 'r4', text: 'Write a scoring rubric for relevance' },
          { id: 'r5', text: 'Have a second pass validate the labels' },
        ], hints: 'Label the absence problem separately from the oversupply problem.', expectedOutput: 'A dataset plus a rubric, stored with the project.', acceptanceCriteria: [
          { id: 'a1', text: 'At least 25 labeled turns' },
          { id: 'a2', text: 'Rubric is applied consistently' },
        ], skillsPracticed: ['Dataset design', 'Labeling'], estimatedMinutes: 150, difficulty: 'intermediate' },
      {
        id: 'lab-2', title: 'Score an Agent Context', problem: 'Instrument an existing agent to log every context section per turn, then score it against the golden set.', whyItMatters: 'Scores without traces are guesses.', prerequisites: ['Lab 1'], requirements: [
          { id: 'r1', text: 'Capture system, retrieved, memory, and tool sections per turn' },
          { id: 'r2', text: 'Count tokens per section' },
          { id: 'r3', text: 'Score relevance against the expected context' },
          { id: 'r4', text: 'Report per-section precision and recall' },
          { id: 'r5', text: 'Name the section that wastes the most tokens' },
        ], hints: 'Start with deterministic checks, then add model-graded scores.', expectedOutput: 'A per-section quality report.', acceptanceCriteria: [
          { id: 'a1', text: 'Report covers all sections' },
          { id: 'a2', text: 'Worst section is named with evidence' },
        ], skillsPracticed: ['Instrumentation', 'Context metrics'], estimatedMinutes: 180, difficulty: 'advanced' },
      {
        id: 'lab-3', title: 'Context Rot Experiment', problem: 'Run one long task repeatedly and plot accuracy against session length and context noise.', whyItMatters: 'Rot is the reason long sessions fail even when short ones pass.', prerequisites: ['Lab 2'], requirements: [
          { id: 'r1', text: 'Run a 40+ step task with sampling points' },
          { id: 'r2', text: 'Measure accuracy at several depths' },
          { id: 'r3', text: 'Track noise and token count per step' },
          { id: 'r4', text: 'Check a needle fact planted early is still used later' },
          { id: 'r5', text: 'Report the breakpoint where quality drops' },
        ], hints: 'Needle-in-haystack checks isolate retention from general confusion.', expectedOutput: 'A curve and the breakpoint where context rot appears.', acceptanceCriteria: [
          { id: 'a1', text: 'Breakpoint is identified' },
          { id: 'a2', text: 'Needle test is included' },
        ], skillsPracticed: ['Experiments', 'Context rot'], estimatedMinutes: 240, difficulty: 'advanced' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Context Eval Harness', problem: 'Ship a reusable harness that compares two context strategies on the same task and decides a winner.', requirements: [
        { id: 'r1', text: 'Configuration for strategy A and B' },
        { id: 'r2', text: 'Golden-set evaluation with metrics' },
        { id: 'r3', text: 'Report accuracy, token cost, and latency' },
        { id: 'r4', text: 'Diff report and saved JSON results' },
        { id: 'r5', text: 'A regression gate you can run in CI' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'Winner is reproducible on held-out cases' },
        { id: 'a2', text: 'Results are saved as JSON' },
        { id: 'a3', text: 'Regressions are catchable by the gate' },
      ], skillsPracticed: ['Evaluation', 'Experimentation'], estimatedHours: 8 },
    repositories: [
      {
        id: 'repo-1', name: 'explodinggradients/ragas', url: 'https://github.com/explodinggradients/ragas', whyStudy: 'Off-the-shelf metrics like context precision and recall.', whatToLookFor: 'How metrics are computed and scored.', importantFiles: ['docs/'], concepts: ['Context precision', 'Context recall'], guidedSteps: [
          { id: 's1', text: 'Run the quickstart on a local dataset' },
          { id: 's2', text: 'Apply context precision and recall to your golden set' },
          { id: 's3', text: 'Wire the metrics into your harness' },
        ] },
    ],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'What does context precision measure?', options: ['How fast retrieval is', 'How much of the provided context is actually useful for the answer', 'Model size', 'Training quality'], correctOption: 1, idealAnswer: 'Precision measures signal-to-noise: the share of provided context that mattered' },
      { id: 'q2', type: 'mcq', question: 'Context rot means:', options: ['Files start to corrupt', 'Performance degrades as a session window fills with noise', 'Models forget training data', 'Cache eviction'], correctOption: 1, idealAnswer: 'Long, noisy sessions degrade reasoning even when token limits are not hit' },
      { id: 'q3', type: 'short_answer', question: 'How do you test whether compaction lost critical information?', idealAnswer: 'Needle-in-a-haystack: plant a key fact early, compact, and require the agent to recall it later' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'How do you know bad outcomes come from bad context, not the model?', idealAnswer: 'Log the full context for failures, score relevance, and compare success rates across context variants' },
      { id: 'iq-2', question: 'How do you measure context rot?', idealAnswer: 'Long-task runs with accuracy sampled by depth, plus needle tests and noise tracking' },
      { id: 'iq-3', question: 'What would you log to debug a failed agent answer?', idealAnswer: 'The exact context each turn saw, token counts per section, tool outputs, and the final reasoning steps' },
    ],
  },

  'cloud-cost-optimization': {
    topicId: 'rm-31',
    introduction: 'Understand cloud billing, allocate spend with tags and accounts, right-size resources, use commitments, and run FinOps inform-optimize-operate cycles.',
    estimatedHours: 20,
    difficulty: 'intermediate',
    objectives: [
      { id: 'obj-1', text: 'Read a cloud bill and explain its line items' },
      { id: 'obj-2', text: 'Allocate costs with tags and accounts' },
      { id: 'obj-3', text: 'Right-size compute and storage' },
      { id: 'obj-4', text: 'Use reserved instances and savings plans' },
      { id: 'obj-5', text: 'Automate alerting and anomaly detection' },
      { id: 'obj-6', text: 'Run a FinOps inform-optimize-operate loop' },
    ],
    resources: [
      { id: 'res-1', title: 'FinOps Foundation Framework', kind: 'documentation', source: 'finops.org', url: 'https://www.finops.org/framework/', description: 'The industry framework: principles, personas, and maturity model.', difficulty: 'beginner', estimatedMinutes: 90, priority: 'high' },
      { id: 'res-2', title: 'AWS Cost Management User Guide', kind: 'documentation', source: 'docs.aws.amazon.com', url: 'https://docs.aws.amazon.com/cost-management/latest/userguide/what-is-costmanagement.html', description: 'Cost Explorer, budgets, and anomaly detection documentation.', difficulty: 'intermediate', estimatedMinutes: 120, priority: 'high' },
      { id: 'res-3', title: 'FinOps Foundation FOCUS V1.4', kind: 'video', source: 'AWS Events', url: 'https://www.youtube.com/watch?v=noQ_wW-_ozk', description: 'Session on the FOCUS spec and AWS optimization keys.', difficulty: 'intermediate', estimatedMinutes: 60, priority: 'medium' },
      { id: 'res-4', title: 'OpenCost', kind: 'repository', source: 'opencost.io', url: 'https://www.opencost.io/', description: 'Open source Kubernetes cost monitoring and allocation.', difficulty: 'intermediate', estimatedMinutes: 60, priority: 'medium' },
      { id: 'res-5', title: 'Cloud Pricing Pages', kind: 'documentation', source: 'aws.amazon.com', url: 'https://aws.amazon.com/pricing/', description: 'On-demand and commitment pricing reference.', difficulty: 'beginner', estimatedMinutes: 45, priority: 'low' },
    ],
    labs: [
      {
        id: 'lab-1', title: 'Read Your Own Bill', problem: 'Break down a real or sample usage report into cost drivers and write a memo of actions.', whyItMatters: 'You cannot optimize what you cannot attribute.', prerequisites: ['Access to a cloud account or sample report'], requirements: [
          { id: 'r1', text: 'Export a usage and cost report' },
          { id: 'r2', text: 'Group spend by service and by tag' },
          { id: 'r3', text: 'Identify the top three cost drivers' },
          { id: 'r4', text: 'Separate idle versus useful spend' },
          { id: 'r5', text: 'Write a one-page memo with ranked actions' },
        ], hints: 'Start with the biggest three line items; small ones compound only after large ones.', expectedOutput: 'A cost memo ranking drivers and actions.', acceptanceCriteria: [
          { id: 'a1', text: 'Drivers are ranked by spend' },
          { id: 'a2', text: 'Actions are specific and numbered' },
        ], skillsPracticed: ['Cost analysis', 'Reporting'], estimatedMinutes: 120, difficulty: 'beginner' },
      {
        id: 'lab-2', title: 'Tagging and Allocation', problem: 'Enforce a tag taxonomy so every resource cost is allocated to a team or project.', whyItMatters: 'Allocation turns a shared bill into accountability.', prerequisites: ['Lab 1'], requirements: [
          { id: 'r1', text: 'Define a taxonomy (team, project, env, cost-center)' },
          { id: 'r2', text: 'Retro-tag existing resources' },
          { id: 'r3', text: 'Produce a per-project cost report' },
          { id: 'r4', text: 'Alert on untagged resources' },
          { id: 'r5', text: 'Document the tagging contract' },
        ], hints: 'Use a deny/alert guard so new resources cannot be created untagged.', expectedOutput: 'A per-project allocation report.', acceptanceCriteria: [
          { id: 'a1', text: 'Report shows per-project spend' },
          { id: 'a2', text: 'Untagged coverage is near zero' },
        ], skillsPracticed: ['Tagging', 'Allocation'], estimatedMinutes: 150, difficulty: 'intermediate' },
      {
        id: 'lab-3', title: 'Right-Sizing and Commitments', problem: 'Reduce compute spend with right-sizing and the right commitment mix.', whyItMatters: 'Most avoidable cloud waste is idle or oversized capacity.', prerequisites: ['Lab 2'], requirements: [
          { id: 'r1', text: 'Audit idle instances, volumes, and stale snapshots' },
          { id: 'r2', text: 'Right-size instances using utilization data' },
          { id: 'r3', text: 'Model savings-plan coverage vs on-demand' },
          { id: 'r4', text: 'Estimate savings with regression-risk noted' },
          { id: 'r5', text: 'Present the plan with before and after numbers' },
        ], hints: 'Commitments pay off only on stable, predictable load.', expectedOutput: 'A quantified savings plan.', acceptanceCriteria: [
          { id: 'a1', text: 'Estimate is backed by utilization data' },
          { id: 'a2', text: 'Risks of each change are listed' },
        ], skillsPracticed: ['Right-sizing', 'Commitments'], estimatedMinutes: 180, difficulty: 'intermediate' },
    ],
    miniProject: {
      id: 'mini-1', title: 'Cost Dashboard and 30-Day Plan', problem: 'Stand up a cloud cost dashboard plus a 30-day optimization plan on any cloud.', requirements: [
        { id: 'r1', text: 'Budgets with alerts at 50/80/100%' },
        { id: 'r2', text: 'Anomaly detection on spend' },
        { id: 'r3', text: 'A weekly cost report' },
        { id: 'r4', text: 'Execute right-sizing, commitments, or deletions' },
        { id: 'r5', text: 'Track savings over four weeks and write up lessons' },
      ], acceptanceCriteria: [
        { id: 'a1', text: 'Savings are measured against baseline' },
        { id: 'a2', text: 'Alerts fire on anomalies' },
        { id: 'a3', text: 'Plan and results are documented' },
      ], skillsPracticed: ['FinOps', 'Automation'], estimatedHours: 8 },
    repositories: [
      {
        id: 'repo-1', name: 'opencost/opencost', url: 'https://github.com/opencost/opencost', whyStudy: 'Open source cost allocation and monitoring for Kubernetes.', whatToLookFor: 'Allocation reports and cost overviews.', importantFiles: ['kubecost/'], concepts: ['Cost allocation', 'Anomalies'], guidedSteps: [
          { id: 's1', text: 'Deploy OpenCost in a test cluster' },
          { id: 's2', text: 'Read an allocation report' },
          { id: 's3', text: 'Wire cost data into a dashboard' },
        ] },
    ],
    assessment: [
      { id: 'q1', type: 'mcq', question: 'What are cloud tags mainly for?', options: ['Decorating resources', 'Cost allocation and ownership', 'Encryption', 'Backups'], correctOption: 1, idealAnswer: 'Tags attach spend to teams and projects so it can be allocated and reviewed' },
      { id: 'q2', type: 'mcq', question: 'Why buy reserved capacity or savings plans?', options: ['To make things slower', 'Discounts in exchange for committed, predictable usage', 'For more regions', 'To escape visibility'], correctOption: 1, idealAnswer: 'Committed usage gets lower prices; the risk is paying for capacity you do not use' },
      { id: 'q3', type: 'short_answer', question: 'How do you find waste fast?', idealAnswer: 'Anomaly detection on spend plus audits for idle, oversized, and snapshot resources' },
      { id: 'q4', type: 'architecture', question: 'Design a FinOps process for a multi-team cloud org.', idealAnswer: 'Tagged allocation, per-team budgets, anomaly alerts, weekly review cadence, and a veto process for expensive commitments' },
    ],
    interviewQuestions: [
      { id: 'iq-1', question: 'How do you cut cloud spend without hurting latency?', idealAnswer: 'Remove idle capacity and right-size first, add caching, then commitments on stable load; measure impact after each step' },
      { id: 'iq-2', question: 'How do you detect an unexpected cost spike?', idealAnswer: 'Anomaly detection on spend per service and tag, plus budget alerts that page the owner' },
      { id: 'iq-3', question: 'Shared bill: how do you decide who pays?', idealAnswer: 'Tag-based allocation to teams and projects, with chargeback reports and a cost-center per owner' },
    ],
  },
};

export function getCurriculum(topicId: string): TopicCurriculum | undefined {
  return Object.values(curriculum).find((c) => c.topicId === topicId);
}

export function getCurriculumBySlug(slug: string): TopicCurriculum | undefined {
  return curriculum[slug];
}