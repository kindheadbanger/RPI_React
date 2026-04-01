import { JSX, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageNotFound from '../page-not-found/page-not-found';
import { Logo } from '../../components/logo/logo';
import { ReviewForm } from '../../components/review-form/review-form';
import { ReviewsList } from '../../components/reviews-list/reviews-list';
import { Map } from '../../components/map/map';
import { NearbyPlacesList } from '../../components/nearby-places-list/nearby-places-list';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addReviewAction,
  changeFavoriteStatusAction,
  fetchOfferAction,
  fetchReviewsAction,
  logoutAction
} from '../../store/api-actions';
import {
  getAuthorizationStatus,
  getOffer,
  getOffers,
  getReviews,
  getUser
} from '../../store/selectors';

function OfferPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const offer = useAppSelector(getOffer);
  const offers = useAppSelector(getOffers);
  const reviews = useAppSelector(getReviews);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchReviewsAction(id));
    }
  }, [dispatch, id]);

  if (!offer) {
    return <PageNotFound />;
  }

  const favoriteOffersCount = offers.filter((item) => item.isFavorite).length;

  const nearbyOffers = offers
    .filter((item) => item.id !== offer.id && item.city.name === offer.city)
    .slice(0, 3);

  const pointsForMap = [
    ...nearbyOffers,
    {
      id: offer.id,
      title: offer.title,
      type: offer.type,
      price: offer.price,
      city: {
        name: offer.city,
        location: {
          latitude: offer.location.latitude,
          longitude: offer.location.longitude,
          zoom: 12,
        },
      },
      location: {
        latitude: offer.location.latitude,
        longitude: offer.location.longitude,
        zoom: 12,
      },
      isFavorite: offer.isFavorite,
      isPremium: offer.isPremium,
      rating: offer.rating,
      previewImage: offer.previewImage,
    }
  ];

  const currentPoint = pointsForMap[pointsForMap.length - 1];

  const handleReviewSubmit = (data: { comment: string; rating: number }) => {
    if (id) {
      dispatch(addReviewAction({
        offerId: id,
        comment: data.comment,
        rating: data.rating,
      }));
    }
  };

  const handleLogoutClick = () => {
    dispatch(logoutAction());
  };

  const handleFavoriteClick = () => {
    if (!id) {
      return;
    }

    dispatch(changeFavoriteStatusAction({
      offerId: id,
      status: offer.isFavorite ? 0 : 1,
    }));
  };

  return (
    <div className="page page--gray page--offer">
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Logo />
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  {authorizationStatus === AuthorizationStatus.Auth && (
                    <>
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
                          <span className="header__favorite-count">{favoriteOffersCount}</span>
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
                    </>
                  )}
                  {authorizationStatus !== AuthorizationStatus.Auth && (
                    <li className="header__nav-item user">
                      <Link
                        to={AppRoute.Login}
                        className="header__nav-link header__nav-link--profile"
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__login">Sign in</span>
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--offer">
          <section className="offer">
            {offer.isPremium && (
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            )}

            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                <div className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src={offer.previewImage}
                    alt={offer.title}
                  />
                </div>
              </div>
            </div>

            <div className="offer__container container">
              <div className="offer__wrapper">
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">{offer.title}</h1>

                  {authorizationStatus === AuthorizationStatus.Auth && (
                    <button
                      type="button"
                      onClick={handleFavoriteClick}
                      style={{
                        marginTop: '16px',
                        padding: '10px 16px',
                        border: '1px solid #4481c3',
                        background: offer.isFavorite ? '#4481c3' : '#ffffff',
                        color: offer.isFavorite ? '#ffffff' : '#4481c3',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        fontWeight: 700
                      }}
                    >
                      {offer.isFavorite ? 'Убрать из избранного' : 'В избранное'}
                    </button>
                  )}
                </div>

                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: `${offer.rating * 20}%` }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{offer.rating}</span>
                </div>

                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">{offer.type}</li>
                  <li className="offer__feature offer__feature--bedrooms">{offer.rooms} Bedrooms</li>
                  <li className="offer__feature offer__feature--adults">Max {offer.guests} adults</li>
                </ul>

                <div className="offer__price">
                  <b className="offer__price-value">&euro;{offer.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>

                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {offer.features.map((feature) => (
                      <li key={feature} className="offer__inside-item">{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className={`offer__avatar-wrapper user__avatar-wrapper ${offer.author.userType === 'pro' ? 'offer__avatar-wrapper--pro' : ''}`}>
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.author.avatar}
                      width="74"
                      height="74"
                      alt={offer.author.username}
                    />
                  </div>
                  <span className="offer__user-name">{offer.author.username}</span>
                  <span className="offer__user-status">{offer.author.userType}</span>

                  <div className="offer__description">
                    <p className="offer__text">{offer.description}</p>
                  </div>
                </div>

                <ReviewsList reviews={reviews} />

                {authorizationStatus === AuthorizationStatus.Auth && (
                  <ReviewForm onSubmit={handleReviewSubmit} />
                )}
              </div>
            </div>

            <Map
              className="offer__map"
              city={{
                name: offer.city,
                location: {
                  latitude: offer.location.latitude,
                  longitude: offer.location.longitude,
                  zoom: 12,
                }
              }}
              points={pointsForMap}
              selectedPoint={currentPoint}
            />
          </section>

          <div className="container">
            <NearbyPlacesList offersList={nearbyOffers} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default OfferPage;