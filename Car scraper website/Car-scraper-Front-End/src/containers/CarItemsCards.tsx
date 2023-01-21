import { CarInterface } from '../interfaces/carInterface';
import CarItemCard from '../components/CarItemCard';

export default function CarItemsCards({ list }: { list: Array<CarInterface> }) {
  return (
    <div className=" m-auto flex w-full flex-wrap sm:w-11/12">
      {list.map((carObject) => {
        return (
          <div key={carObject.id} className="m-auto">
            <CarItemCard
              CarName={carObject.CarName}
              CarYear={carObject.CarYear}
              CarPrice={carObject.CarPrice}
              CarFuel={carObject.CarFuel}
              CarCC={carObject.CarCC}
              CarKM={carObject.CarKM}
              href={carObject.href}
            />
          </div>
        );
      })}{' '}
    </div>
  );
}
