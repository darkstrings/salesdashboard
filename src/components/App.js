import { useState } from "react";

import "../../src/App.css";
import Fixed from "./Fixed";
import AddSale from "./AddSale";
import Totals from "./Totals";
import DisplaySales from "./DisplaySales";

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
        <div className="col-lg-12 text-center card">
          <h1 className="banner">Sales Dashboard</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 forms-col">
          <div className="d-flex flex-column">
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
          <div className="card display-sales">
            <DisplaySales setSoldItems={setSoldItems} soldItems={items} onDelete={handleDeleteItem} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
