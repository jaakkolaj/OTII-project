import natural from "natural";

const tokenizer = new natural.WordTokenizer();
const TfIdf = natural.TfIdf;

export function tokenizeText(text: string): string[] {
  return tokenizer.tokenize(text.toLowerCase());
}

export function getTopKeywords(text: string, limit = 10): string[] {
  const tfidf = new TfIdf();
  tfidf.addDocument(text);

  const keywords: string[] = [];

  tfidf.listTerms(0).slice(0, limit).forEach(item => {
    keywords.push(item.term);
  });

  return keywords;
}
