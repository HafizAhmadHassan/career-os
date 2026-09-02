import type { CodingChallenge } from '@/types';

export const codingChallenges: CodingChallenge[] = [
  {
    id: 'cc-1',
    title: 'Retry with Exponential Backoff',
    category: 'Reliability',
    difficulty: 'beginner',
    prompt: 'Write a function that calls an async task and retries it with exponential backoff and full jitter when it fails, up to a max attempts.',

    examples: [
      { input: 'retry(failTwiceTask, { maxAttempts: 3, baseDelayMs: 100 })', output: 'resolves the value of the 3rd attempt' },
      { input: 'retry(alwaysFailTask, { maxAttempts: 2 })', output: 'rejects with the last error' },
    ],
    testHints: [
      'Assert attempt count equals maxAttempts after final failure',
      'Assert delay grows exponentially (use fake timers or record timestamps)',
      'Assert a successful attempt stops retrying',
    ],
    solutionNotes: 'Retry with exponential backoff doubles the wait between attempts; full jitter randomizes within [0, delay] to avoid thundering herd. Distinguish retryable errors (429, 5xx, timeout) from permanent ones (400) and do NOT retry the latter.',
  },
  {
    id: 'cc-2',
    title: 'Async Task Queue with Concurrency Limit',
    category: 'Concurrency',
    difficulty: 'intermediate',
    prompt: 'Implement a queue that runs async tasks with a max concurrency, preserving completion order of results.',
    examples: [
      { input: 'queue([t1, t2, t3], { concurrency: 2 })', output: 'results in input order, at most 2 running at once' },
    ],
    testHints: [
      'Track concurrent count to assert it never exceeds the limit',
      'Assert results are returned in submission order, not completion order',
      'Assert rejection of one task does not stop the others',
    ],
    solutionNotes: 'Use a worker pattern: maintain an index pointer and spawn up to `concurrency` workers; each worker pulls the next task until the queue empties. Store results by index so ordering is preserved.',
  },
  {
    id: 'cc-3',
    title: 'Token Counter',
    category: 'LLM',
    difficulty: 'beginner',
    prompt: 'Implement a token counter that estimates token usage for a string, using a simple heuristic (e.g. ~4 chars per token) and respecting code blocks written in a pseudo-tokenizer style.',
    examples: [
      { input: 'countTokens("hello world")', output: '>= 1' },
      { input: 'countTokens("a b c d")', output: '>= 4 (4 tokens, one per word)' },
    ],
    testHints: [
      'Empty string returns 0',
      'Long repeated text scales linearly',
      'Whitespace is mostly stripped',
    ],
    solutionNotes: 'Heuristic tokenizers split roughly on whitespace/character ratio. Real tokenizers (tiktoken, BPE) are much better; note the estimate is a lower bound and validate against the actual model tokenizer before committing to cost math.',
  },
  {
    id: 'cc-4',
    title: 'Text Chunker',
    category: 'RAG',
    difficulty: 'beginner',
    prompt: 'Implement a function that chunks a document into overlapping pieces by character count, never splitting mid-paragraph when possible, with optional overlap.',
    examples: [
      { input: 'chunk(text, { size: 500, overlap: 50 })', output: 'array of chunks each <= 500 chars' },
    ],
    testHints: [
      'No chunk exceeds the size budget',
      'Overlap region is duplicated at boundaries when size allows',
      'A paragraph longer than size is split hard rather than dropped',
    ],
    solutionNotes: 'Chunking trade-offs: fixed-size is simple but splits sentences; paragraph-aware preserves semantics but yields variable sizes. Real systems often overlap to avoid cutting an answer across a boundary.',
  },
  {
    id: 'cc-5',
    title: 'Cosine Similarity / Vector Search',
    category: 'RAG',
    difficulty: 'intermediate',
    prompt: 'Implement cosine similarity and a top-k retrieval over a list of embedding vectors.',
    examples: [
      { input: 'topK(queryVec, vectors, 3)', output: 'the 3 most similar vectors and their indices' },
    ],
    testHints: [
      'cosine similarity of a vector with itself is ~1',
      'Orthogonal vectors score ~0',
      'Determine behavior on zero vectors (return 0 or throw)',
    ],
    solutionNotes: 'cosine = dot / (||a|| * ||b||). Normalize embeddings at index time to make dot product equal cosine. Naive top-k is O(n); production systems use ANN indexes (HNSW, IVF) trading recall for speed.',
  },
  {
    id: 'cc-6',
    title: 'Top-k via Max-Heap',
    category: 'Data Structures',
    difficulty: 'intermediate',
    prompt: 'Given a stream of scores, maintain the top-k items with a heap instead of full sorting.',
    examples: [
      { input: 'Heap([3, 1, 4, 1, 5, 9, 2, 6], 3)', output: 'top 3: [4, 5, 9] (order-independent ok)' },
    ],
    testHints: [
      'Results contain exactly the k largest',
      'Works when stream is larger than k',
      'Duplicates handled',
    ],
    solutionNotes: 'A min-heap of size k keeps the smallest of the current top set at the root; for each new item, if larger than root, replace and sift down. O(n log k) vs O(n log n) sort.',
  },
  {
    id: 'cc-7',
    title: 'Simple Reranker',
    category: 'RAG',
    difficulty: 'intermediate',
    prompt: 'Implement a reranker that takes an initial ranked list and a score function, and returns a reordered list. Handle ties deterministically by original rank.',
    examples: [
      { input: 'rerank([a, b, c], scoreFn)', output: 'items sorted by scoreFn descending, ties by original order' },
    ],
    testHints: [
      'Items with higher scores come first',
      'Equal scores preserve original relative order (stable sort)',
      'The input list is not mutated',
    ],
    solutionNotes: 'Reranking applies a more expensive, higher-quality model (e.g. cross-encoder) to a shortlist from a cheap retriever. Stable ordering matters so identical scores do not flip citations.',
  },
  {
    id: 'cc-8',
    title: 'LRU Cache',
    category: 'Systems',
    difficulty: 'intermediate',
    prompt: 'Implement an LRU cache with get and put in O(1) using a hash map plus a doubly linked list.',
    examples: [
      { input: 'lru(2); put(1, "a"); put(2, "b"); get(1); put(3, "c")', output: 'key 2 is evicted' },
    ],
    testHints: [
      'get refreshes recency',
      'put beyond capacity evicts least-recently-used',
      'updating an existing key refreshes it and does not change size',
    ],
    solutionNotes: 'HashMap gives O(1) lookup; a doubly linked list tracks recency. On access, move node to front (most recent); on eviction, drop the tail. Guard against re-adding an existing key.',
  },
  {
    id: 'cc-9',
    title: 'Agent Loop State Machine',
    category: 'Agents',
    difficulty: 'advanced',
    prompt: 'Write a minimal agent loop: take a task, plan, act on tools, observe, and stop when the task is done or the step budget is exhausted.',
    examples: [
      { input: 'runAgent("add 2 and 3", { maxSteps: 5 })', output: 'produces "5" via a calculator tool' },
      { input: 'runAgent("loop forever", { maxSteps: 3 })', output: 'stops after 3 steps with an incomplete signal' },
    ],
    testHints: [
      'Loop terminates within maxSteps in all inputs',
      'Tool results are observed and fed back',
      'A terminal answer stops the loop',
    ],
    solutionNotes: 'The loop is observe-think-act until done. Real agents add: validation that actions are allowed, structured tool schemas, context budget checks, retry with backoff, and explicit state transitions rather than ad-hoc recursion.',
  },
  {
    id: 'cc-10',
    title: 'Rate Limiter (Token Bucket)',
    category: 'Systems',
    difficulty: 'intermediate',
    prompt: 'Implement a token-bucket rate limiter: capacity refills at a fixed rate; allow() is true only if tokens remain.',
    examples: [
      { input: 'limiter(10 tokens, refill 1/s); allow() x10', output: 'true x10, then false until refill' },
    ],
    testHints: [
      'Bursts up to capacity are allowed',
      'Refill is based on elapsed time, not wall-clock ticks',
      'allow() does not leak time when untested',
    ],
    solutionNotes: 'Token bucket allows bursts up to capacity while sustaining a steady rate - good for LLM APIs that burst on a per-second limit. Compute tokens = min(capacity, tokens + elapsed * rate) lazily on each call.',
  },
  {
    id: 'cc-11',
    title: 'Streaming JSON Parser In Progress',
    category: 'LLM',
    difficulty: 'advanced',
    prompt: 'Implement a parser that consumes JSON arriving in chunks (like streamed LLM output) and reports whether the accumulated pieces form valid JSON, tracking the current parse state.',
    examples: [
      { input: 'feed(`{"a":`); valid()', output: 'false (incomplete)' },
      { input: 'feed(`1}`); valid()', output: 'true' },
    ],
    testHints: [
      'Partial JSON is not yet valid but must not crash',
      'Nested arrays/objects and escaped strings handled',
      'Returns true only on complete valid JSON',
    ],
    solutionNotes: 'Streaming LLM output can produce partial JSON. Production approach: build partial from fragments; use a tolerant parse that returns a "prefix valid + complete" pair, then optionally ask the model to fix incomplete output.',
  },
  {
    id: 'cc-12',
    title: 'Tool Call Batch + Retry in Async',
    category: 'Agents',
    difficulty: 'advanced',
    prompt: 'Implement a helper that executes many tool calls in parallel with a per-call timeout, returning per-call outcomes without failing the whole batch.',
    examples: [
      { input: 'callAll([toolA, toolB, toolC], { timeoutMs: 500 })', output: 'per-call {ok, value|error} results' },
    ],
    testHints: [
      'A hanging tool does not block others beyond its timeout',
      'One failure does not reject the batch promise',
      'Result order matches input order',
    ],
    solutionNotes: 'Use Promise.allSettled-like semantics with a timeout wrapper (Promise.race). Per-call timeout prevents a single misbehaving tool from blocking an agent step; result ordering by index keeps logging coherent.',
  },
];

export function getCodingChallenge(id: string): CodingChallenge | undefined {
  return codingChallenges.find((c) => c.id === id);
}