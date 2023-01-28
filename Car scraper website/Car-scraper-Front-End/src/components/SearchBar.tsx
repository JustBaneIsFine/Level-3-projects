import { useState } from 'react';
import ButtonClassic from './Buttons/ButtonClassic';
import loading from '../assets/icons/loading.png';
import check from '../assets/icons/check.png';
import error from '../assets/icons/error.png';
import LoadingInterface from '../interfaces/loadingInterface';

export default function SearchBar() {
  const [errorState, setErrorState] = useState(false);
  const [loadStateMake, setLoadStateMake] =
    useState<LoadingInterface['values']>('none');

  // Search bar contains 4 input points
  // Left ---> Make
  // Mid ---> Model
  // Right.Left ---> YearStart
  // Right.Right ---> YearEnd

  return (
    <div className=" m-auto flex w-4/6 flex-col gap-3 rounded-xl border border-black p-10 shadow-xl sm:w-auto sm:gap-0 ">
      <div className="flex flex-col sm:flex-row">
        <div className=" flex items-center sm:flex-col sm:gap-3">
          <div className="my-2 flex sm:my-0 sm:mx-2">
            <input
              type="text"
              placeholder="Make"
              className="m-auto flex w-5/6 rounded-sm border border-black p-1 shadow-md sm:w-full"
            />
          </div>
          <div className="flex w-1/2 justify-center">
            <img src={loading} alt="" className="h-10 w-10 animate-spin" />
          </div>

          {/* load bar small for phone flex, but for bigger screen go below it, col, if loaded Green check, if not, red x, if loading, spinning circle */}
        </div>
        <div className="flex items-center sm:flex-col sm:gap-3">
          <div className="my-2 flex sm:my-0 sm:mx-2">
            <input
              type="text"
              placeholder="Model"
              className="m-auto flex w-5/6 rounded-sm border border-black p-1 shadow-md sm:w-full"
            />
          </div>
          <div className="flex w-1/2 justify-center">
            <img src={loading} alt="" className="h-10 w-10 animate-spin" />
          </div>
        </div>
        <div className="flex  items-center sm:flex-col sm:gap-3">
          <div className="my-2 flex sm:my-0 sm:mx-2 ">
            <input
              type="text"
              placeholder="Year Start"
              className="m-auto flex w-5/6 rounded-sm border border-black p-1 shadow-md sm:w-full"
            />
          </div>
          <div className="flex w-1/2 justify-center">
            <img src={loading} alt="" className="h-10 w-10 animate-spin" />
          </div>
        </div>
        <div className="flex items-center sm:flex-col sm:gap-3">
          <div className="my-2 flex sm:my-0 sm:mx-2">
            <input
              type="text"
              placeholder="Year End"
              className="m-auto flex w-5/6 rounded-sm border border-black p-1 shadow-md sm:w-full"
            />
          </div>
          <div className="flex w-1/2 justify-center">
            <img src={loading} alt="" className="h-10 w-10 animate-spin" />
          </div>
        </div>
      </div>
      <div className="m-auto flex w-1/6 justify-center sm:flex-col">
        <ButtonClassic
          name="Submit"
          onclick={() => {
            console.log('submited');
          }}
        />
      </div>
    </div>
  );
}
