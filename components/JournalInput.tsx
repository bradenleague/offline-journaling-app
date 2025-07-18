import { useEffect } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Loader2, Sparkles } from 'lucide-react';

interface JournalInputProps {
  value: string;
  onChange: (value: string) => void;
  onFormat: () => void;
  isFormatting: boolean;
}

export function JournalInput({ value, onChange, onFormat, isFormatting }: JournalInputProps) {
  // Auto-save to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (value) {
        localStorage.setItem('journal-draft', value);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [value]);

  // Load draft on mount
  useEffect(() => {
    const saved = localStorage.getItem('journal-draft');
    if (saved && !value) {
      onChange(saved);
    }
  }, []);

  const handleClear = () => {
    onChange('');
    localStorage.removeItem('journal-draft');
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h2 className="mb-2">Raw Journal</h2>
        <p className="text-muted-foreground">
          Write freely. Your thoughts will be auto-saved and can be formatted with AI.
        </p>
      </div>

      {/* Main Input Area */}
      <div className="flex-1 p-6 flex flex-col gap-4">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Start writing your journal entry here...

You can use markdown formatting:
- **bold text**
- *italic text*
- # headings
- [links](url)

Write about what you saw, felt, or experienced today..."
          className="flex-1 resize-none border-0 shadow-none focus-visible:ring-0 p-0 placeholder:text-gray-400 placeholder:focus:text-gray-300"
          style={{ minHeight: '400px' }}
        />

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={onFormat}
            disabled={!value.trim() || isFormatting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
            size="lg"
          >
            {isFormatting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Formatting...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Format with AI
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleClear}
            disabled={!value.trim()}
            className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-all duration-200"
            size="lg"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <p className="text-muted-foreground">
          Auto-saved to local storage • {value.length} characters
        </p>
      </div>
    </div>
  );
}