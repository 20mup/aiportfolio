'use client';

import { ChatBubble, ChatBubbleMessage } from '@/components/ui/chat/chat-bubble';
import { ChatRequestOptions } from 'ai';
import { Message } from 'ai/react';
import { motion } from 'framer-motion';
import ChatMessageContent from './chat-message-content';
import ToolRenderer from './tool-renderer';

interface SimplifiedChatViewProps {
  message: Message;
  isLoading: boolean;
  reload: (chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>;
  addToolResult?: (args: { toolCallId: string; result: string }) => void;
  onFollowUp?: (query: string) => void;
}

// IMPORTANT: keep motion config literals so Framer Motion types accept it
const MOTION_CONFIG = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: {
    duration: 0.3,
    ease: 'easeOut',
  },
} as const;

export function SimplifiedChatView({
  message,
  isLoading,
  reload,
  addToolResult,
  onFollowUp,
}: SimplifiedChatViewProps) {
  if (message.role !== 'assistant') return null;

  const toolInvocations =
    message.parts
      ?.filter(
        (part) =>
          part.type === 'tool-invocation' && part.toolInvocation?.state === 'result'
      )
      .map((part) => (part.type === 'tool-invocation' ? part.toolInvocation : null))
      .filter(Boolean) || [];

  const currentTool = toolInvocations.length > 0 ? [toolInvocations[0]] : [];

  const hasTextContent = message.content.trim().length > 0;
  const hasTools = currentTool.length > 0;

  const followUps = [
    'Give me the 30-second version',
    'Go deeper on the technical architecture',
    'What was the hardest part / what broke?',
    'What would you improve if you rebuilt it today?',
  ];

  return (
    <motion.div {...MOTION_CONFIG} className="flex h-full w-full flex-col px-4">
      <div className="custom-scrollbar flex h-full w-full flex-col overflow-y-auto">
        {hasTools && (
          <div className="mb-4 w-full">
            <ToolRenderer toolInvocations={currentTool} messageId={message.id || 'current-msg'} />
          </div>
        )}

        {hasTextContent && (
          <div className="w-full">
            <ChatBubble variant="received" className="w-full">
              <ChatBubbleMessage className="w-full">
                <ChatMessageContent
                  message={message}
                  isLast={true}
                  isLoading={isLoading}
                  reload={reload}
                  addToolResult={addToolResult}
                  skipToolRendering={true}
                />
              </ChatBubbleMessage>
            </ChatBubble>

            {/* Follow-up chips */}
            {!isLoading && onFollowUp && (
              <div className="mt-3 flex flex-wrap gap-2">
                {followUps.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => onFollowUp(q)}
                    className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-800 shadow-sm transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="pb-4" />
      </div>
    </motion.div>
  );
}