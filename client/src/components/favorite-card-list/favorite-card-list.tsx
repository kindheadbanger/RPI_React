// src/components/favorite-card-list/favorite-card-list.tsx
import { FavoriteCard } from '../favorite-card/favorite-card';
import { OffersList } from '../../types/offer';

type FavoriteCardListProps = {
  offersList: OffersList[];
};

function FavoriteCardList({ offersList }: FavoriteCardListProps): JSX.Element {
  // Группировка по городам (если нужно по макету)
  const groupedByCity: Record<string, OffersList[]> = {};
  
  offersList.forEach((offer) => {
    if (!groupedByCity[offer.city.name]) {
      groupedByCity[offer.city.name] = [];
    }
    groupedByCity[offer.city.name].push(offer);
  });

  return (
    <>
      {Object.entries(groupedByCity).map(([cityName, cityOffers]) => (
        <li key={cityName} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{cityName}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {cityOffers.map((offer) => (
              <FavoriteCard
                key={offer.id}
                id={offer.id}
                title={offer.title}
                type={offer.type}
                price={offer.price}
                previewImage={offer.previewImage}
                isPremium={offer.isPremium}
                rating={offer.rating}
              />
            ))}
          </div>
        </li>
      ))}
    </>
  );
}

export { FavoriteCardList };