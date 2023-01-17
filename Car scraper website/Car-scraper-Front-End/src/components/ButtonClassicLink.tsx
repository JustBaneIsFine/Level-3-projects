import { Link } from 'react-router-dom';

export default function ButtonClassicLink({
  link,
  name,
}: {
  link: string;
  name: string;
}) {
  return (
    <Link
      tabIndex={0}
      to={link}
      className="m-2 rounded-lg border-2 border-black border-opacity-60  pl-3 pr-3 pt-1 pb-1   text-center  text-slate-500 duration-300 ease-in-out hover:bg-slate-200 hover:text-slate-800 "
    >
      {name}
    </Link>
  );
}
