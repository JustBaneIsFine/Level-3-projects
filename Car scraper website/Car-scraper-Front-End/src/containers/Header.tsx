import SearchBar from '../components/SearchBar';
import background from '../assets/images/background.jpg';

export default function Header() {
  return (
    <div className="w-full bg-gradient-to-b from-slate-100 to-slate-400 text-center text-black ">
      <div className="h-full w-full bg-white">
        <div className="pt-3 pb-5 text-xl sm:pt-7">
          <p className="animate-bounce">Welcome to the car scraper!</p>
        </div>
        <div className="flex place-content-start ">
          <SearchBar />
        </div>

        <div className="m-auto mt-10 flex w-3/4 flex-col items-center gap-5 pb-5">
          <p id="currentStatus" className="flex">
            Current state is, not logged in/ loading/ loaded etc
          </p>
          <p id="note" className="flex">
            note
          </p>
        </div>
      </div>
    </div>
  );
}
