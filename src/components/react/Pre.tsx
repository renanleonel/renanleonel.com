import { Check, Copy } from "lucide-react";
import { createRef, useState } from "react";

const CodeBlock = ({ children, ...props }: { children: any }) => {
  const ref = createRef<HTMLPreElement>();
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    let snippet = ref.current;
    let snippetText = snippet?.innerText ?? "";
    await navigator.clipboard.writeText(snippetText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative">
      <pre {...props} ref={ref}>
        {children}
      </pre>
      <button
        aria-label="Copy to clipboard"
        className="hidden md:flex absolute top-2 right-2 items-center gap-2 p-1"
        onClick={copyToClipboard}
      >
        {isCopied ? (
          <Check width={16} height={16} />
        ) : (
          <Copy width={16} height={16} />
        )}
      </button>
    </div>
  );
};

export default CodeBlock;
