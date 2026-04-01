import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PageNotFound from '../pages/page-not-found/page-not-found';
import { AppRoute } from '../const';

describe('PageNotFound', () => {
  const renderPage = () => render(
    <MemoryRouter>
      <PageNotFound />
    </MemoryRouter>
  );

  it('отображает заголовок 404', () => {
    renderPage();

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });

  it('ссылка на главную страницу присутствует', () => {
    renderPage();

    expect(
      screen.getByRole('link', { name: /return to main page/i })
    ).toBeInTheDocument();
  });

  it('ссылка ведет на "/"', () => {
    renderPage();

    const link = screen.getByRole('link', { name: /return to main page/i });
    expect(link).toHaveAttribute('href', AppRoute.Main);
  });
});