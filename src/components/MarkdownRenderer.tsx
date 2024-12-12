import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  // console.log(content);
  return (
    <ReactMarkdown
      className={`w-full prose max-w-none dark:prose-invert ${className}`}
      remarkPlugins={[remarkGfm]}
      components={{
        // Override default header styles
        h1: ({ node, ...props }) => (
          <h1 className="text-2xl font-bold" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-xl font-bold" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-lg font-bold" {...props} />
        ),

        // Override default link styles
        a: ({ node, ...props }) => (
          <a
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
            {...props}
          />
        ),

        // Override default paragraph styles
        p: ({ node, ...props }) => <p className="text-justify" {...props} />,

        // Override default code block styles
        pre: ({ node, ...props }) => (
          <pre
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"
            {...props}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
