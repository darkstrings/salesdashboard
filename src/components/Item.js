function Item({ item, onDelete }) {
  return (
    <div className="container comp">
      <hr />
      <ul className="sold-list" key={item.id}>
        <li>Item: {item.name}</li>
        <li>Item price: ${item.price}</li>
        {item.splitNum > 0 ? <li>Split between {item.splitNum + 1} people</li> : ""}
        <li>You made ${item.commissionEarned} commission from this sale</li>
        <div className="d-grid gap-2 d-md-block mx-auto">
          <button type="button" className="btn btn-outline-danger" onClick={() => onDelete(item)}>
            Delete
          </button>
        </div>
      </ul>
      <hr />
    </div>
  );
}
export default Item;
