import { useState } from 'react';
import { JournalInput } from './components/JournalInput';
import { FormattedOutput } from './components/FormattedOutput';
import { ConnectionStatus } from './components/ConnectionStatus';
import { Toaster } from './components/ui/sonner';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from './components/ui/resizable';
import { LMStudioService } from './services/lmStudio';
import { toast } from 'sonner';

export default function App() {
  const [rawJournal, setRawJournal] = useState('');
  const [formattedOutput, setFormattedOutput] = useState('');
  const [isFormatting, setIsFormatting] = useState(false);

  const handleFormat = async () => {
    if (!rawJournal.trim()) return;
    
    setIsFormatting(true);
    
    try {
      const formatted = await LMStudioService.formatJournalEntry(rawJournal);
      setFormattedOutput(formatted);
      toast.success('Journal entry formatted successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Failed to format journal entry: ${errorMessage}`);
      console.error('Format error:', error);
    } finally {
      setIsFormatting(false);
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b px-4 py-2 flex justify-between items-center">
        <h1 className="text-lg font-semibold">Offline Journal</h1>
        <ConnectionStatus />
      </header>
      
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Left Panel - Raw Journal */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <JournalInput 
            value={rawJournal}
            onChange={setRawJournal}
            onFormat={handleFormat}
            isFormatting={isFormatting}
          />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Right Panel - Formatted Output */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <FormattedOutput 
            content={formattedOutput}
            onEdit={setFormattedOutput}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
      </div>
      
      <Toaster />
    </div>
  );
}

