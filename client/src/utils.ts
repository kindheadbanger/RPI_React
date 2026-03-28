import { CityOffer, OffersList } from './types/offer';
import { SortOffersType } from './const';
import { SortOffer } from './types/sort';

// Получить город по имени
export function getCity(cityName: string, cities: readonly CityOffer[]): CityOffer {
  const foundCity = cities.find((city) => city.name === cityName);
  if (!foundCity) {
    return cities[0]; // Возвращаем первый город как дефолтный
  }
  return foundCity;
}

// Получить предложения для конкретного города
export function getOffersByCity(cityName: string | undefined, offers: OffersList[]): OffersList[] {
  if (!cityName) {
    return offers;
  }
  return offers.filter((offer) => offer.city.name === cityName);
}

// Сортировка предложений
export function sortOffersByType(offers: OffersList[], type: SortOffer): OffersList[] {
  const sortedOffers = [...offers]; // Создаем копию, чтобы не мутировать оригинал
  
  switch (type) {
    case 'PriceToHigh':
      return sortedOffers.sort((a, b) => a.price - b.price);
    case 'PriceToLow':
      return sortedOffers.sort((a, b) => b.price - a.price);
    case 'TopRated':
      return sortedOffers.sort((a, b) => b.rating - a.rating);
    default: // Popular
      return sortedOffers;
  }
}