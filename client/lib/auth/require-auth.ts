import "server-only";
import { redirect } from "next/navigation";
import { UnauthorizedError } from "@/lib/errors";

// Käytetään datan fetchauksessa ja server actioneissa, jotka vaativat autentikointia.
// Tämä funktio ottaa vastaan asynkronisen funktion, joka suorittaa datan hakemisen tai muun server actionin. 
// Jos funktio heittää UnauthorizedErrorin, käyttäjä uudelleenohjataan login-sivulle. Muut virheet heitetään eteenpäin.
export async function requireAuth<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    if (e instanceof UnauthorizedError) redirect("/login");
    throw e;
  }
}
