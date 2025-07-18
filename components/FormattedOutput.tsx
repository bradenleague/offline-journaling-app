import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Copy, Download, Edit3, Save, Eye, Code } from 'lucide-react';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ExpandableThoughts } from './ExpandableThoughts';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface FormattedOutputProps {
  content: string;
  onEdit: (content: string) => void;
}

// Helper to split content into markdown and <think> blocks
function parseContentWithThoughts(content: string) {
  const parts: Array<{ type: 'markdown' | 'think'; value: string }> = [];
  const regex = /<think>([\s\S]*?)<\/think>/gi;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'markdown', value: content.slice(lastIndex, match.index) });
    }
    parts.push({ type: 'think', value: match[1].trim() });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < content.length) {
    parts.push({ type: 'markdown', value: content.slice(lastIndex) });
  }
  return parts;
}

export function FormattedOutput({ content, onEdit }: FormattedOutputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [showRawMarkdown, setShowRawMarkdown] = useState(false);

  const handleEdit = () => {
    setEditContent(content);
    setIsEditing(true);
    setShowRawMarkdown(true); // Show raw markdown textarea by default when editing
  };

  const handleSave = () => {
    onEdit(editContent);
    setIsEditing(false);
    setShowRawMarkdown(false);
    toast.success('Changes saved');
  };

  const handleCancel = () => {
    setEditContent(content);
    setIsEditing(false);
    setShowRawMarkdown(false);
  };

  const handleCopy = async () => {
    try {
      // Only copy the markdown parts, not the <think> reasoning
      const markdownOnly = parseContentWithThoughts(content)
        .filter(part => part.type === 'markdown')
        .map(part => part.value)
        .join('').trim();
      await navigator.clipboard.writeText(markdownOnly);
      toast.success('Copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `journal-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Journal downloaded');
  };

  const toggleMarkdownView = () => {
    setShowRawMarkdown(!showRawMarkdown);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-2">Formatted Output</h2>
            <p className="text-muted-foreground">
              Structured field journal format
            </p>
          </div>
          
          {content && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
              >
                <Copy className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
              </Button>
              
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEdit}
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              ) : (
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleMarkdownView}
                  >
                    {showRawMarkdown ? <Eye className="h-4 w-4" /> : <Code className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        {!content ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p className="mb-2">No formatted content yet</p>
              <p>Write in the journal and click "Format with AI" to get started</p>
            </div>
          </div>
        ) : isEditing ? (
          showRawMarkdown ? (
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="h-full resize-none border-0 shadow-none focus-visible:ring-0 p-0 font-mono text-sm"
              style={{ minHeight: '400px' }}
            />
          ) : (
            <div className="h-full overflow-auto">
              <div className="prose prose-sm max-w-none dark:prose-invert markdown-content">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, inline, className, children, ...props }: { node?: any, inline?: boolean, className?: string, children?: React.ReactNode }) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }
                  }}
                >
                  {editContent}
                </ReactMarkdown>
              </div>
            </div>
          )
        ) : (
          <div className="h-full overflow-auto">
            <div className="prose prose-sm max-w-none dark:prose-invert markdown-content">
              {parseContentWithThoughts(content).map((part, idx) =>
                part.type === 'think' ? (
                  <ExpandableThoughts key={idx}>
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({ node, inline, className, children, ...props }: { node?: any, inline?: boolean, className?: string, children?: React.ReactNode }) {
                          const match = /language-(\w+)/.exec(className || '');
                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={oneDark}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        }
                      }}
                    >
                      {part.value}
                    </ReactMarkdown>
                  </ExpandableThoughts>
                ) : (
                  <ReactMarkdown 
                    key={idx}
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ node, inline, className, children, ...props }: { node?: any, inline?: boolean, className?: string, children?: React.ReactNode }) {
                        const match = /language-(\w+)/.exec(className || '');
                        if (!inline && match) {
                          return (
                            <SyntaxHighlighter
                              style={oneDark}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          );
                        } else if (!inline) {
                          // Code block without language
                          return (
                            <pre className={className} {...props}>
                              <code>{children}</code>
                            </pre>
                          );
                        } else {
                          // Inline code
                          return (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        }
                      }
                    }}
                  >
                    {part.value}
                  </ReactMarkdown>
                )
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      {content && (
        <div className="p-4 border-t border-border">
          <p className="text-muted-foreground">
            Formatted on {new Date().toLocaleDateString()} • {content.length} characters
            {isEditing && (
              <span className="ml-2">
                • {showRawMarkdown ? 'Raw Markdown' : 'Formatted View'}
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}