# NeuralMix Ableton Demo - MiniMax AI Integration

## Setup Instructions

### 1. Deploy the Edge Function

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref iikrvgjfkuijcpvdwzvv

# Deploy the chat function
supabase functions deploy chat
```

### 2. Set Environment Variable

In your Supabase Dashboard:
1. Go to Project Settings → Functions
2. Add environment variable: `MINIMAX_API_KEY`
3. Value: Your MiniMax API key from https://platform.minimaxi.com/

### 3. Test the API

```bash
curl -X POST 'https://iikrvgjfkuijcpvdwzvv.supabase.co/functions/v1/chat' \
  -H 'Content-Type: application/json' \
  -d '{"message": "Make vocals cut through the mix"}'
```

### 4. Local Development

```bash
# Set your MiniMax API key locally
export MINIMAX_API_KEY=your_key_here

# Serve functions locally
supabase functions serve chat
```

## API Details

- **Model**: MiniMax-M2.7-highspeed
- **Base URL**: https://api.minimaxi.com/anthropic
- **Endpoint**: `/v1/messages`
- **Context Window**: 204,800 tokens
- **Speed**: ~100 TPS (tokens per second)

## Features

- **Real AI Reasoning**: Uses MiniMax M2.7's thinking capability to explain mixing decisions
- **Track-Level Control**: Applies FX chains to specific tracks (drums, bass, vocal, etc.)
- **Ableton-Style UI**: Matches Ableton Live's dark theme and clip-based workflow
- **Secure**: API key stored server-side in Supabase Edge Function
