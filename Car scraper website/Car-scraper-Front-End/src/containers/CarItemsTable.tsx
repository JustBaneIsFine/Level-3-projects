import LoadingData from '../components/loadingData';
import CarItemCard from '../components/CarItemCard';

export default function CarItemsTable({
  list,
}: {
  list: Array<string> | undefined;
}) {
  // if data is undefined, we set a loading screen, or nothing.

  return list === undefined ? (
    <LoadingData />
  ) : (
    list.forEach((element) => {
      return <CarItemCard data={element} />;
    })
  );
}
