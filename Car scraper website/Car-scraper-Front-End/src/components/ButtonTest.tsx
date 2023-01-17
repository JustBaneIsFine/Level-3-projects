import { ReactNode } from 'react';

export default function ButtonTest({ name }: { name: string }) {
  return (
    <button
      type="button"
      className="m-2  rounded-lg  pl-5 pr-5 pt-2 pb-2 text-slate-900 opacity-70  duration-500  ease-in-out hover:bg-slate-500 hover:text-slate-100"
    >
      {name}
    </button>
  );
}
