export type Language = 'en' | 'fi';

export const defaultLanguage: Language = 'en';
export const languages: Language[] = ['en', 'fi'];

export const translations = {
  en: {
    nav: {
      problem: 'Problem',
      solution: 'Solution',
      howItWorks: 'How It Works',
      why: 'Why RankWise',
      contact: 'Contact',
      bookDemo: 'Book a Demo',
      login: 'Login',
    },
    hero: {
      badge: 'AI-Powered Screening',
      title: 'Too Many CVs. Not Enough Time.',
      description: 'RankWise AI screens and ranks job applicants instantly — so you can focus on hiring, not reading.',
      earlyAccess: 'Get Early Access',
      bookDemo: 'Book a Demo',
    },
    problem: {
      label: 'The Problem',
      title: 'Recruiting Is Broken',
      items: {
        overload: {
          title: 'Application Overload',
          description: 'Recruiters receive hundreds of CVs for a single role.',
        },
        screening: {
          title: 'Manual Screening',
          description: 'Reviewing applications takes hours — sometimes days.',
        },
        missed: {
          title: 'Missed Talent',
          description: 'The best candidates are overlooked due to time pressure.',
        },
      },
    },
    solution: {
      label: 'The Solution',
      title: 'Let AI Handle the Screening',
      description: 'RankWise AI analyzes every applicant against your job description and delivers a ranked, explainable shortlist in seconds.',
      items: {
        matching: {
          title: 'Intelligent Matching',
          description: 'AI compares candidates directly to your job requirements.',
        },
        ranking: {
          title: 'Instant Ranking',
          description: 'See who fits best — immediately.',
        },
        explainable: {
          title: 'Explainable Results',
          description: 'Clear reasoning behind every ranking decision.',
        },
        timeSaved: {
          title: 'Time Saved',
          description: 'Reduce screening time by up to 80%.',
        },
      },
    },
    howItWorks: {
      label: 'How It Works',
      title: 'Simple. Fast. Accurate.',
      items: {
        step1: {
          number: '01',
          title: 'Add Your Job Description',
          description: 'Paste or upload the role requirements you need to fill.',
        },
        step2: {
          number: '02',
          title: 'Let AI Analyze Applicants',
          description: 'RankWise AI processes every application against your criteria.',
        },
        step3: {
          number: '03',
          title: 'Review Your Ranked Shortlist',
          description: 'Get a scored, explainable list of your top candidates.',
        },
      },
    },
    comparison: {
      label: 'Comparison',
      title: 'Why Not Just Use an ATS?',
      ats: 'Traditional ATS',
      rankwise: 'RankWise AI',
      atsFeatures: {
        feature1: 'Stores applications',
        feature2: 'Basic keyword filters',
        feature3: 'Manual review still required',
      },
      rankwiseFeatures: {
        feature1: 'Deep AI analysis',
        feature2: 'Context-aware skill matching',
        feature3: 'Automated ranking with explanations',
      },
    },
    socialProof: {
      label: 'Social Proof',
      title: 'Built for Modern Recruitment Teams',
      testimonials: {
        quote1: 'We reduced screening time from 12 hours to 2.',
        author1: 'Sarah Chen',
        role1: 'Head of Talent, TechScale',
        quote2: 'The explainable rankings changed how our team hires. We trust the results.',
        author2: 'Marcus Rivera',
        role2: 'VP People, CloudBridge',
        quote3: 'Finally, a tool that actually saves time instead of adding complexity.',
        author3: 'Anya Patel',
        role3: 'Recruiting Lead, DataForge',
      },
    },
    finalCta: {
      title: 'Hire in Minutes. Not Days.',
      description: 'Stop reading CVs manually. Start hiring smarter.',
      button: 'Request Access',
    },
    footer: {
      tagline: 'AI-powered candidate screening.',
      product: 'Product',
      pricing: 'Pricing',
      contact: 'Contact',
      privacy: 'Privacy',
      copyright: '© 2026 RankWise AI',
    },
    auth: {
      login: {
        title: 'Login to your account',
        description: 'Enter your email and password below to login to your account',
        email: 'Email',
        password: 'Password',
        forgotPassword: 'Forgot your password?',
        submit: 'Login',
        noAccount: "Don't have an account?",
        signUp: 'Sign up',
      },
      register: {
        title: 'Create an account',
        description: 'Enter your information below to create your account',
        name: 'Name',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        submit: 'Create account',
        haveAccount: 'Already have an account?',
        signIn: 'Sign in',
      },
      resetPassword: {
        title: 'Reset your password',
        description: 'Enter your email address and we will send you a link to reset your password',
        email: 'Email',
        submit: 'Send reset link',
        backToLogin: 'Back to login',
      },
    },
    contact: {
      title: 'Contact Us',
      description: 'Fill out the form below and we\'ll get back to you as soon as possible.',
      successTitle: 'Message sent!',
      name: 'Name',
      namePlaceholder: 'John Doe',
      email: 'Email',
      emailPlaceholder: 'john@example.com',
      subject: 'Subject',
      subjectPlaceholder: 'How can we help?',
      message: 'Message',
      messagePlaceholder: 'Your message...',
      submit: 'Send Message',
      sending: 'Sending...',
    },
  },
  fi: {
    nav: {
      problem: 'Ongelma',
      solution: 'Ratkaisu',
      howItWorks: 'Kuinka Se Toimii',
      why: 'Miksi RankWise',
      contact: 'Ota Yhteyttä',
      bookDemo: 'Varaa Demo',
      login: 'Kirjaudu',
    },
    hero: {
      badge: 'Tekoäly-pohjainen Seulonta',
      title: 'Liian Monta CV:tä. Liian Vähän Aikaa.',
      description: 'RankWise AI seuloo ja järjestää hakijat automaattisesti — voit keskittyä palkkaamiseen, ei lukemiseen.',
      earlyAccess: 'Hae Varhaiskäyttäjäksi',
      bookDemo: 'Varaa Demo',
    },
    problem: {
      label: 'Ongelma',
      title: 'Rekrytointi on Rikki',
      items: {
        overload: {
          title: 'Hakemuksien Tulva',
          description: 'Rekrytoijat saavat satoja CV:itä yhtä paikkaa kohden.',
        },
        screening: {
          title: 'Manuaalinen Seulonta',
          description: 'Hakemuksien tarkastaminen kestää tunteja — joskus päiviä.',
        },
        missed: {
          title: 'Jääneet Kyvyt',
          description: 'Parhaat kandidaatit jäävät huomaamatta aikapaineen vuoksi.',
        },
      },
    },
    solution: {
      label: 'Ratkaisu',
      title: 'Anna Tekoälyn Hoitaa Seulonta',
      description: 'RankWise AI analysoi jokaisen hakijan työnkuvausta vasten ja toimittaa järjestetyn, selitettävän listan muutamassa sekunnissa.',
      items: {
        matching: {
          title: 'Älykäs Yhteensovitus',
          description: 'Tekoäly vertaa kandidaatteja suoraan työn vaatimuksiin.',
        },
        ranking: {
          title: 'Välitön Järjestäminen',
          description: 'Näe kuka sopii parhaiten — heti.',
        },
        explainable: {
          title: 'Selitettävät Tulokset',
          description: 'Selvä perustelujen jokaisen sijoituspäätöksen takana.',
        },
        timeSaved: {
          title: 'Aikaa Säästyy',
          description: 'Pienennä seulonta-aikaa jopa 80 %.',
        },
      },
    },
    howItWorks: {
      label: 'Kuinka Se Toimii',
      title: 'Yksinkertainen. Nopea. Tarkka.',
      items: {
        step1: {
          number: '01',
          title: 'Lisää Työnkuvaus',
          description: 'Liitä tai lataa paikan vaatimukset, jotka sinun on täytettävä.',
        },
        step2: {
          number: '02',
          title: 'Anna Tekoälyn Analysoida Hakijat',
          description: 'RankWise AI käsittelee jokaisen hakemuksen kriteereitäsi vasten.',
        },
        step3: {
          number: '03',
          title: 'Tarkista Järjestetty Lyhytlista',
          description: 'Saa pisteitetty, selitettävä lista parhaista kandidaateistasi.',
        },
      },
    },
    comparison: {
      label: 'Vertailu',
      title: 'Miksi Ei Vain ATS:ää?',
      ats: 'Perinteinen ATS',
      rankwise: 'RankWise AI',
      atsFeatures: {
        feature1: 'Tallentaa hakemukset',
        feature2: 'Perusavain-sanalimahdollisuus',
        feature3: 'Manuaalinen tarkistus silti vaaditaan',
      },
      rankwiseFeatures: {
        feature1: 'Syvä tekoälyanalyysi',
        feature2: 'Kontekstista tietoinen taitojen yhteensovitus',
        feature3: 'Automatisoitu järjestäminen selityksillä',
      },
    },
    socialProof: {
      label: 'Sosiaaliset Todisteet',
      title: 'Rakennettu Modernille Rekrytointiyksikköille',
      testimonials: {
        quote1: 'Pienensimme seulonta-aikaa 12 tunnista 2 tuntiin.',
        author1: 'Sarah Chen',
        role1: 'Talent-johtaja, TechScale',
        quote2: 'Selitettävät sijoitukset muuttivat kuinka tiimimme palkkaa. Luotamme tuloksiin.',
        author2: 'Marcus Rivera',
        role2: 'VP Henkilöstö, CloudBridge',
        quote3: 'Vihdoin työkalu, joka todella säästää aikaa sen sijaan, että lisää monimutkaisuutta.',
        author3: 'Anya Patel',
        role3: 'Rekrytoinnin Johtaja, DataForge',
      },
    },
    finalCta: {
      title: 'Palkkaa Minuutteissa. Ei Päivinä.',
      description: 'Lopeta CV:iden manuaalinen lukeminen. Aloita älykkäämpi palkkaaminen.',
      button: 'Pyydä Pääsy',
    },
    footer: {
      tagline: 'Tekoäly-pohjainen ehdokkaiden seulonta.',
      product: 'Tuote',
      pricing: 'Hinnoittelu',
      contact: 'Ota Yhteyttä',
      privacy: 'Yksityisyys',
      copyright: '© 2026 RankWise AI',
    },
    auth: {
      login: {
        title: 'Kirjaudu tilillesi',
        description: 'Syötä sähköpostiosoitteesi ja salasanasi kirjautuaksesi tilillesi',
        email: 'Sähköposti',
        password: 'Salasana',
        forgotPassword: 'Unohditko salasanasi?',
        submit: 'Kirjaudu',
        noAccount: 'Eikö sinulla ole tiliä?',
        signUp: 'Rekisteröidy',
      },
      register: {
        title: 'Luo tili',
        description: 'Syötä tietosi luodaksesi tilin',
        name: 'Nimi',
        email: 'Sähköposti',
        password: 'Salasana',
        confirmPassword: 'Vahvista salasana',
        submit: 'Luo tili',
        haveAccount: 'Onko sinulla jo tili?',
        signIn: 'Kirjaudu sisään',
      },
      resetPassword: {
        title: 'Nollaa salasanasi',
        description: 'Syötä sähköpostiosoitteesi ja lähetämme sinulle linkin salasanan nollaamiseen',
        email: 'Sähköposti',
        submit: 'Lähetä nollauslinkki',
        backToLogin: 'Takaisin kirjautumiseen',
      },
    },
    contact: {
      title: 'Ota Yhteyttä',
      description: 'Täytä alla oleva lomake, niin otamme sinuun yhteyttä mahdollisimman pian.',
      successTitle: 'Viesti lähetetty!',
      name: 'Nimi',
      namePlaceholder: 'Matti Meikäläinen',
      email: 'Sähköposti',
      emailPlaceholder: 'matti@example.com',
      subject: 'Aihe',
      subjectPlaceholder: 'Miten voimme auttaa?',
      message: 'Viesti',
      messagePlaceholder: 'Viestisi...',
      submit: 'Lähetä Viesti',
      sending: 'Lähetetään...',
    },
  },
};

export const getTranslation = (language: Language, key: string) => {
  const keys = key.split('.');
  let value: any = translations[language];
  for (const k of keys) {
    value = value?.[k];
  }
  return value || key;
};
