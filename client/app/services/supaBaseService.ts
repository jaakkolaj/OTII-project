// supaBaseService.ts

const baseUrl = "http://localhost:5001/supabase/";

export const getSignedURL = (id: string): string => {
  try {
    const url = new URL(id, baseUrl); 
    return url.toString();
  } catch (err) {
    console.error("Virheellinen URL-muodostus:", err);
    return "";
  }
};