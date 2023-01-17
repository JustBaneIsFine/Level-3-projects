import { Link } from 'react-router-dom';

export default function ButtonLink({
  link,
  name,
  handleLink,
}: {
  link: string;
  name: string;
  handleLink: VoidFunction;
}) {
  return (
    <Link
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Tab') {
          return false;
        }
        return true;
      }}
      onClick={() => {
        handleLink();
      }}
      to={link}
      className=" m-2 flex justify-center rounded-lg  pl-5 pr-5 pt-2 pb-2 text-slate-900 opacity-70  duration-500  ease-in-out hover:bg-slate-500 hover:text-slate-100"
    >
      {name}
    </Link>
  );
}
