import { FullOffer } from '../types/offer';

export const offers: FullOffer[] = [
  {
    id: 'offer-1',
    title: 'Canal view apartment',
    description: 'Beautiful apartment near the Amsterdam canal.',
    type: 'apartment',
    price: 120,
    images: ['/img/apartment-01.jpg', '/img/apartment-02.jpg', '/img/apartment-03.jpg'], // ← использовать существующие файлы
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 12
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    goods: ['Heating', 'Wi-Fi', 'Kitchen', 'Coffee machine'],
    host: { name: 'Isaac', avatarUrl: '/img/avatar-angelina.jpg', isPro: true }, // ← добавить /img/
    isPremium: true,
    isFavorite: false,
    rating: 4.8,
    bedrooms: 2,
    maxAdults: 3
  },
  
  {
    id: 'offer-2',
    title: 'Cozy studio in Amsterdam',
    description: 'Perfect for a short stay in the city center.',
    type: 'room',
    price: 80,
    images: ['/img/room.jpg', '/img/studio-01.jpg'], // ← использовать room.jpg вместо apartment-01.jpg
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 12
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    goods: ['Wi-Fi', 'Heating'],
    host: { name: 'Tom', avatarUrl: '/img/avatar-max.jpg', isPro: false }, // ← avatar-max.jpg вместо avatar-tom.jpg
    isPremium: false,
    isFavorite: true,
    rating: 4.6,
    bedrooms: 1,
    maxAdults: 2
  },

  {
    id: 'offer-3',
    title: 'Modern loft near park',
    description: 'Stylish loft near a quiet Amsterdam park.',
    type: 'apartment',
    price: 150,
    images: ['/img/apartment-03.jpg'], // ← добавить /img/
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 12
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 16
    },
    goods: ['Wi-Fi', 'Kitchen', 'Washer'],
    host: { name: 'Anna', avatarUrl: '/img/avatar-angelina.jpg', isPro: true },
    isPremium: false,
    isFavorite: false,
    rating: 4.7,
    bedrooms: 1,
    maxAdults: 2
  },

  {
    id: 'offer-4',
    title: 'Spacious house with garden',
    description: 'Large house ideal for family stays.',
    type: 'house',
    price: 220,
    images: ['/img/apartment-03.jpg'], // ← добавить /img/
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 12
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 16
    },
    goods: ['Heating', 'Dishwasher', 'Washer', 'Wi-Fi'],
    host: { name: 'Max', avatarUrl: '/img/avatar-max.jpg', isPro: false },
    isPremium: true,
    isFavorite: true,
    rating: 4.9,
    bedrooms: 3,
    maxAdults: 5
  }
];