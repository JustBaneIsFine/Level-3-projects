import { createContext, useState } from 'react';
import {
  UserStateInterface,
  ProviderChildProps,
  UserContextType,
} from '../interfaces/StateInterfaces';

const UserContext = createContext({} as UserContextType);

export function UserContextProvider({ children }: ProviderChildProps) {
  const [userState, setUser] = useState({} as UserStateInterface);

  function setUserState(
    username: string,
    userFirstName: string,
    userLastName: string,
    userLogedIn: boolean
  ) {
    const x = {} as UserStateInterface;
    x.username = username;
    x.userFirstName = userFirstName;
    x.userLastName = userLastName;
    x.userLogedIn = userLogedIn;
    setUser(x);
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UserContext.Provider value={{ userState, setUserState }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
