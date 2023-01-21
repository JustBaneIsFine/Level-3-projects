import { CarInterface } from '../interfaces/carInterface';

export default function CarItemCard({
  CarName,
  CarYear,
  CarPrice,
  CarFuel,
  CarCC,
  CarKM,
  href,
}: {
  CarName: string;
  CarYear: string;
  CarPrice: string;
  CarFuel: string;
  CarCC: string;
  CarKM: string;
  href: string;
}) {
  return (
    <div className="  m-2  h-96 w-40  rounded-xl border-x-2 border-y-4 border-x-slate-600 border-y-slate-800 bg-slate-300 px-1 shadow-lg shadow-black  dark:border-y-slate-300 dark:bg-zinc-800">
      <div>
        <div className=" pt-1">
          <a href="https://images.kupujemprodajem.com/photos/oglasi/5/26/146780265/tmb-300x300-146780265_63cae34d5035b9-71506224f50c9672-6044-4.jpg">
            <img
              src="https://images.kupujemprodajem.com/photos/oglasi/5/26/146780265/tmb-300x300-146780265_63cae34d5035b9-71506224f50c9672-6044-4.jpg"
              alt=""
              className="rounded-xl"
            />
          </a>
        </div>
        <div className="">
          <div className="mb-2 flex h-20  justify-center overflow-hidden  pt-2 text-center ">
            {CarName}
          </div>
          <div className="w-full border border-black dark:border-white" />
          <div className=" flex flex-col">
            <div className="">
              <span className="font-light">Cena: </span>
              <span className="u font-bold">{CarPrice}</span>
            </div>
            <div className="">
              <span className="font-light">Godiste: </span>
              <span className="u font-bold">{CarYear}</span>
            </div>
            <div>
              <span className="font-light">Kubikaza: </span>
              <span className="u font-bold">{CarCC}cc</span>
            </div>
            <div>
              <div>
                <span className="font-light">Gorivo: </span>
                <span className="u font-bold">{CarFuel}</span>
              </div>
              <span className="font-light">Kilometraza: </span>
              <span className="u font-bold">{CarKM}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
