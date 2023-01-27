import { useContext } from 'react';
import UserContext from '../context/UserContext';

export default function LoginButton() {
  const { userState, setUserState } = useContext(UserContext);

  return (
    <div>
      <button type="button">Click here</button>
      {/* <label htmlFor="button"> {userState.username}</label> */}
    </div>
  );
  // function handleClick() {
  //   setUserState('usernamex', 'FirstNamex', 'LastNameX', true);
  // }
}
