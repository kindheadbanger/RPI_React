import { faker } from '@faker-js/faker';
import { AuthorizationStatus, CITIES_LOCATION } from '../const';
import type { OffersList, FullOffer } from '../types/offer';
import type { Review } from '../types/review';
import type { UserData } from '../types/user-data';

export type InitialState = {
  city: typeof CITIES_LOCATION[number];
  offers: OffersList[];
  offer: FullOffer | null;
  reviews: Review[];
  authorizationStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus];
  user: UserData | null;
  error: string | null;
  isOffersDataLoading: boolean;
};

export function makeFakeOffer(): OffersList {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    type: 'apartment',
    price: faker.number.int({ min: 50, max: 500 }),
    city: CITIES_LOCATION[0],
    location: {
      latitude: faker.number.float({ min: 48, max: 49 }),
      longitude: faker.number.float({ min: 2, max: 3 }),
      zoom: 13,
    },
    isFavorite: faker.datatype.boolean(),
    isPremium: faker.datatype.boolean(),
    rating: faker.number.float({ min: 1, max: 5 }),
    previewImage: faker.image.url(),
  };
}

export function makeFakeFullOffer(): FullOffer {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    city: 'Paris',
    previewImage: faker.image.url(),
    isPremium: faker.datatype.boolean(),
    isFavorite: faker.datatype.boolean(),
    rating: faker.number.float({ min: 1, max: 5 }),
    type: 'apartment',
    rooms: faker.number.int({ min: 1, max: 5 }),
    guests: faker.number.int({ min: 1, max: 10 }),
    price: faker.number.int({ min: 50, max: 500 }),
    features: [faker.commerce.productName(), faker.commerce.productName()],
    commentsCount: faker.number.int({ min: 0, max: 50 }),
    location: {
      latitude: faker.number.float({ min: 48, max: 49 }),
      longitude: faker.number.float({ min: 2, max: 3 }),
    },
    author: {
      id: faker.number.int({ min: 1, max: 100 }),
      email: faker.internet.email(),
      username: faker.person.fullName(),
      avatar: faker.image.avatar(),
      userType: faker.helpers.arrayElement(['normal', 'pro']),
    },
  };
}

export function makeFakeReview(): Review {
  return {
    id: faker.string.uuid(),
    comment: faker.lorem.sentence(),
    rating: faker.number.int({ min: 1, max: 5 }),
    date: new Date().toISOString(),
    user: {
      name: faker.person.fullName(),
      avatarUrl: faker.image.avatar(),
      isPro: faker.datatype.boolean(),
    },
  };
}

export function makeFakeUser(): UserData {
  return {
    id: faker.number.int({ min: 1, max: 100 }),
    email: faker.internet.email(),
    username: faker.person.fullName(),
    avatar: faker.image.avatar(),
    isPro: faker.datatype.boolean(),
    token: faker.string.alphanumeric(20),
  };
}

export function makeFakeStore(
  overrides: Partial<InitialState> = {}
): InitialState {
  return {
    city: CITIES_LOCATION[0],
    offers: [],
    offer: null,
    reviews: [],
    authorizationStatus: AuthorizationStatus.NoAuth,
    user: null,
    error: null,
    isOffersDataLoading: false,
    ...overrides,
  };
}