import { CarInterface } from '../interfaces/carInterface';

export default function sortCars(
  array: Array<CarInterface>,
  sortType: 'number' | 'text',
  sortOrder: 'Asc' | 'Desc',
  sortChoice: 'CarPrice' | 'CarKM' | 'CarCC' | 'CarYear'
) {
  if (sortType === 'number') {
    return sortOrder === 'Asc'
      ? sortAscending(array, sortChoice)
      : sortDescending(array, sortChoice);
  }
  return sortFuelType(array, sortOrder);
}

function sortAscending(
  array: Array<CarInterface>,
  sortChoice: 'CarPrice' | 'CarKM' | 'CarCC' | 'CarYear'
) {
  console.log('sorting ascending', sortChoice);
  return [...array].sort(
    (a, b) => parseInt(a[sortChoice], 10) - parseInt(b[sortChoice], 10)
  );
}

function sortDescending(
  array: Array<CarInterface>,
  sortChoice: 'CarPrice' | 'CarKM' | 'CarCC' | 'CarYear'
) {
  console.log('sorting descending', sortChoice);
  return [...array].sort(
    (a, b) => parseInt(b[sortChoice], 10) - parseInt(a[sortChoice], 10)
  );
}

function sortFuelType(array: Array<CarInterface>, sortOrder: 'Asc' | 'Desc') {
  return [...array].sort((a, b) =>
    sortOrder === 'Asc'
      ? a.CarFuel.localeCompare(b.CarFuel)
      : b.CarFuel.localeCompare(a.CarFuel)
  );
}
