import { createContext, useState } from 'react';
import {
  DisplayStateInterface,
  ProviderChildProps,
  DisplayContextType,
} from '../interfaces/StateInterfaces';

const DisplayContext = createContext({} as DisplayContextType);

export function DisplayContextProvider({ children }: ProviderChildProps) {
  const [displayState, setDisplayState] =
    useState<DisplayStateInterface['type']>('card');

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <DisplayContext.Provider value={{ displayState, setDisplayState }}>
      {children}
    </DisplayContext.Provider>
  );
}

export default DisplayContext;
