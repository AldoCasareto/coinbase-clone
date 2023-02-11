export type MoversProps = {
  id: number;
  symbol: string;
  price: number;
  percentChange: number;
};

export type News = {
  newsOutlet: string;
  date: string;
  title: string;
  imageUrl: string;
  published_on: number;
  url: string;
};

type NewsArticle = {
  date: string;
  imageUrl: string;
  newsOutlet: string;
  title: string;
  url: string;
};
