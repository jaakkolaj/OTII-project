# OTII-project
Ohjelmistotuotanto 2 -projekti.

### ATS järjestelmä, joka OpenAI kirjaston avulla muodostaa CV:istä ja saatekirjeistä tiivistettyjä yhteenvetoja sekä ränkkää hakijat ennaltamääritettyjen kriteerien perusteella.
- CV:iden ja saatekirjeiden automaattinen analysointi
- Tiivistettyjen yhteenvetojen generointi OpenAI:n avulla
- Hakijoiden vertailu ja pisteytys ennalta määritettyjen kriteerien perusteella
- Selainpohjainen käyttöliittymä
- Erillinen client- ja server-arkkitehtuuri

## Client
```bash
cd client
npm install
npm run dev
```

## Server
```bash
cd server
npm install
npm run dev
```

## Tietokanta taulujen muutokset ja synkronointi
```bash
npx prisma migrate dev
npx prisma generate
```
