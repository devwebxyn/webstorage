// src/components/docs/CodeBlock.tsx
import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { Clipboard, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      <Highlight
        theme={themes.vsDark} // Tema sudah built-in, tidak perlu impor path!
        code={code.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...style, padding: '1rem', borderRadius: '0.5rem', margin: 0 }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-1.5 bg-gray-700/50 rounded-md text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {isCopied ? <Check size={16} className="text-green-400" /> : <Clipboard size={16} />}
      </button>
    </div>
  );
};