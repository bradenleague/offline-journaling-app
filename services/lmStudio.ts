import { config } from '../config';

interface LMStudioMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface LMStudioRequest {
  model: string;
  messages: LMStudioMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

interface LMStudioResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class LMStudioService {
  private static readonly SYSTEM_PROMPT = `You are an AI assistant that formats raw journal entries into structured markdown. 

Format the input into the following structure not in a code block:
## Location:
[Extract or infer location information]

## Weather:
[Extract or infer weather conditions]

## Observations:
[List factual observations as bullet points]

## Reflections:
[List thoughts, feelings, and insights as bullet points]

Guidelines:
- Extract information directly from the text when possible
- Use bullet points for observations and reflections
- If information is missing, use placeholders like "[Add location details]"
- Keep the original voice and meaning of the journal entry
- Be concise but preserve important details
- Do not include any other text or comments in the output
- Do not hallucinate
- Only infer if explicitly stated otherwise leave it blank

### Example Input
“Woke up cold at campsite by Lake Solitude. Light rain in the morning, then clearing. Saw fresh bear tracks. Felt both nervous and exhilarated.”

### Example Output
## Location:
Lake Solitude campsite

## Weather:
- Light rain clearing to overcast
- Temperature around 45°F

## Observations:
- Bear tracks in soft mud
- Damp tent fabric

## Reflections:
- Nervous about wildlife
- Exhilarated by solitude
`;

  static async formatJournalEntry(rawText: string): Promise<string> {
    if (!rawText.trim()) {
      throw new Error('No journal text provided');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.lmStudio.timeout);

    try {
      const requestBody: any = {
        messages: [
          {
            role: 'system',
            content: this.SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: `Please format this journal entry:\n\n${rawText}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
        stream: false,
      };

      // Only add model if specified in config
      if (config.lmStudio.model) {
        requestBody.model = config.lmStudio.model;
      }

      console.log('LM Studio request:', JSON.stringify(requestBody, null, 2));

      const response = await fetch(`${config.lmStudio.baseUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify(requestBody),
      });

      clearTimeout(timeoutId);

      console.log('LM Studio response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('LM Studio error response:', errorText);
        throw new Error(`LM Studio API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data: LMStudioResponse = await response.json();
      console.log('LM Studio response data:', JSON.stringify(data, null, 2));
      
      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response from LM Studio');
      }

      return data.choices[0].message.content;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request to LM Studio timed out');
        }
        throw new Error(`Failed to format journal entry: ${error.message}`);
      }
      
      throw new Error('Unknown error occurred while formatting journal entry');
    }
  }

  static async checkConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${config.lmStudio.baseUrl}/v1/models`, {
        method: 'GET',
        // Remove Content-Type header to avoid CORS preflight
      });
      
      return response.ok;
    } catch (error) {
      console.error('LM Studio connection check failed:', error);
      return false;
    }
  }
} 