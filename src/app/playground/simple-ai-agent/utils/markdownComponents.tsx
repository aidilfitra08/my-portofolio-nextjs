export const markdownComponents = {
  code: ({ className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "");
    const isInline = !match;

    if (isInline) {
      return (
        <code
          className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded-sm text-sm font-mono text-[#ff6b6b] dark:text-[#ff6b6b]"
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }: any) => (
    <pre
      className="bg-neutral-900 dark:bg-neutral-800 rounded-lg p-4 overflow-x-auto my-3 border-2 border-neutral-700 dark:border-accent-green"
      {...props}
    >
      {children}
    </pre>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote
      className="border-l-4 border-accent-green pl-4 py-2 my-3 bg-neutral-50 dark:bg-accent-green/10 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),
  h1: ({ children, ...props }: any) => (
    <h1
      className="text-xl font-bold mb-3 mt-4 text-neutral-900 dark:text-[#e0e0e0]"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2
      className="text-lg font-bold mb-2 mt-3 text-neutral-900 dark:text-[#e0e0e0]"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3
      className="text-base font-bold mb-2 mt-3 text-neutral-900 dark:text-[#e0e0e0]"
      {...props}
    >
      {children}
    </h3>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc pl-6 my-2 space-y-1" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal pl-6 my-2 space-y-1" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="mb-1" {...props}>
      {children}
    </li>
  ),
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto my-3">
      <table
        className="min-w-full border-2 border-neutral-300 dark:border-neutral-700"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: any) => (
    <th
      className="border border-neutral-300 dark:border-neutral-700 px-3 py-2 bg-neutral-100 dark:bg-neutral-800 font-semibold text-left"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td
      className="border border-neutral-300 dark:border-neutral-700 px-3 py-2"
      {...props}
    >
      {children}
    </td>
  ),
  a: ({ children, href, ...props }: any) => (
    <a
      href={href}
      className="text-accent-green dark:text-accent-green hover:text-[#00ff41] dark:hover:text-[#00ff41] underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ),
  p: ({ children, ...props }: any) => (
    <p className="mb-2 leading-relaxed" {...props}>
      {children}
    </p>
  ),
};
