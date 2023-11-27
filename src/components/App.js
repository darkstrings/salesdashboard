import { useReducer } from "react";

import "../../src/App.css";
import Fixed from "./Fixed";
import AddSale from "./AddSale";
import Totals from "./Totals";
import DisplaySales from "./DisplaySales";

const initialState = {
  soldItems: [],
  comm: "",
  hourly: 0,
  hours: 0,
  commTotalEarned: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "commRate":
      let value = action.payload;
      if (/^\d+$/.test(value)) {
        value = parseFloat("0." + value);
      }
      return { ...state, comm: value };

    case "hourly":
      if (action.payload === "") {
        return { ...state };
      } else if (!isNaN(action.payload)) {
        const value = parseFloat(action.payload);

        return { ...state, hourly: value };
      } else {
        return { ...state };
      }
    case "hours":
      if (action.payload === "") {
        return { ...state };
      } else if (!isNaN(action.payload)) {
        const value = parseFloat(action.payload);

        return { ...state, hours: value };
      } else {
        return { ...state };
      }

    case "addItem":
      return {
        ...state,
        commTotalEarned: state.commTotalEarned + action.payload.commissionEarned,
        soldItems: [
          ...state.soldItems,
          {
            id: action.payload.id,
            name: action.payload.name,
            price: action.payload.price,
            splitNum: action.payload.splitNum,
            commissionEarned: action.payload.commissionEarned,
          },
        ],
      };
    case "deleteItem":
      return {
        ...state,
        commTotalEarned: state.commTotalEarned - action.payload.commissionEarned,
        soldItems: [...state.soldItems.filter((item) => action.payload.id !== item.id)],
      };

    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{ soldItems, comm, hourly, hours, commTotalEarned }, dispatch] = useReducer(reducer, initialState);

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
              <Fixed dispatch={dispatch} comm={comm} />
            </div>
            <div className="card">
              <AddSale dispatch={dispatch} comm={comm} />
            </div>
            <div className="card">
              <Totals hourly={hourly} hours={hours} commTotalEarned={commTotalEarned} />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card display-sales">
            <DisplaySales dispatch={dispatch} soldItems={soldItems} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
