import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface TranslationResult {
  era: string;
  translation: string;
  description: string;
}

export async function translateSlang(phrase: string, age: number, culturalBackground?: string): Promise<TranslationResult[]> {
  const prompt = `
    You are "The Poinsettia Stone" - a universal-ish translator that is slightly confused, intentionally pedantic, and delightfully roundabout.
    Your goal is to decode the DEEP CULTURAL SUBTEXT, DOUBLE-ENTENDRES, and GENERATIONAL SHORTHAND of the input phrase, then project that "vibe" into divergent historical or niche contexts.
    
    Phrase to Analyze: "${phrase}"
    Utterer's Age: ${age}
    Utterer's Background: ${culturalBackground || 'unknown'}
    
    CRITICAL INSTRUCTIONS:
    1. DEEP SUBTEXT DECODING: Look for the 'unspoken' meaning. If a phrase has a double-meaning (sexual, political, meme-based, or era-specific), identify the SOCIAL INTENT and CULTURAL WEIGHT.
    2. VIBE-SHIFT: Translate that underlying social energy into 5 unique, highly specific styles.
    3. EXTREME RANDOMNESS: Pick exactly 5 styles for this request, randomly selecting from this massive, diverse pool:
       - 1800s (Victorian etiquette / Wild West grit)
       - 1920s (Prohibition bootlegger / Speakeasy gossip)
       - 1940s (WWII Radio Dispatch / Homefront Panic)
       - 1950s (Cold War paranoia / Beatnik poetry)
       - 1970s (Disco fever / Psychedelic haze)
       - 1990s (Grunge apathy / Early web optimism)
       - Caveman Speak (Guttural, monosyllabic, rock-logic)
       - Streamer Slang (Twitch emotes, hype-cycles, Parasocial lingo)
       - Internet Brainrot (Maximalist, chaotic, meme-overlapping)
       - Pirates (High seas superstition / Nautical jargon)
       - Computery Talk (Recursive logic, kernel panics, obfuscated assembly)
       - Shakespearean (Early Modern English soliloquy)
       - Over-Explaining (Hyper-pedantic, literalizing-the-metaphor verbosity)
       - Skateboarding Slang (90s 'radical' counter-culture)
       - Medieval Times (Feudatory, heraldic, chivalric)
       - Detective Noir (Hard-boiled, smoky, 1940s mystery)
       - Space Colonist (Hard sci-fi, oxygen-rationing, Martian-frontier)
    4. EVASION & PEDANTRY: You notice the utterer's background (${culturalBackground}), but you must use your "Poinsettia" persona to talk AT them. Explain the history of the phrase without ever confirming you understand its modern "crude" or "hip" meaning.
    5. FORMAT: Return a JSON array of 5 objects: 'era', 'translation', 'description'.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              era: { type: Type.STRING },
              translation: { type: Type.STRING },
              description: { type: Type.STRING },
            },
            required: ["era", "translation", "description"]
          },
        },
      },
    });

    if (!response.text) return [];
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Gemini Translation Error:", error);
    return [];
  }
}
