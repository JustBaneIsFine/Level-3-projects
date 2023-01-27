export default function AccountNavButton({
  setDisplay,
  currentState,
  text,
}: {
  setDisplay: React.Dispatch<
    React.SetStateAction<'Overview' | 'UserPosts' | 'Favorites' | 'Settings'>
  >;
  currentState: 'Overview' | 'UserPosts' | 'Favorites' | 'Settings';
  text: 'Overview' | 'UserPosts' | 'Favorites' | 'Settings';
}) {
  return (
    <button
      type="button"
      className={`${
        currentState === text ? ' shadow-inner shadow-black' : 'Inactive'
      } flex w-1/4  border-collapse justify-center border border-y-0 py-4 px-4 dark:border-slate-600 dark:bg-slate-700 sm:w-full sm:border sm:border-x-0 sm:px-16`}
      onClick={() => {
        setDisplay(text);
      }}
    >
      {text}
    </button>
  );
}
