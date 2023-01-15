import { useState } from 'react';
import { DisplayStateInterface } from '../interfaces/StateInterfaces';
import CarItemsCards from './CarItemsCards';
import CarItemsTable from './CarItemsTable';
import SiteContent from './SiteContent';

export default function Content() {
  const [displayType, setDisplayType] =
    useState<DisplayStateInterface['type']>('card');
  const data = 'Table';
  const data2 = 'Search';
  const data3 = 'Cards';

  return (
    <>
      <div>
        <select
          name="select"
          onChange={(e) => {
            if (e.target.value === 'list' || e.target.value === 'card') {
              setDisplayType(e.target.value);
            }
          }}
        >
          <option value="list">list</option>
          <option value="card">card</option>
        </select>
      </div>
      {returnElement()}
    </>
  );

  function returnElement() {
    switch (displayType) {
      case 'list':
        return <CarItemsTable list={data} />;
      case 'search':
        return <SiteContent list={data2} />;
      case 'card':
        return <CarItemsCards list={data3} />;
      default:
        return <CarItemsCards list={data3} />;
    }
  }
}
