export type OfferLocation = {
  latitude: number;
  longitude: number;
  zoom?: number;
};

export type CityOffer = {
  name: string;
  location: OfferLocation;
};

export type OffersList = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: CityOffer;
  location: OfferLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type FullOffer = {
  id: string;
  title: string;
  description: string;
  city: string;
  previewImage: string;
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: string;
  rooms: number;
  guests: number;
  price: number;
  features: string[];
  commentsCount: number;
  location: {
    latitude: number;
    longitude: number;
  };
  author: {
    id: number;
    email: string;
    username: string;
    avatar: string;
    userType: string;
  };
};