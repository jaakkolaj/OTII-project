import "server-only";
import { cookies } from "next/headers";
import { UnauthorizedError} from "@/lib/errors";

//Tarkistaa jokaisesta määritellystä reitistä, onko käyttäjällä voimassaoleva JWT-token cookieissä. Jos token löytyy, pyyntö saa jatkaa normaalisti. 
// Jos tokenia ei löydy tai se on vanhentunut, heitetään UnauthorizedError, joka voidaan käsitellä komponentissa ja uudelleenohjata käyttäjä login-sivulle.
// Tämä toimii ns viimeisenä puolustus linjana. proxy.ts (middleware) tarkistaa reitit ennen kuin ne saavuttavat tämän, mutta tämä varmistaa, että kaikki fetch-pyynnöt, jotka käyttävät tätä funktiota, tarkistetaan myös.
export const authFetch = async (url: string, options: RequestInit = {}) => {

  const cookieStore = await cookies(); 
  const token = cookieStore.get("access_token")?.value;

   const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      "Cookie": `access_token=${token}`,
    },
  });
  
  if (response.status === 401) {
    throw new UnauthorizedError();
  }
  return response;
};