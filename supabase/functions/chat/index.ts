import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const MINIMAX_BASE_URL = "https://api.minimaxi.com/anthropic";
const MODEL = "MiniMax-M2.7-highspeed";

interface ChatRequest {
  message: string;
  system?: string;
}

interface MiniMaxMessage {
  role: "user" | "assistant";
  content: Array<{ type: "text"; text: string }>;
}

interface MiniMaxResponse {
  id: string;
  type: string;
  role: string;
  content: Array<MiniMaxContentBlock>;
  model: string;
  stop_reason: string | null;
  stop_sequence: string | null;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

type MiniMaxContentBlock = 
  | { type: "thinking"; thinking: string }
  | { type: "text"; text: string };

const SYSTEM_PROMPT = [
  "You are NeuralMix, an AI mixing co-pilot integrated into Ableton Live. Your job is to analyze mixing requests and apply the right FX chains to each track stem.",
  "",
  "When responding, you MUST follow this exact format:",
  "",
  "1. First, provide your reasoning about what FX would work best and why (this will be shown in a 'NeuralMix Brain' block)",
  "",
  "2. Then, provide a JSON object with the FX chain updates using the EXACT format shown below (use triple backticks followed by 'json'):",
  "",
  '```json',
  '{',
  '  "reasoning": "Your detailed reasoning here...",',
  '  "trackUpdates": {',
  '    "vocal": [',
  '      { "name": "EQ High-Shelf", "params": { "freq": "4000Hz", "gain": "+3dB", "Q": "0.8" } },',
  '      { "name": "Compressor", "params": { "threshold": "-12dB", "ratio": "3:1", "attack": "5ms", "release": "80ms" } }',
  '    ],',
  '    "drums": [',
  '      { "name": "Transient Shaper", "params": { "attack": "+6dB", "sustain": "-3dB" } }',
  '    ]',
  '  }',
  '}',
  '```',
  "",
  "Available tracks: drums, bass, drone, pads, keys, melody, vocal",
  "",
  "Available FX types:",
  "- EQ (High-Shelf, Low-Shelf, Bell, High-Pass) with params: freq, gain, Q, slope",
  "- Compressor with params: threshold, ratio, attack, release",
  "- Saturator with params: drive, mix, type (tape/tube)",
  "- Transient Shaper with params: attack, sustain",
  "- Stereo Widener with params: width, freq",
  "- Reverb (Plate, Room) with params: size, decay, mix",
  "- Delay with params: left, right, mix",
  "- Chorus with params: rate, depth",
  "- Limiter with params: input_gain, ceiling",
  "",
  "Respond to the user's mixing request with professional audio engineering knowledge."
].join("\n");

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json" } }
    );
  }

  const apiKey = Deno.env.get("MINIMAX_API_KEY");
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "API key not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body: ChatRequest = await req.json();
    const userMessage = body.message;

    const messages: MiniMaxMessage[] = [
      {
        role: "user",
        content: [{ type: "text", text: userMessage }],
      },
    ];

    const response = await fetch(`${MINIMAX_BASE_URL}/v1/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 2000,
        system: body.system || SYSTEM_PROMPT,
        messages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(
        JSON.stringify({ error: `MiniMax API error: ${response.status}`, details: errorText }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const data: MiniMaxResponse = await response.json();

    let reasoning = "";
    let text = "";

    for (const block of data.content) {
      if (block.type === "thinking") {
        reasoning = block.thinking;
      } else if (block.type === "text") {
        text = block.text;
      }
    }

    let trackUpdates: Record<string, Array<{ name: string; params: Record<string, string> }>> = {};

    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/'''json\s*([\s\S]*?)\s*'''/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[1]);
        if (parsed.reasoning) reasoning = parsed.reasoning;
        if (parsed.trackUpdates) trackUpdates = parsed.trackUpdates;
      } catch {
      }
    }

    return new Response(
      JSON.stringify({
        reasoning,
        trackUpdates,
        raw: text,
        usage: data.usage,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
