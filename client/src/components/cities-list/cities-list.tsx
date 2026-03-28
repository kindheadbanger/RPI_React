import { CityOffer } from '../../types/offer';
import { CITIES_LOCATION } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/action';

type CitiesListProps = {
  selectedCity: CityOffer | undefined;
};

function CitiesList({ selectedCity }: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {CITIES_LOCATION.map((city) => (
        <li key={city.name} className="locations__item">
          <a
            className={`locations__item-link tabs__item ${
              city.name === selectedCity?.name ? 'tabs__item--active' : ''
            }`}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              dispatch(changeCity(city));
            }}
          >
            <span>{city.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export { CitiesList };