import { useEffect, useState } from 'react';
import {
  DisplayStateInterface,
  ButtonStateInterface,
  ButtonStates,
} from '../interfaces/StateInterfaces';

import ReturnDisplayComponent from './returnDisplayComp';
import asc from '../assets/icons/asc.png';
import desc from '../assets/icons/desc.png';
import whiteasc from '../assets/icons/white asc.png';
import whitedesc from '../assets/icons/white desc.png';
import mockedData from '../assets/mockdata.json';
import { CarInterface } from '../interfaces/carInterface';
import sortCars from '../ts/sorting';

export default function Content() {
  const [ButtonState, setButtonState] = useState<ButtonStateInterface>(
    {} as ButtonStateInterface
  );
  const [sortedList, setSortedList] = useState<Array<CarInterface>>([]);

  // Implement dark mode

  useEffect(() => {
    setButtonState({
      displayType: 'Card',
      sortType: 'CarPrice',
      sortOrder: 'Asc',
    });
  }, []);

  useEffect(() => {
    const data = sortCars(
      mockedData,
      'number',
      ButtonState.sortOrder,
      ButtonState.sortType
    );
    console.log(ButtonState.sortOrder, data);
    setSortedList(data);
  }, [ButtonState, setSortedList]);

  useEffect(() => {
    console.log('changed');
  }, [sortedList]);

  const pressedStyle =
    'translate-y-0.5 dark:shadow-black shadow-inner shadow-slate-700 dark:active:text-black';

  return (
    <>
      <div className="h-auto w-full ">
        <div className="w-full border border-black border-opacity-20" />
        <div className="flex flex-col justify-between bg-gradient-to-b p-2 dark:from-slate-600 dark:to-slate-800 sm:flex-row">
          <div className=" m-auto flex w-1/2 flex-col text-center sm:m-0 sm:w-auto">
            <p className="text-sm sm:text-base">Display style</p>

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
            <p className="text-sm sm:text-base">Sort style</p>
            <ul className=" mt-2 flex  divide-x divide-gray-400  rounded-lg  text-center shadow dark:divide-gray-400 ">
              {returnButtonTab(
                'CarPrice',
                ButtonState.sortType === 'CarPrice' ? 'mr-5' : 'hidden',
                `rounded-l-lg ${
                  ButtonState.sortType === 'CarPrice' ? pressedStyle : ''
                }`
              )}
              {returnButtonTab(
                'CarYear',
                ButtonState.sortType === 'CarYear' ? 'mr-5' : 'hidden',
                `${ButtonState.sortType === 'CarYear' ? pressedStyle : ''}`
              )}
              {returnButtonTab(
                'CarKM',
                ButtonState.sortType === 'CarKM' ? 'mr-5' : 'hidden',
                `${ButtonState.sortType === 'CarKM' ? pressedStyle : ''}`
              )}
              {returnButtonTab(
                'CarCC',
                ButtonState.sortType === 'CarCC' ? 'mr-5' : 'hidden',
                `rounded-r-lg ${
                  ButtonState.sortType === 'CarCC' ? pressedStyle : ''
                }`
              )}
            </ul>
          </div>
        </div>
      </div>

      <ReturnDisplayComponent
        state={ButtonState.displayType}
        data={sortedList}
      />
    </>
  );

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
        sortType: prev.sortType,
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
          <div className="flex text-sm sm:text-base">
            {text}
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
