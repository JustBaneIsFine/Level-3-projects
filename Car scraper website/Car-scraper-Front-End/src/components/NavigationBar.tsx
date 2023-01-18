import { useState } from 'react';
import ButtonLink from './ButtonLink';

export default function NavigationBar() {
  const [toggle, setToggle] = useState(true);
  const [overlay, setOverlay] = useState(false);

  return (
    <nav className=" fixed top-0 flex h-14 w-full flex-col justify-between  border-b bg-white bg-opacity-40 pl-2 pr-2 shadow-xl dark:bg-black dark:bg-opacity-70 sm:flex-row">
      <div className="flex h-full w-full flex-row items-center sm:hidden ">
        <div className="w-1/6">
          <div
            className="fixed top-0 left-0  h-full w-full bg-black opacity-50"
            style={{ display: !overlay ? 'none' : '' }}
            onClick={handleClick}
            onKeyDown={handleClick}
            role="none"
          />
          <button
            type="button"
            className="rounded-lg py-1 px-2 text-slate-900  opacity-70  duration-500 ease-in-out hover:bg-slate-500  hover:text-slate-100 dark:text-white dark:hover:bg-slate-200 dark:hover:text-black"
            onClick={handleDropdown}
          >
            X
          </button>
        </div>

        <div className=" flex w-5/6 justify-center text-black dark:text-white ">
          CAR SCRAPER
        </div>
      </div>

      <div
        className=" fixed top-14 left-0  rounded-md   sm:top-0 sm:!flex sm:w-full sm:justify-between sm:rounded-none"
        style={{
          display: toggle ? 'none' : '',
        }}
      >
        <div className="flex flex-col justify-between sm:flex-row">
          <div>
            <ButtonLink link="/" name="Home" handleLink={handleClick} />
          </div>
          <div>
            <ButtonLink link="/About" name="About" handleLink={handleClick} />
          </div>
        </div>
        <div className=" hidden text-black dark:text-white sm:flex sm:self-center">
          CAR SCRAPER
        </div>
        <div className=" flex flex-col justify-between sm:flex-row">
          <div>
            <ButtonLink
              link="/Register"
              name="Register"
              handleLink={handleClick}
            />
          </div>

          <div>
            <ButtonLink link="/Login" name="Log in" handleLink={handleClick} />
          </div>
        </div>
      </div>
    </nav>
  );
  function handleDropdown() {
    setToggle((x) => !x);
    setOverlay((x) => !x);
  }
  function handleClick() {
    handleDropdown();
  }
}
