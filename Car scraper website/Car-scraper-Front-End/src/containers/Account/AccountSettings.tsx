import { useRef, useState } from 'react';
import userPlaceholder from '@asset/user-placeholder.png';

export default function AccountSettings() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [currentState, setCurrentState] = useState<
    'Password' | 'Picture' | 'None'
  >('None');
  const [urlInput, setUrlInput] = useState<'Visible' | 'hidden'>('hidden');

  const [text, setText] = useState<string>('Not Selected');

  return (
    <div className=" h-full text-center">
      <div className="flex w-full justify-center border-b bg-slate-400">
        Settings
      </div>
      <div className="flex flex-col">
        <button
          type="button"
          className="m-auto mt-4 w-3/4 rounded-md bg-slate-400 p-2 duration-200 hover:bg-slate-500 sm:w-1/3"
          onClick={() => {
            setCurrentState(currentState !== 'Password' ? 'Password' : 'None');
          }}
        >
          Change your password
        </button>

        <div
          className={`${
            currentState === 'Password' ? '' : 'hidden'
          } m-auto mt-2 flex  w-3/4 flex-col gap-2 rounded bg-slate-400 p-5 sm:w-3/6`}
        >
          <input
            type="text"
            placeholder="Enter your current password"
            className="p-1 text-center"
          />
          <input
            type="text"
            placeholder="Enter your new password"
            className="p-1 text-center"
          />
          <input
            type="text"
            placeholder="Confirm your new password"
            className="p-1 text-center"
          />
          <button
            type="button"
            className="rounded border border-black p-2 duration-200 hover:bg-slate-500"
          >
            submit
          </button>
        </div>
        <button
          type="button"
          className="m-auto mt-4 w-3/4  rounded-md bg-slate-400 p-2 duration-200 hover:bg-slate-500 sm:w-1/3"
          onClick={() => {
            setCurrentState(currentState !== 'Picture' ? 'Picture' : 'None');
          }}
        >
          Change your profile picture
        </button>
        <div
          className={`${
            currentState === 'Picture' ? '' : 'hidden'
          } w-2/2 m-auto mt-5 flex  justify-around  sm:w-1/2`}
        >
          <img
            src={userPlaceholder /* current image */}
            alt=""
            className="h-28"
          />
          <div className="flex  flex-col justify-center gap-5">
            <button
              type="button"
              className="rounded  border border-slate-500 p-2 duration-200 hover:bg-slate-500 "
              onClick={() => {
                fileRef.current?.click();
              }}
            >
              Upload an image: {text}
              <input
                ref={fileRef}
                type="file"
                name=""
                className="hidden"
                id=""
                onChange={() => {
                  setText(
                    fileRef.current?.value !== undefined
                      ? fileRef.current.value
                      : 'Not selected'
                  );
                }}
              />
            </button>
            <button
              type="button"
              className="rounded border border-slate-500 p-2 duration-200 hover:bg-slate-500"
              onClick={() => {
                setUrlInput(urlInput === 'Visible' ? 'hidden' : 'Visible');
              }}
            >
              Load from url
            </button>
            <div
              className={`${
                urlInput === 'hidden' ? 'hidden' : ''
              } flex flex-col`}
            >
              <input type="url" className="text-black" />
              <button
                type="button"
                className="mt-2 rounded border border-slate-500 p-2 duration-200 hover:bg-slate-500"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
