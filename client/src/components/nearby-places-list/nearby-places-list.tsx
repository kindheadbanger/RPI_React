import { CitiesCard } from '../cities-card/cities-card';
import { OffersList } from '../../types/offer';

type NearbyPlacesListProps = {
  offersList: OffersList[];
};

function NearbyPlacesList({ offersList }: NearbyPlacesListProps): JSX.Element {
  return (
    <div className="near-places__list places__list">
      {offersList.map((offer) => (
        <CitiesCard
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
  );
}

export { NearbyPlacesList };