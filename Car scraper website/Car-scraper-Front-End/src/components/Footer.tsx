import { Link } from 'react-router-dom';
import IconsHolder from '../containers/iconsHolder';

export default function Footer() {
  return (
    <footer className="sticky top-[100vh] mt-5">
      <div className="w-full border-b border-white border-opacity-30" />
      <div className=" flex h-20 w-full sm:h-28">
        <div className="m-auto grid h-full w-11/12 grid-cols-3 items-center justify-items-center px-3 dark:text-white sm:gap-2 sm:px-20 md:gap-12">
          <div className="">
            <IconsHolder iconSize="h-8 sm:h-10" />
          </div>
          <div className="text-sm">@JustBaneIsFine</div>
          <div className="cursor-pointer text-sm">
            <ul className="grid gap-y-2">
              <li>
                <Link to="/About"> About </Link>
              </li>
              <li>
                <Link to="/"> Home </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
