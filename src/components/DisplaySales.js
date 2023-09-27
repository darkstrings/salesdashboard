import Item from "./Item";
import pic from "../img/pic.jpg";

function DisplaySales({ soldItems, onDelete }) {
  return (
    <div className="container comp sold-items">
      <h2>Sold Items: {soldItems.length}</h2>

      {soldItems.length === 0 ? <img className="rookie-numbers" src={pic} alt="" /> : ""}
      {soldItems.map((item) => (
        <Item className="sold-item card" key={item.id} item={item} onDelete={() => onDelete(item)} />
      ))}
    </div>
  );
}

export default DisplaySales;
