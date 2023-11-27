import { useState } from "react";
import { v4 as uuid } from "uuid";

function AddSale({ comm, dispatch }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [splitNum, setSplitNum] = useState(0);

  function handleNumInputChange(e, setterFunction) {
    const value = e.target.value;
    if (value === "") {
      setterFunction("");
    } else if (!isNaN(value)) {
      const parsedValue = parseFloat(value);
      setterFunction(parsedValue);
    } else {
      setterFunction("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      comm === null ||
      comm === undefined ||
      comm === "" ||
      price === null ||
      price === undefined ||
      price === "" ||
      splitNum === null ||
      splitNum === undefined ||
      name === null ||
      name === undefined ||
      name === ""
    ) {
      return;
    }

    const parsedPrice = parseFloat(price);
    const parsedSplitNum = parseFloat(splitNum);
    const commAsNumber = parseFloat(comm);

    const id = uuid();
    const commDivide = parsedSplitNum + 1;

    const newItem = {
      id,
      name,
      price: parsedPrice,
      splitNum: parsedSplitNum,
      commissionEarned: parsedSplitNum > 0 ? (parsedPrice * commAsNumber) / commDivide : parsedPrice * commAsNumber,
    };

    dispatch({ type: "addItem", payload: newItem });
    setName("");
    setPrice("");
    setSplitNum(0);
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
              value={price === "" ? "" : price}
              onChange={(e) => handleNumInputChange(e, setPrice)}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="split" className="col-sm-5 col-form-label">
            Number of splits
          </label>
          <div className="col-sm-4">
            <input
              id="split"
              className="form-control"
              type="text"
              value={splitNum}
              onChange={(e) => handleNumInputChange(e, setSplitNum)}
            />
          </div>
        </div>

        <button className="btn btn-outline-primary">Submit</button>
      </form>
    </div>
  );
}

export default AddSale;
