// General
export interface ProviderChildProps {
  children: React.ReactNode;
}

// User State
export interface UserStateInterface {
  userLogedIn: boolean;
  username?: string;
  userFirstName?: string;
  userLastName?: string;
}

export interface UserContextType {
  userState: UserStateInterface;
  setUserState: (
    username: string,
    userFirstName: string,
    userLastName: string,
    userLogedIn: boolean
  ) => void;
}

// Display State
export interface DisplayStateInterface {
  type: 'list' | 'card' | 'search';
}
export interface DisplayContextType {
  displayState: DisplayStateInterface['type'];
  setDisplayState: React.Dispatch<
    React.SetStateAction<'list' | 'card' | 'search'>
  >;
}
