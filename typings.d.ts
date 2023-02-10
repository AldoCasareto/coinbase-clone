export type MoversProps = {
  id: number;
  symbol: string;
  price: number;
  percentChange: number;
};

export type News = {
  source_info: { name: string };
  date: string;
  title: string;
  imageurl: string;
  published_on: number;
  url: string;
};
