import { Link } from 'react-router-dom';
import ButtonTest from './ButtonTest';
import LoginButton from '../containers/LoginButton';
import RegisterAccButton from '../containers/RegisterAccButton';

export default function NavigationBar() {
  // Nav bar will contain a search bar as well
  // This search bar will look trough the awailable website data only.
  // MAYBE IMPLEMENT THIS..BUT AFTER IMPLEMENTING EVERYTHING ELSE..
  // JUST LEAVE ROOM FOR IT

  return (
    <nav className="w-full flex-row">
      <Link to="/">
        <ButtonTest name="Home" />
      </Link>
      <Link to="/UserAccount">
        <ButtonTest name="User Account" />
      </Link>
      <Link to="/Register">
        <ButtonTest name="Register" />
      </Link>
      <Link to="/Login">
        <ButtonTest name="Login" />
      </Link>
      <Link to="/About">
        <ButtonTest name="Anout" />
      </Link>

      {/* <LoginButton />
      <RegisterAccButton /> */}
    </nav>
  );
}
