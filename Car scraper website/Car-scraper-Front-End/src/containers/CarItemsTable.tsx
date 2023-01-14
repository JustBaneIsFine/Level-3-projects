export default function CarItemsTable() {
  return (
    <button
      type="button"
      onClick={() => {
        fetch('http://localhost:3000/').then((x) => {
          x.json().then((result) => {
            console.log(result);
          });
        });
      }}
    >
      CLICK TO SEND REQUEST
    </button>
  );
}
