import { PROMPT } from "@/config/prompt";

export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface LLMRequestBody {
    model: string;
    messages: ChatMessage[];
    temperature?: number;
}

interface formQueryProps {
    subject: string;
    from: string;
    content: string;
    recieved_at: Date;
}

export function formQuery({subject, from, content, recieved_at}: formQueryProps): LLMRequestBody {
    const formattedContent = `${PROMPT}

--- Email Metadata ---
Subject: ${subject}
From: ${from}
Received At: ${recieved_at.toString()}

--- Email Body ---
${content}`;

    return {
        model: 'mistralai/mathstral-7b-v0.1',
        messages: [
            {
                role: 'user',
                content: formattedContent,
            },
        ],
        temperature: 0.7,
    };
}
