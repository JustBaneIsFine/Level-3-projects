import LoadingData from '../components/loadingData';
import CarItemCard from '../components/CarItemCard';
import { CarInterface } from '../interfaces/carInterface';
import CarItemList from '../components/CarItemList';

export default function CarItemsTable({ list }: { list: Array<CarInterface> }) {
  return (
    <div className=" text-xs font-semibold   sm:mx-2 sm:text-base sm:font-normal">
      <table className="w-full table-auto border-collapse border border-slate-500">
        <thead>
          <tr>
            <th>Model</th>
            <th>Cena</th>
            <th>Godiste</th>
            <th>Kubikaza</th>
            <th>Gorivo</th>
            <th>Kilometraza</th>
          </tr>
        </thead>
        <tbody>
          {list.map((carObject, index) => {
            return (
              <CarItemList
                carObject={carObject}
                key={carObject.id}
                index={index}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
