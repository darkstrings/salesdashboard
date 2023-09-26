import { useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";

const soldItems = [];

function App() {
  const [items, setSoldItems] = useState(soldItems);
  const [comm, setComm] = useState("");
  const [hourly, setHourly] = useState("");
  const [hours, setHours] = useState("");
  const [commTotalEarned, setCommTotalEarned] = useState(0);

  function handleAddItem(newItem) {
    setSoldItems((soldItems) => [...soldItems, newItem]);
  }

  function handleNumInputChange(e, setterFunction) {
    if (e.target.value === "") {
      setterFunction("");
    } else if (!isNaN(e.target.value)) {
      const value = parseFloat(e.target.value);
      setterFunction(value);
    } else {
      setterFunction("");
    }
  }

  function handleCommissionChange(e) {
    let value = e.target.value;
    if (/^\d+$/.test(value)) {
      value = parseFloat("0." + value);
    }

    setComm(value);
  }
  function handleDeleteItem(itemToDelete) {
    setCommTotalEarned(commTotalEarned - itemToDelete.commissionEarned);
    setSoldItems((items) => items.filter((item) => itemToDelete.id !== item.id));
  }

  return (
    <div className="App container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h1>Sales Dashboard</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="d-flex flex-column w-100 h-100">
            <div className="card">
              <Fixed
                onNumInputChange={handleNumInputChange}
                setComm={setComm}
                onCommChange={handleCommissionChange}
                comm={comm}
                setHourly={setHourly}
                hourly={hourly}
                setHours={setHours}
                hours={hours}
              />
            </div>
            <div className="card">
              <AddSale
                onNumInputChange={handleNumInputChange}
                onAddItem={handleAddItem}
                comm={comm}
                setComm={setComm}
                commTotalEarned={commTotalEarned}
                setCommTotalEarned={setCommTotalEarned}
              />
            </div>
            <div className="card">
              <Totals hourly={hourly} hours={hours} commTotalEarned={commTotalEarned} />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card h-100 w-100 display-sales">
            <DisplaySales setSoldItems={setSoldItems} soldItems={items} onDelete={handleDeleteItem} />
          </div>
        </div>
      </div>
    </div>
  );
}

////////////////////////////////FIXED VALUES

function Fixed({ onCommChange, comm, setHourly, hourly, setHours, hours, onNumInputChange }) {
  return (
    <div className="fixed-form container comp">
      <h2>Fixed Amounts</h2>
      <div className="form-group row">
        <label htmlFor="commissionRate" className="col-sm-5 col-form-label">
          Commission Rate
        </label>
        <div className="col-sm-4">
          <input id="commissionRate" className="form-control" type="text" value={comm} onChange={(e) => onCommChange(e)} />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="hourlyWage" className="col-sm-5 col-form-label">
          Hourly Wage
        </label>
        <div className="col-sm-4">
          <input id="hourlyWage" className="form-control" type="text" value={hourly} onChange={(e) => onNumInputChange(e, setHourly)} />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="hoursWorked" className="col-sm-5 col-form-label">
          Hours worked
        </label>
        <div className="col-sm-4">
          <input id="hoursWorked" className="form-control" type="text" value={hours} onChange={(e) => onNumInputChange(e, setHours)} />
        </div>
      </div>
    </div>
  );
}

////////////////////////////ADD SALE FORM

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

        <button className="btn btn-outline-secondary">Submit</button>
      </form>
    </div>
  );
}
/////////////////////DISPLAY SALES

function DisplaySales({ soldItems, onDelete }) {
  return (
    <div className="container comp w-100">
      <h2>Sold Items</h2>

      {soldItems.map((item) => (
        <Item className="sold-item card w-100" key={item.id} item={item} onDelete={() => onDelete(item)} />
      ))}
    </div>
  );
}

////////////////////////////ITEM

function Item({ item, onDelete }) {
  return (
    <div className="container comp">
      <hr />
      <ul className="sold-list" key={item.id}>
        <li>Item: {item.name}</li>
        <li>Item price: ${item.price}</li>
        <li>{item.splitNum > 0 ? `Split between ${item.splitNum + 1} people` : ""}</li>
        <li>You made ${item.commissionEarned} from that sale</li>

        <button type="button" className="btn btn-danger" onClick={() => onDelete(item)}>
          Delete
        </button>
      </ul>
      <hr />
    </div>
  );
}
/////////////////////////TOTALS

function Totals({ hourly, hours, commTotalEarned }) {
  return (
    <div className="totals container comp">
      <h2>Totals</h2>
      <p>Your total commission earned this week is ${commTotalEarned}</p>
      <p>Your total from your hourly for this week is ${hourly * hours}</p>
      <p>Your total for this week is ${hourly * hours + commTotalEarned} </p>
    </div>
  );
}

export default App;

/* 
Make sold items look better
Make overall look better
break modules into separate files
add scroll on sold items when overflowing
logo
*/
