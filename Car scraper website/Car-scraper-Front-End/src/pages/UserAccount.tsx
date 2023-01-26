import { useEffect, useState } from 'react';
import { AccountDisplayInterface } from '../interfaces/StateInterfaces';
import AccountOverview from '../containers/AccountOverview';
import AccountFavorites from '../containers/AccountFavorites';
import AccountPosts from '../containers/AccountPosts';
import AccountSettings from '../containers/AccountSettings';
import AccountNavigation from '../containers/AccountNavigation';

export default function UserAccount({ x }: { x: string }) {
  const [DisplayState, setDisplayState] =
    useState<AccountDisplayInterface['Types']>('Overview');

  return (
    <div className="-mb-5 h-full min-h-screen w-full sm:flex">
      <div className="flex sm:w-1/4 sm:flex-col ">
        <AccountNavigation
          setDisplayState={setDisplayState}
          currentState={DisplayState}
        />
      </div>
      <div className="w-full">{returnDisplayState()}</div>
    </div>
  );

  function returnDisplayState() {
    if (DisplayState === 'Overview') {
      return <AccountOverview />;
    }
    if (DisplayState === 'Favorites') {
      return <AccountFavorites />;
    }
    if (DisplayState === 'Settings') {
      return <AccountSettings />;
    }
    return <AccountPosts />;
  }
}
