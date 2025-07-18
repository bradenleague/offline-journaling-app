import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion';

interface ExpandableThoughtsProps {
  children: React.ReactNode;
}

export const ExpandableThoughts: React.FC<ExpandableThoughtsProps> = ({ children }) => {
  return (
    <div style={{ fontSize: '0.9em', color: '#666', margin: '0.5em 0' }}>
      <Accordion type="single" collapsible>
        <AccordionItem value="reasoning">
          <AccordionTrigger style={{ fontSize: '0.9em', color: '#888' }}>
            Show reasoning
          </AccordionTrigger>
          <AccordionContent style={{ fontSize: '0.9em', color: '#666', background: '#f9f9f9', borderRadius: 4, padding: '0.5em' }}>
            {children}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}; 