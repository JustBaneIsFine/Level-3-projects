import { CarInterface } from '../interfaces/carInterface';

export default function CarItemList({
  carObject,
  index,
}: {
  carObject: CarInterface;
  index: number;
}) {
  return (
    <tr
      className="text-center"
      style={{ backgroundColor: index % 2 === 0 ? 'rgba(3,3,3,0.2)' : '' }}
    >
      <td className=" border border-slate-900 text-left dark:border-slate-400 sm:border-dashed">
        <a
          href={carObject.href}
          className="decoration-slice underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {carObject.CarName}
        </a>
      </td>
      <td className="border border-slate-900 dark:border-slate-400 sm:border-dashed">
        {carObject.CarPrice}
      </td>
      <td className="border border-slate-900 dark:border-slate-400 sm:border-dashed">
        {carObject.CarYear}
      </td>
      <td className="border border-slate-900 dark:border-slate-400 sm:border-dashed">
        {carObject.CarCC}
      </td>
      <td className="border border-slate-900 dark:border-slate-400 sm:border-dashed">
        {carObject.CarFuel}
      </td>
      <td className="border border-slate-900 dark:border-slate-400 sm:border-dashed">
        {carObject.CarKM}
      </td>
    </tr>
  );
}
