import ButtonTest from './ButtonTest';
import LoginButton from '../containers/LoginButton';
import RegisterAccButton from '../containers/RegisterAccButton';

export default function NavigationBar() {
  // Nav bar will contain a search bar as well
  // This search bar will look trough the awailable website data only.
  // MAYBE IMPLEMENT THIS..BUT AFTER IMPLEMENTING EVERYTHING ELSE..
  // JUST LEAVE ROOM FOR IT

  return (
    <div className="w-full flex-row">
      <ButtonTest name="Home" />
      <ButtonTest name="About" />
      <LoginButton />
      <RegisterAccButton />
    </div>
  );
}
