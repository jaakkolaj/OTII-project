import { openai } from "../config/openai";

export interface AnalysisResult {
  name: string;
  email: string;
  skills: string[];
  years_experience: number;
  education_level: 'none' | 'bachelor' | 'master' | 'phd';
  strengths: string[];
  weaknesses: string[];
  keyword_matches: Record<string, boolean>; 
  summary: string;
  score: number;
}

export const analyzeTextWithAI= async (cvText: string, jobRequirements: string): Promise<AnalysisResult> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
    {
      role: "system",
      content: `Olet asiantunteva ja analyyttinen rekrytointikonsultti. 
      Tehtäväsi on analysoida CV-tekstiä suhteessa annettuihin työpaikkavaatimuksiin. 
      Arvioi ehdokasta objektiivisesti ja anna rehellinen pisteytys (0-100).
      
      Pisteytyksen ohjeistus (score):
      - 90-100: Ehdokas täyttää kaikki vaatimukset ja omaa erinomaiset lisätaidot.
      - 70-89: Erittäin vahva osaaja, jolla on tarvittava kokemus ja useimmat avainsaidot.
      - 40-69: Potentiaalinen ehdokas, mutta häneltä puuttuu kriittistä kokemusta tai osaamista.
      - 0-39: Ehdokas ei sovellu tehtävään tai vastaavuus on erittäin heikko.

      Vastaa AINOASTAAN puhtaalla JSON-objektilla.`
    },
    {
      role: "user",
      content: `
        Analysoi seuraava CV suhteessa työpaikkailmoituksen vaatimuksiin.

        TYÖPAIKKAILMOITUKSEN VAATIMUKSET:
        ---
        ${jobRequirements}
        ---

        EHDOKKAAN CV-TEKSTI:
        ---
        ${cvText}
        ---

        Tuota JSON-objekti seuraavilla kentillä:
        {
          "name": "Ehdokkaan nimi (jos löytyy)",
          "email": "Ehdokkaan sähköpostiosoite",
          "skills": ["Lista", "tärkeimmistä", "taidoista"],
          "years_experience": 0.0, (arvio työkokemusvuosista numerona, esim. 5.5)
          "education_level": "none" | "bachelor" | "master" | "phd" (valitse osuvin),
          "strengths": ["Lista", "kolme", "tärkeintä", "vahvuutta"],
          "weaknesses": ["Lista", "kehityskohteet", "tai", "puutteet"],
          "keyword_matches": {
            "avainsana1": true,
            "avainsana2": false
          }, (poimi työpaikkailmoituksesta 5-8 tärkeintä avainsanaa ja tarkista löytyvätkö ne CV:stä)
          "summary": "Tiivis (max 400 merkkiä) yhteenveto ehdokkaan sopivuudesta.",
          "score": 0 (kokonaispisteet 0-100 perustuen analyysiisi)
        }
      `
    }
  ],
      response_format: { type: "json_object" },
      temperature: 0.1,
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("AI ei palauttanut sisältöä.");

    return JSON.parse(content) as AnalysisResult;

  } catch (error: any) {
    console.error("OpenAI-analyysivirhe:", error.message);
    throw new Error("Analyysi epäonnistui.");
  }
};