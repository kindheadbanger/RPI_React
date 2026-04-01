import { Link } from 'react-router-dom';
import { Logo } from '../../components/logo/logo';
import { FavoriteCardList } from '../../components/favorite-card-list/favorite-card-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { getOffers, getUser } from '../../store/selectors';

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const offersList = useAppSelector(getOffers);
  const user = useAppSelector(getUser);
  const favoriteOffers = offersList.filter((offer) => offer.isFavorite);

  const handleLogoutClick = () => {
    dispatch(logoutAction());
  };

  return (
    <div className="page page--favorites-empty">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    to={AppRoute.Favorites}
                    className="header__nav-link header__nav-link--profile"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                      {user?.avatar && (
                        <img
                          className="header__avatar user__avatar"
                          src={user.avatar}
                          alt={user.email}
                        />
                      )}
                    </div>
                    <span className="header__user-name user__name">
                      {user?.email ?? 'User'}
                    </span>
                    <span className="header__favorite-count">{favoriteOffers.length}</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a
                    className="header__nav-link"
                    href="#"
                    onClick={(evt) => {
                      evt.preventDefault();
                      handleLogoutClick();
                    }}
                  >
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className={`page__main page__main--favorites ${favoriteOffers.length === 0 ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          <section className={`favorites ${favoriteOffers.length === 0 ? 'favorites--empty' : ''}`}>
            <h1 className="favorites__title">Saved listing</h1>

            {favoriteOffers.length === 0 ? (
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
              </div>
            ) : (
              <FavoriteCardList offersList={favoriteOffers} />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default FavoritesPage;