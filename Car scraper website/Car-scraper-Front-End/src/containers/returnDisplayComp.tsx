import { CarInterface } from '../interfaces/carInterface';
import CarItemsCards from './CarItemsCards';
import CarItemsTable from './CarItemsTable';
import SiteContent from './SiteContent';

export default function ReturnDisplayComponent({
  state,
  data,
}: {
  state: 'List' | 'Search' | 'Card';
  data: Array<CarInterface>;
}) {
  switch (state) {
    case 'List':
      return <CarItemsTable list={data} />;
    case 'Search':
      return <SiteContent list={data} />;
    case 'Card':
      return <CarItemsCards list={data} />;
    default:
      return <CarItemsCards list={data} />;
  }
}
