export type Movie = {
  id: number;
  title: string;
  year: number;
  categories: string[];
  rating: number; // 0–10
};

export const movies: Movie[] = [
  {
    id: 1,
    title: 'Inception',
    year: 2010,
    categories: ['Sci-Fi', 'Action'],
    rating: 8.8,
  },
  {
    id: 2,
    title: 'Interstellar',
    year: 2014,
    categories: ['Sci-Fi', 'Drama'],
    rating: 8.6,
  },
  {
    id: 3,
    title: 'The Silent Code',
    year: 2025,
    categories: ['Drama', 'Thriller'],
    rating: 7.8,
  },
];
