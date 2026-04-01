import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CitiesCard } from '../components/cities-card/cities-card';
import { makeFakeOffer } from './mocks';

describe('CitiesCard', () => {
  it('отображает заголовок объявления на карточке', () => {
    const offer = makeFakeOffer();

    render(
      <MemoryRouter>
        <CitiesCard
          id={offer.id}
          title={offer.title}
          type={offer.type}
          price={offer.price}
          previewImage={offer.previewImage}
          isPremium={offer.isPremium}
          rating={offer.rating}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(offer.title)).toBeInTheDocument();
  });

  it('отображает цену объявления', () => {
    const offer = makeFakeOffer();

    render(
      <MemoryRouter>
        <CitiesCard
          id={offer.id}
          title={offer.title}
          type={offer.type}
          price={offer.price}
          previewImage={offer.previewImage}
          isPremium={offer.isPremium}
          rating={offer.rating}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();
  });

  it('метка Premium отображается когда isPremium = true', () => {
    const offer = { ...makeFakeOffer(), isPremium: true };

    render(
      <MemoryRouter>
        <CitiesCard
          id={offer.id}
          title={offer.title}
          type={offer.type}
          price={offer.price}
          previewImage={offer.previewImage}
          isPremium={offer.isPremium}
          rating={offer.rating}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/premium/i)).toBeInTheDocument();
  });

  it('метка Premium отсутствует когда isPremium = false', () => {
    const offer = { ...makeFakeOffer(), isPremium: false };

    render(
      <MemoryRouter>
        <CitiesCard
          id={offer.id}
          title={offer.title}
          type={offer.type}
          price={offer.price}
          previewImage={offer.previewImage}
          isPremium={offer.isPremium}
          rating={offer.rating}
        />
      </MemoryRouter>
    );

    expect(screen.queryByText(/premium/i)).not.toBeInTheDocument();
  });

  it('ссылка на страницу объявления содержит id в href', () => {
    const offer = makeFakeOffer();

    render(
      <MemoryRouter>
        <CitiesCard
          id={offer.id}
          title={offer.title}
          type={offer.type}
          price={offer.price}
          previewImage={offer.previewImage}
          isPremium={offer.isPremium}
          rating={offer.rating}
        />
      </MemoryRouter>
    );

    const links = screen.getAllByRole('link');
    const offerLink = links.find((link) => link.getAttribute('href')?.includes(`/offer/${offer.id}`));

    expect(offerLink).toBeDefined();
    expect(offerLink).toHaveAttribute('href', `/offer/${offer.id}`);
  });
});