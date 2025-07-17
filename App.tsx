import { useState } from 'react';
import { JournalInput } from './components/JournalInput';
import { FormattedOutput } from './components/FormattedOutput';
import { Toaster } from './components/ui/sonner';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from './components/ui/resizable';

export default function App() {
  const [rawJournal, setRawJournal] = useState('');
  const [formattedOutput, setFormattedOutput] = useState('');
  const [isFormatting, setIsFormatting] = useState(false);

  const handleFormat = async () => {
    if (!rawJournal.trim()) return;
    
    setIsFormatting(true);
    
    // Simulate local LLM processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock LLM formatting - in a real app, this would call a local LLM
    const formatted = formatJournalEntry(rawJournal);
    setFormattedOutput(formatted);
    
    setIsFormatting(false);
  };

  return (
    <div className="h-screen bg-background">
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
      
      <Toaster />
    </div>
  );
}

// Mock LLM formatting function
function formatJournalEntry(rawText: string): string {
  // Simple heuristic-based formatting to simulate LLM processing
  const lines = rawText.split('\n').filter(line => line.trim());
  
  let location = '';
  let weather = '';
  let observations: string[] = [];
  let reflections: string[] = [];
  
  // Look for location indicators
  const locationKeywords = ['at', 'in', 'near', 'by', 'visited', 'went to'];
  const weatherKeywords = ['sunny', 'cloudy', 'rainy', 'windy', 'cold', 'warm', 'hot', 'cool', 'foggy', 'clear'];
  
  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    
    // Check for location
    if (!location && locationKeywords.some(keyword => lowerLine.includes(keyword))) {
      location = line;
    }
    
    // Check for weather
    if (!weather && weatherKeywords.some(keyword => lowerLine.includes(keyword))) {
      weather = line;
    }
    
    // Categorize as observation or reflection
    if (lowerLine.includes('saw') || lowerLine.includes('noticed') || lowerLine.includes('observed') || lowerLine.includes('found')) {
      observations.push(line);
    } else if (lowerLine.includes('feel') || lowerLine.includes('think') || lowerLine.includes('realize') || lowerLine.includes('remember')) {
      reflections.push(line);
    } else if (!location && !weather) {
      // Default to observations if no clear category
      observations.push(line);
    }
  }
  
  // If no specific categorization, split roughly in half
  if (observations.length === 0 && reflections.length === 0) {
    const midpoint = Math.floor(lines.length / 2);
    observations = lines.slice(0, midpoint);
    reflections = lines.slice(midpoint);
  }
  
  return `## Location:
${location || '[Add location details]'}

## Weather:
${weather || '[Add weather conditions]'}

## Observations:
${observations.map(obs => `- ${obs}`).join('\n') || '- [Add observations]'}

## Reflections:
${reflections.map(ref => `- ${ref}`).join('\n') || '- [Add reflections]'}`;
}