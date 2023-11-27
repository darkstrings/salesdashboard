import Item from "./Item";

function DisplaySales({ soldItems, dispatch }) {
  return (
    <div className="container comp sold-items">
      <h2>Sold Items: {soldItems.length}</h2>

      {soldItems.map((item) => (
        <Item className="sold-item card" key={item.id} item={item} dispatch={dispatch} />
      ))}
    </div>
  );
}

export default DisplaySales;
