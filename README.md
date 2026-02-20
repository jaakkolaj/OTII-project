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

## Docker testikannan käyttöönotto
- Asenna Docker desktop: https://docs.docker.com/get-started/introduction/get-docker-desktop/
- Laita .env: DATABASE_URL_TEST=postgresql://prisma:prisma@localhost:5433/tests
- Docker desktop pitää olla käynnissä testejä ajaessa
```bash
docker compose up -d
docker ps
npm run db:test:push
npm test
```

