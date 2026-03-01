'use client';

import { Message } from 'ai/react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export type ChatMessageContentProps = {
  message: Message;
  isLast?: boolean;
  isLoading?: boolean;
  reload?: () => Promise<string | null | undefined>;
  addToolResult?: (args: { toolCallId: string; result: string }) => void;
  skipToolRendering?: boolean;
};

const CodeBlock = ({ content }: { content: string }) => {
  const [isOpen, setIsOpen] = useState(true);

  // Extract language if present in the first line
  const firstLineBreak = content.indexOf('\n');
  const firstLine = content.substring(0, firstLineBreak).trim();
  const language = firstLine || 'text';
  const code = firstLine ? content.substring(firstLineBreak + 1) : content;

  // Get first few lines for preview
  const previewLines = code.split('\n').slice(0, 1).join('\n');
  const hasMoreLines = code.split('\n').length > 1;

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="my-4 w-full overflow-hidden rounded-md"
    >
      <div className="bg-secondary text-secondary-foreground flex items-center justify-between rounded-t-md border-b px-4 py-1">
        <span className="text-xs">{language !== 'text' ? language : 'Code'}</span>
        <CollapsibleTrigger className="hover:bg-secondary/80 rounded p-1">
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
      </div>

      <div className="bg-accent/80 text-accent-foreground rounded-b-md">
        {!isOpen && hasMoreLines ? (
          <pre className="px-4 py-3">
            <code className="text-sm">{previewLines + '\n...'}</code>
          </pre>
        ) : (
          <CollapsibleContent>
            <div className="custom-scrollbar" style={{ overflowX: 'auto' }}>
              <pre className="min-w-max px-4 py-3">
                <code className="text-sm whitespace-pre">{code}</code>
              </pre>
            </div>
          </CollapsibleContent>
        )}
      </div>
    </Collapsible>
  );
};

export default function ChatMessageContent({ message }: ChatMessageContentProps) {
  const renderContent = () => {
    return message.parts?.map((part, partIndex) => {
      if (part.type !== 'text' || !part.text) return null;

      // Split content by code block markers
      const contentParts = part.text.split('```');

      return (
        <div key={partIndex} className="w-full space-y-4">
          {contentParts.map((content, i) =>
            i % 2 === 0 ? (
              <div
                key={`text-${i}`}
                className="
                  prose prose-neutral dark:prose-invert w-full max-w-none
                  prose-p:my-2
                  prose-ol:my-2 prose-ul:my-2
                  prose-li:my-1
                  prose-li:leading-relaxed
                  prose-li:p:my-0
                "
              >
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // IMPORTANT: do NOT use whitespace-pre-wrap on <p>
                    p: ({ children }) => <p className="break-words">{children}</p>,

                    ul: ({ children }) => (
                      <ul className="my-2 list-disc pl-6">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="my-2 list-decimal pl-6">{children}</ol>
                    ),

                    // Ensure list items don’t introduce extra spacing
                    li: ({ children }) => <li className="my-1">{children}</li>,

                    // If markdown renders paragraphs inside li, keep them tight
                    // (react-markdown sometimes nests p inside li)
                    // This catches that case explicitly.
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {content}
                </Markdown>
              </div>
            ) : (
              <CodeBlock key={`code-${i}`} content={content} />
            )
          )}
        </div>
      );
    });
  };

  return <div className="w-full">{renderContent()}</div>;
}