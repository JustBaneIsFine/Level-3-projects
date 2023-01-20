import { useEffect, useState } from 'react';
import {
  DisplayStateInterface,
  ButtonStateInterface,
  ButtonStates,
} from '../interfaces/StateInterfaces';
import CarItemsCards from './CarItemsCards';
import CarItemsTable from './CarItemsTable';
import SiteContent from './SiteContent';
import asc from '../assets/icons/asc.png';
import desc from '../assets/icons/desc.png';
import whiteasc from '../assets/icons/white asc.png';
import whitedesc from '../assets/icons/white desc.png';

export default function Content() {
  const [ButtonState, setButtonState] = useState<ButtonStateInterface>(
    {} as ButtonStateInterface
  );

  // Implement dark mode
  const darkMode = '';
  const data = '2';
  useEffect(() => {
    setButtonState({
      displayType: 'Card',
      sortType: 'Price',
      sortOrder: 'Asc',
    });
  }, []);

  useEffect(() => {}, [ButtonState]);
  const pressedStyle =
    'translate-y-0.5 dark:shadow-black shadow-inner shadow-slate-700 dark:active:text-black';

  return (
    <>
      <div className="h-auto w-full ">
        <div className="w-full border border-black border-opacity-20" />
        <div className=" flex justify-between bg-gradient-to-b from-slate-400 to-slate-800 p-2 ">
          <div className="flex flex-col text-center">
            <p>Display style</p>

            <ul className="mt-2 flex divide-x divide-gray-400 rounded-lg text-center   shadow  dark:divide-gray-400 ">
              {returnButtonTab(
                'Card',
                'hidden',
                `rounded-l-lg ${
                  ButtonState.displayType === 'Card' ? pressedStyle : ''
                } `
              )}
              {returnButtonTab(
                'List',
                'hidden',
                `rounded-r-lg ${
                  ButtonState.displayType === 'List' ? pressedStyle : ''
                }`
              )}
            </ul>
          </div>
          <div className="flex flex-col text-center">
            <p>Sort style</p>
            <ul className=" mt-2 flex  divide-x divide-gray-400  rounded-lg  text-center shadow dark:divide-gray-400 ">
              {returnButtonTab(
                'Price',
                ButtonState.sortType === 'Price' ? 'mr-5' : 'hidden',
                `rounded-l-lg ${
                  ButtonState.sortType === 'Price' ? pressedStyle : ''
                }`
              )}
              {returnButtonTab(
                'Year',
                ButtonState.sortType === 'Year' ? 'mr-5' : 'hidden',
                `${ButtonState.sortType === 'Year' ? pressedStyle : ''}`
              )}
              {returnButtonTab(
                'KM',
                ButtonState.sortType === 'KM' ? 'mr-5' : 'hidden',
                `${ButtonState.sortType === 'KM' ? pressedStyle : ''}`
              )}
              {returnButtonTab(
                'CC',
                ButtonState.sortType === 'CC' ? 'mr-5' : 'hidden',
                `rounded-r-lg ${
                  ButtonState.sortType === 'CC' ? pressedStyle : ''
                }`
              )}
            </ul>
          </div>
        </div>
      </div>
      {returnElement()}
    </>
  );

  function returnElement() {
    switch (ButtonState.displayType) {
      case 'List':
        return <CarItemsTable list={[data]} />;
      case 'Search':
        return <SiteContent list={data} />;
      case 'Card':
        return <CarItemsCards list={data} />;
      default:
        return <CarItemsCards list={data} />;
    }
  }

  function handleStyleClick(type: ButtonStates['types']) {
    if (type === 'Card' || type === 'List' || type === 'Search') {
      // If it's display type
      if (ButtonState.displayType !== type) {
        setButtonState((prev) => ({
          ...prev,
          displayType: type,
        }));
      }
    } else if (ButtonState.sortType === type) {
      // toggle asc/desc
      setButtonState((prev) => ({
        ...prev,
        sortOrder: ButtonState.sortOrder === 'Asc' ? 'Desc' : 'Asc',
      }));
    } else {
      setButtonState((prev) => ({
        ...prev,
        sortType: type,
        sortOrder: 'Asc',
      }));
    }
  }

  function returnButtonTab(
    text: ButtonStates['types'],
    icon: 'mr-5' | 'hidden' | '',
    style?: string
  ) {
    return (
      <li className="w-full sm:w-full">
        <button
          onClick={() => {
            handleStyleClick(text);
          }}
          type="button"
          className={`${style}  inline-block w-full  bg-white p-2 ring-inset duration-300  hover:bg-gray-50 hover:text-gray-700 focus:outline-none  active:translate-y-0.5 active:bg-slate-300  active:shadow-inner active:shadow-slate-700 dark:bg-gray-700 dark:hover:bg-gray-700 dark:hover:text-white dark:active:text-black sm:p-4`}
          aria-current="page"
        >
          <div className="flex">
            {text}{' '}
            <img
              src={ButtonState.sortOrder === 'Asc' ? asc : desc}
              className={`${icon} h-6 w-6`}
              alt=""
            />
          </div>
        </button>
      </li>
    );
  }
}
