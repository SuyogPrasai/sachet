export interface ChatCompletionResponse {
  id: string;
  object: 'chat.completion';
  created: number;          // epoch‑seconds
  model: string;
  choices: Choice[];
  usage: TokenUsage;
  stats: Record<string, unknown>;       // no details provided—treat as open shape
  system_fingerprint: string;
}

export interface Choice {
  index: number;
  logprobs: unknown | null;
  finish_reason: 'stop' | 'length' | 'content_filter' | string;
  message: AssistantMessage;
}

export interface AssistantMessage {
  role: 'assistant';
  content: string;
}

export interface TokenUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}
