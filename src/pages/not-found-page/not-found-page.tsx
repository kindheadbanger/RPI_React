function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <main className="page__main container">
        <h1>404. Страница не найдена</h1>
        <p>Извините, такой страницы не существует.</p>
        <a href="/">Вернуться на главную страницу</a>
      </main>
    </div>
  );
}

export default NotFoundPage;