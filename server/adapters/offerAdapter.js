const cityCoordinates = {
  Paris: { latitude: 48.8566, longitude: 2.3522, zoom: 13 },
  Cologne: { latitude: 50.9375, longitude: 6.9603, zoom: 13 },
  Brussels: { latitude: 50.8503, longitude: 4.3517, zoom: 13 },
  Amsterdam: { latitude: 52.3676, longitude: 4.9041, zoom: 13 },
  Hamburg: { latitude: 53.5511, longitude: 9.9937, zoom: 13 },
  Dusseldorf: { latitude: 51.2277, longitude: 6.7735, zoom: 13 }
};

const getBaseUrl = () => `${process.env.HOST}:${process.env.PORT || 5000}`;

const prepareUrl = (url) => {
  if (!url) {
    return url;
  }

  return url.startsWith('http') ? url : `${getBaseUrl()}${url.startsWith('/') ? '' : '/'}${url}`;
};

const adaptOfferToClient = (offer) => {
  const cityLocation = cityCoordinates[offer.city];

  return {
    id: String(offer.id),
    title: offer.title,
    type: offer.type,
    price: offer.price,
    city: { name: offer.city, location: cityLocation },
    location: { latitude: offer.latitude, longitude: offer.longitude },
    isFavorite: offer.isFavorite,
    isPremium: offer.isPremium,
    rating: parseFloat(offer.rating),
    previewImage: prepareUrl(offer.previewImage)
  };
};

const adaptFullOfferToClient = (offer) => ({
  id: String(offer.id),
  title: offer.title,
  description: offer.description,
  city: offer.city,
  previewImage: prepareUrl(offer.previewImage),
  isPremium: offer.isPremium,
  isFavorite: offer.isFavorite,
  rating: parseFloat(offer.rating),
  type: offer.type,
  rooms: offer.rooms,
  guests: offer.guests,
  price: offer.price,
  features: offer.features,
  commentsCount: offer.commentsCount,
  location: { latitude: offer.latitude, longitude: offer.longitude },
  author: offer.author ? {
    id: offer.author.id,
    email: offer.author.email,
    username: offer.author.username,
    avatar: prepareUrl(offer.author.avatar),
    userType: offer.author.userType
  } : null
});

export { adaptOfferToClient, adaptFullOfferToClient };
