import SearchBar from '../components/SearchBar';
import { DisplayStateInterface } from '../interfaces/StateInterfaces';

export default function Header() {
  return (
    <div className="container h-96 w-auto bg-slate-500">
      <button className="border-2 border-amber-400" type="button">
        x
      </button>
      <label htmlFor="button">Header</label>
      <SearchBar />
    </div>
  );
}
