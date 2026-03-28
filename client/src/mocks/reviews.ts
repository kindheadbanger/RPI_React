// src/mocks/reviews.ts
import { Review } from '../types/review';

const reviews: Review[] = [
  {
    id: '463623e8-eecc-42a2-b2fc-797a299b5230',
    comment: 'The room was spacious and clean. The pool looked nothing like the photos',
    date: '2023-06-29T21:00:00.465Z',
    rating: 4,
    user: {
      name: 'Isaac',
      avatarUrl: '/img/avatar-angelina.jpg', // ✅ Файл существует
      isPro: true,
    },
  },
  {
    id: '9c8c8c51-9de3-4c34-b6e2-a5a3f83fa999',
    comment: 'Great location, nice view from the window.',
    date: '2023-07-01T11:15:00.000Z',
    rating: 5,
    user: {
      name: 'Max',
      avatarUrl: '/img/avatar-max.jpg', // ✅ Файл существует
      isPro: false,
    },
  },
];

export { reviews };