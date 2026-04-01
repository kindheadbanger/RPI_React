import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function PageNotFound(): JSX.Element {
  return (
    <div style={{padding: '40px', textAlign: 'center'}}>
      <h1>404. Page not found</h1>
      <p>The page does not exist.</p>
      <Link to={AppRoute.Main}>Return to main page</Link>
    </div>
  );
}

export default PageNotFound;
