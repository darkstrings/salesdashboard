import { useState } from "react";
import { v4 as uuid } from "uuid";
function AddSale({ onAddItem, comm, commTotalEarned, setCommTotalEarned, onNumInputChange }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [splitNum, setSplitNum] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    const parsedPrice = parseFloat(price);
    let parsedSplitNum = parseFloat(splitNum);
    let commAsNumber = parseFloat(comm);

    if (comm === "") {
      commAsNumber = 0;
      parsedSplitNum = 0;
    }

    if (name !== "" && !isNaN(parsedPrice) && !isNaN(parsedSplitNum) && !isNaN(comm)) {
      const id = uuid();
      const commDivide = parsedSplitNum + 1;

      const newItem = {
        id,
        name,
        price: parsedPrice,
        splitNum: parsedSplitNum,
        commissionEarned: parsedSplitNum > 0 ? (parsedPrice * commAsNumber) / commDivide : parsedPrice * commAsNumber,
      };
      onAddItem(newItem);
      setName("");
      setPrice("");
      setSplitNum(0);
      setCommTotalEarned(newItem.commissionEarned + commTotalEarned);
    } else {
      return;
    }
  }
  return (
    <div className="add-sale-form container comp">
      <h2>Sold Item Entry</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-5 col-form-label">
            Item Name
          </label>
          <div className="col-sm-4">
            <input id="name" className="form-control" value={name} type="text" onChange={(e) => setName(e.target.value)} />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="price" className="col-sm-5 col-form-label">
            Item Price
          </label>
          <div className="col-sm-4">
            <input
              id="price"
              className="form-control"
              type="text"
              value={price === 0 ? "" : price}
              onChange={(e) => onNumInputChange(e, setPrice)}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="split" className="col-sm-5 col-form-label">
            Number of splits
          </label>
          <div className="col-sm-4">
            <input id="split" className="form-control" type="text" value={splitNum} onChange={(e) => onNumInputChange(e, setSplitNum)} />
          </div>
        </div>

        <button className="btn btn-outline-primary">Submit</button>
      </form>
    </div>
  );
}

export default AddSale;
