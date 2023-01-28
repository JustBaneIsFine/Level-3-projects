import AccountNavButton from '../../components/Buttons/AccountNavButton';

export default function AccountNavigation({
  setDisplayState,
  currentState,
}: {
  setDisplayState: React.Dispatch<
    React.SetStateAction<'Overview' | 'UserPosts' | 'Favorites' | 'Settings'>
  >;
  currentState: 'Overview' | 'UserPosts' | 'Favorites' | 'Settings';
}) {
  return (
    <div className="flex h-16 w-full border border-slate-400 bg-slate-100 dark:border-slate-600 dark:bg-slate-800  sm:h-full  sm:flex-col sm:border-b-0">
      <AccountNavButton
        setDisplay={setDisplayState}
        currentState={currentState}
        text="Overview"
      />
      <AccountNavButton
        setDisplay={setDisplayState}
        currentState={currentState}
        text="Favorites"
      />
      <AccountNavButton
        setDisplay={setDisplayState}
        currentState={currentState}
        text="UserPosts"
      />
      <AccountNavButton
        setDisplay={setDisplayState}
        currentState={currentState}
        text="Settings"
      />
    </div>
  );
}
