// src/mocks/offers-list.ts
import { OffersList } from '../types/offer';

export const offersList: OffersList[] = [
  {
    id: 'offer-1',
    title: 'Canal view apartment',
    type: 'apartment',
    price: 120,
    previewImage: '/img/apartment-01.jpg', // ✅ Файл существует
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: true,
    rating: 4.9,
  },
  {
    id: 'offer-2',
    title: 'Cozy studio in city center',
    type: 'room',
    price: 80,
    previewImage: '/img/apartment-02.jpg', // ✅ Файл существует
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.3,
  },
  {
    id: 'offer-3',
    title: 'Modern loft near park',
    type: 'apartment',
    price: 150,
    previewImage: '/img/apartment-03.jpg', // ✅ Файл существует
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.7,
  },
  {
    id: 'offer-4',
    title: 'Spacious house with garden',
    type: 'house',
    price: 220,
    previewImage: '/img/apartment-small-04.jpg', // ✅ Файл существует
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.8,
  },
];