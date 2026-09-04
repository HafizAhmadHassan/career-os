export interface TopicVideo {
  title: string;
  channel: string;
  youtubeId: string;
}

export const topicVideos: Record<string, TopicVideo[]> = {
  'python-fundamentals': [
    { title: 'Learn Python - Full Course for Beginners', channel: 'freeCodeCamp.org', youtubeId: 'rfscVS0vtbw' },
  ],
  'typescript-modern-web': [
    { title: 'TypeScript Course for Beginners - Learn TypeScript from Scratch!', channel: 'Academind', youtubeId: 'BwuLxPH8IDs' },
  ],
  'git-github-mastery': [
    { title: 'Git and GitHub for Beginners - Crash Course', channel: 'freeCodeCamp.org', youtubeId: 'RGOj5yH7evk' },
  ],
  'rest-api-design': [
    { title: 'REST API concepts and examples', channel: 'WebConcepts', youtubeId: '7YcW25PHnAA' },
  ],
  'docker-containers': [
    { title: 'Docker Tutorial for Beginners - A Full DevOps Course', channel: 'freeCodeCamp.org', youtubeId: 'fqMOX6JJhGo' },
  ],
  'llm-api-integration': [
    { title: '[1hr Talk] Intro to Large Language Models', channel: 'Andrej Karpathy', youtubeId: 'zjkBMFhNj_g' },
    { title: 'ChatGPT Course - Use The OpenAI API to Code 5 Projects', channel: 'freeCodeCamp.org', youtubeId: 'uRQH2CFvedY' },
    { title: 'Build DeepSeek from Scratch: Series Introduction', channel: 'YouTube Playlist', youtubeId: 'QWNxQIq0hMo' },
    { title: 'DeepSeek Basics', channel: 'YouTube Playlist', youtubeId: 'WjhDDeZ7DvM' },
  ],
  'structured-outputs-function-calling': [
    { title: 'OpenAI Function Calling - Full Beginner Tutorial', channel: 'Dave Ebbelaar', youtubeId: 'aqdWSYWC_LI' },
    { title: 'Mixture of Experts (MoE) Introduction', channel: 'YouTube Playlist', youtubeId: 'v7U21meXd6Y' },
    { title: 'Code Mixture of Experts (MoE) from Scratch in Python', channel: 'YouTube Playlist', youtubeId: 'W7ktPe1HfZs' },
    { title: 'How DeepSeek rewrote Mixture of Experts (MoE)?', channel: 'YouTube Playlist', youtubeId: 'KnSIZ83iPKs' },
    { title: 'Mixture of Experts Balancing Techniques | Auxiliary Loss | Load Balancing | Capacity Factor', channel: 'YouTube Playlist', youtubeId: 'nRadcspta_8' },
    { title: 'Mixture of Experts Hands on Demonstration | Visual Explanation', channel: 'YouTube Playlist', youtubeId: 'yw6fpYPJ7PI' },
    { title: 'Multi-Token Prediction Introduction', channel: 'YouTube Playlist', youtubeId: 'tMtHAAg0UT4' },
    { title: 'Multi Token Prediction (MTP) Coded from Scratch', channel: 'YouTube Playlist', youtubeId: 'lyHe8_JHoVI' },
    { title: 'How DeepSeek rewrote Multi-Token Prediction (MTP)?', channel: 'YouTube Playlist', youtubeId: '4GmwJLvwaXE' },
  ],
  'embeddings-token-management': [
    { title: 'Vector databases are so hot right now. WTF are they?', channel: 'Fireship', youtubeId: 'klTvEwg3oJ4' },
    { title: 'LLM Embeddings for RAG, Search & AI Agents (Complete Guide)', channel: 'Byte-Size AI Learning Hub', youtubeId: '9gTAJl8kkCY' },
    { title: 'LLM Architecture in 1 hour | Journey of token through the LLM Architecture', channel: 'YouTube Playlist', youtubeId: 'rkEYwH4UGa4' },
    { title: 'The Attention Mechanism 1 hour explanation', channel: 'YouTube Playlist', youtubeId: 'K45ze9Yd5UE' },
    { title: 'Multi-Head Attention Visually Explained', channel: 'YouTube Playlist', youtubeId: 'qbN4ulK-bZA' },
    { title: 'Multi-Head Attention Handwritten from Scratch', channel: 'YouTube Playlist', youtubeId: 'rvsEW-EsD-Y' },
    { title: 'Self Attention Mechanism - Handwritten from scratch', channel: 'YouTube Playlist', youtubeId: 's8mskq-nzec' },
    { title: 'Causal Attention Explained: Don\'t Peek into the Future!', channel: 'YouTube Playlist', youtubeId: 'c6Kkj6iLeBg' },
    { title: 'Multi-Query Attention Explained | Dealing with KV Cache Memory Issues Part 1', channel: 'YouTube Playlist', youtubeId: 'Z6B51Odtn-Y' },
    { title: 'Understand Grouped Query Attention (GQA) | The final frontier before latent attention', channel: 'YouTube Playlist', youtubeId: 'kx3rETIxo4Q' },
    { title: 'Key Value Cache from Scratch: The good side and the bad side', channel: 'YouTube Playlist', youtubeId: 'IDwTiS4_bKo' },
    { title: 'Multi-Head Latent Attention From Scratch | One of the major DeepSeek innovation', channel: 'YouTube Playlist', youtubeId: 'NlDQUj1olXM' },
    { title: 'Multi-Head Latent Attention Coded from Scratch in Python', channel: 'YouTube Playlist', youtubeId: 'mIaWmJVrMpc' },
    { title: 'How DeepSeek exactly implemented Latent Attention | MLA + RoPE', channel: 'YouTube Playlist', youtubeId: 'm1x8vA_Tscc' },
    { title: 'All about Sinusoidal Positional Encodings | What\'s with the weird sin-cos formula?', channel: 'YouTube Playlist', youtubeId: 'bQCQ7VO-TWU' },
    { title: 'Integer and Binary Positional Encodings | Journey towards Rotary Positional Encodings (RoPE)', channel: 'YouTube Playlist', youtubeId: 'rP0CoTxe5gU' },
    { title: 'Rotary Positional Encodings | Explained Visually', channel: 'YouTube Playlist', youtubeId: 'a17DlNxkv2k' },
  ],
  'agent-loops-state-management': [
    { title: 'Agentic AI Tutorial for Beginners | Langgraph Tutorial', channel: 'codebasics', youtubeId: 'CnXdddeZ4tQ' },
    { title: 'LangGraph: Intro', channel: 'LangChain', youtubeId: '5h-JBkySK34' },
  ],
  'tool-integration': [
    { title: 'Creating an AI Agent with LangGraph Llama 3 & Groq', channel: 'Sam Witteveen', youtubeId: 'lvQ96Ssesfk' },
    { title: 'Build an AI Agent From Scratch in Python - Tutorial for Beginners', channel: 'Tech With Tim', youtubeId: 'bTMPwUgLZf0' },
  ],
  'multi-agent-systems': [
    { title: 'LangGraph: Multi-Agent Workflows', channel: 'LangChain', youtubeId: 'hvAPnpSfSGo' },
    { title: 'CrewAI Tutorial: Multiple Agents Working Together in Python', channel: 'NeuralNine', youtubeId: 'I90xJlzAUW0' },
  ],
  'context-selection-construction': [
    { title: 'Context Engineering for Agents', channel: 'LangChain', youtubeId: '4GiqzUHD5AA' },
    { title: 'Context Engineering for AI Agents: Complete Course', channel: 'Marina Wyss - AI & Machine Learning', youtubeId: '-h9VVJIqtvA' },
  ],
  'context-compression-pruning': [
    { title: 'Context engineering explained: What every AI developer should know', channel: 'Google Cloud Tech', youtubeId: 'BBPQYtR7oUk' },
    { title: 'What Is Context Engineering? Why It Matters for AI Agents', channel: 'IBM Technology', youtubeId: 'Qx0fCqpkBus' },
  ],
  'memory-systems': [
    { title: 'Build Agents that Never Forget: LangMem Semantic Memory Tutorial', channel: 'LangChain', youtubeId: '3Yp-hIEcWXk' },
    { title: 'AutoGen Agents with Unlimited Memory Using MemGPT (Tutorial)', channel: 'Matthew Berman', youtubeId: 'VJ6bK81meu8' },
  ],
  'evaluation-observability': [
    { title: 'How to Debug, Evaluate, and Ship Reliable AI Agents with LangSmith', channel: 'LangChain', youtubeId: 'oSjAbx67f0k' },
    { title: 'LangSmith Explained: LLM Tracing, Evaluation & Debugging Tutorial', channel: 'Simplified AI Course', youtubeId: 'VBWVAJpkGHc' },
  ],
  'security-guardrails': [
    { title: 'Prompt Injection, explained', channel: 'Simon Willison', youtubeId: 'FgxwCaL6UTA' },
    { title: 'Defending LLM - Prompt Injection', channel: 'LiveOverflow', youtubeId: 'VbNPZ1n6_vY' },
  ],
  'mcp-advanced-integrations': [
    { title: 'Model Context Protocol Clearly Explained | MCP Beyond the Hype', channel: 'codebasics', youtubeId: 'tzrwxLNHtRY' },
    { title: 'Model Context Protocol (MCP) - Explained', channel: 'Marco Codes', youtubeId: 'sahuZMMXNpI' },
  ],
  'browser-computer-use-agents': [
    { title: 'OpenAI Computer Use Tutorial: Build a Browser Agent in Python (Playwright)', channel: 'Leon van Zyl', youtubeId: 'Tm1_KHdh_kA' },
    { title: 'Demonstrating Operator', channel: 'OpenAI', youtubeId: 'gYqs-wUKZsM' },
    { title: 'How I Automated My LinkedIn Job Hunt with BrowserUse + AI', channel: 'Eric Tech', youtubeId: 'dmMMsq8Sp8s' },
    { title: 'Computer use in Codex', channel: 'OpenAI', youtubeId: 'D_FCYsshMI4' },
  ],
  'relational-databases': [
    { title: 'SQL Tutorial - Full Database Course for Beginners', channel: 'freeCodeCamp.org', youtubeId: 'HXV3zeQKqGY' },
    { title: 'Learn PostgreSQL Tutorial - Full Course for Beginners', channel: 'freeCodeCamp.org', youtubeId: 'qw--VYLpxG4' },
  ],
  'streaming-real-time-responses': [
    { title: 'Streaming OpenAI Responses | ReactJS + FastAPI', channel: 'Irtiza Hafiz', youtubeId: 'i7GlWbAFDtY' },
    { title: 'Stream Responses from an LLM | Ollama, React, Astro on Fly.io', channel: 'Fly.io', youtubeId: 'PLRs4kwsDXA' },
  ],
  'model-selection-cost-optimization': [
    { title: 'Every LLM in 2026: Which To Use — and Why They Cost So Much', channel: 'Tim TEN', youtubeId: 'QSUSCN6V4m4' },
    { title: 'Understanding LLM API Pricing: A Visual Guide to Costs, Token Rates & Model Selection', channel: 'Mobisoft Infotech', youtubeId: '487-Oy5by5Y' },
    { title: 'Build Deep Seek from Scratch 20 minute summary', channel: 'YouTube Playlist', youtubeId: '78zic2E8DRU' },
    { title: 'Introduction to LLM Quantization', channel: 'YouTube Playlist', youtubeId: '0U9l3-r6jVE' },
    { title: 'How DeepSeek Rewrote Quantization Part 1 | Mixed Precision | Fine-grained quantization', channel: 'YouTube Playlist', youtubeId: 'xftka2aXnm4' },
    { title: 'How DeepSeek Rewrote Quantization Part 2 | Accumulation Precision | Online Quantization', channel: 'YouTube Playlist', youtubeId: 'FxDbrWBENy8' },
    { title: 'Book Launch with Manning: Build DeepSeek from Scratch', channel: 'YouTube Playlist', youtubeId: 'mjMmedGfUsQ' },
  ],
  'planning-reasoning': [
    { title: 'LangGraph: Planning Agents', channel: 'LangChain', youtubeId: 'uRya4zRrRx4' },
  ],
  'human-in-the-loop': [
    { title: 'LangGraph interrupt: Making it easier to build human-in-the-loop agents', channel: 'LangChain', youtubeId: '6t7YJcEFUIY' },
  ],
  'rag-systems-retrieval': [
    { title: 'Python RAG Tutorial (with Local LLMs): AI For Your PDFs', channel: 'pixegami', youtubeId: '2TJxpyO3ei4' },
    { title: 'RAG Explained For Beginners', channel: 'KodeKloud', youtubeId: '_HQ2H_0Ayy0' },
    { title: 'Learn RAG From Scratch - Python AI Tutorial from a LangChain Engineer', channel: 'freeCodeCamp.org', youtubeId: 'sVcwVQRHIc8' },
  ],
  'llm-serving-caching-deployment': [
    { title: 'Optimize, deploy, and benchmark an open-source LLM with vLLM', channel: 'DeepLearningAI', youtubeId: 'a9T9kWwpaNg' },
  ],
  'linux-systems': [
    { title: 'Introduction to Linux - Full Course for Beginners', channel: 'freeCodeCamp.org', youtubeId: 'sWbUDq4S6Y8' },
    { title: 'Linux Operating System - Crash Course for Beginners', channel: 'freeCodeCamp.org', youtubeId: 'ROjZy1WbCIA' },
  ],
  'system-design': [
    { title: 'System Design Concepts Course and Interview Prep', channel: 'freeCodeCamp.org', youtubeId: 'F2FmTdLtb_4' },
    { title: 'System Design for Beginners', channel: 'KodeKloud', youtubeId: 'SE2KF-vxvS0' },
  ],
  'open-source-contribution': [
    { title: 'Complete Guide to Open Source - How to Contribute', channel: 'freeCodeCamp.org', youtubeId: 'yzeVMecydCE' },
  ],
  'context-isolation': [
    { title: 'Context Engineering Explained', channel: 'Google Cloud Tech', youtubeId: 'BBPQYtR7oUk' },
    { title: 'Context Engineering for AI Agents: Complete Course', channel: 'Marina Wyss', youtubeId: '-h9VVJIqtvA' },
  ],
  'context-evaluation': [
    { title: 'What Is Context Engineering? Why It Matters for AI Agents', channel: 'IBM Technology', youtubeId: 'Qx0fCqpkBus' },
  ],
  'cloud-cost-optimization': [
    { title: 'FinOps Foundation FOCUS V1.4 | The Keys to AWS Optimization', channel: 'AWS Events', youtubeId: 'noQ_wW-_ozk' },
  ],
};

export function getVideosForSlug(slug: string): TopicVideo[] {
  return topicVideos[slug] ?? [];
}