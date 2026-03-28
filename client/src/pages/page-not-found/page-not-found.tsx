import { Logo } from '../../components/logo/logo';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      
      {/* HEADER С ЛОГО */}
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      {/* КОНТЕНТ СТРАНИЦЫ */}
      <main className="page__main container" style={{ paddingTop: '40px' }}>
        <h1>404. Страница не найдена</h1>
        <p>Извините, такой страницы не существует.</p>

        <a
          href="/"
          className="button"
          style={{
            marginTop: '20px',
            display: 'inline-block',
            color: '#4481c3'
          }}
        >
          Вернуться на главную страницу
        </a>
      </main>
    </div>
  );
}

export default NotFoundPage;
