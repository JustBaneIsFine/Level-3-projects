import { CarInterface } from '../interfaces/carInterface';
import CarItemCard from '../components/CarItemCard';

export default function CarItemsCards({ list }: { list: Array<CarInterface> }) {
  return (
    <div className=" m-auto flex w-full flex-wrap sm:w-11/12">
      {list.map((carObject) => {
        return (
          <div className="m-auto" key={carObject.id}>
            <CarItemCard carData={carObject} />
          </div>
        );
      })}
    </div>
  );
}
