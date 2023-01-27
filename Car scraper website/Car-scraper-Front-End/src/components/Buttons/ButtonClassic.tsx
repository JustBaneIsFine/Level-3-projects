export default function ButtonClassic({
  name,
  onclick,
  st,
}: {
  name: string;
  onclick: any;
  // eslint-disable-next-line react/require-default-props
  st?: string;
}) {
  return (
    <button
      onClick={onclick}
      type="button"
      className={`${
        st === undefined ? '' : st
      } m-2 rounded-lg border-2 border-black border-opacity-60  pl-3 pr-3 pt-1 pb-1   text-slate-500  duration-300 ease-in-out hover:bg-slate-200 hover:text-slate-800`}
    >
      {name}
    </button>
  );
}
