import { useContext } from 'react';
import UserContext from '../context/UserContext';

export default function LoginButton() {
  const { userState, setUserState } = useContext(UserContext);

  return (
    <div className="container h-96 w-auto bg-slate-500">
      <button type="button" onClick={handleClick}>
        Click here
      </button>
      <label htmlFor="button"> {userState.username}</label>
    </div>
  );
  function handleClick() {
    setUserState('usernamex', 'FirstNamex', 'LastNameX', true);
  }
}
