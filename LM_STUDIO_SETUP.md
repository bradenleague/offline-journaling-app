# LM Studio Integration Setup

This app now integrates with LM Studio to provide AI-powered journal entry formatting.

## Configuration

The LM Studio server configuration is managed via `config.local.ts`, which is ignored by git for your privacy. A template is provided in `config.example.ts`:

```typescript
export const config = {
  lmStudio: {
    baseUrl: 'http://localhost:1234', // Your LM Studio server URL
    model: '', // Model identifier (can be adjusted)
    timeout: 30000, // Request timeout in milliseconds
  },
};
```

## Setup Steps

1. **Install and Start LM Studio**
   - Download LM Studio from [lmstudio.ai](https://lmstudio.ai)
   - Load your preferred model
   - Start the local server

2. **Configure the App**
   - Copy `config.example.ts` to `config.local.ts`
   - Edit `config.local.ts` to set your LM Studio server address, model, and timeout as needed
   - `config.local.ts` is gitignored and will not be committed

3. **Verify Connection**
   - The app shows a connection status in the header
   - Green badge = connected, red badge = disconnected
   - Click the badge to manually check connection

## API Usage

The app uses the OpenAI-compatible API endpoints:
- `GET /v1/models` - Check server status
- `POST /v1/chat/completions` - Format journal entries

## Error Handling

The app includes comprehensive error handling:
- Connection timeouts
- Server errors
- Network issues
- Invalid responses

Toast notifications will show success/error messages for each formatting attempt.

## Troubleshooting

1. **Connection Issues**
   - Verify LM Studio is running
   - Check the server address in `config.local.ts`
   - Ensure no firewall is blocking the connection

2. **Slow Responses**
   - Increase the timeout value in `config.local.ts`
   - Consider using a faster model
   - Check system resources

3. **Poor Formatting Quality**
   - Try different models in LM Studio
   - Adjust the system prompt in `services/lmStudio.ts`
   - Modify temperature settings for more/less creative output 