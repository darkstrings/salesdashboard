function Fixed({ comm, hourly, hours, dispatch }) {
  return (
    <div className="fixed-form container comp">
      <h2>Fixed Amounts</h2>
      <div className="form-group row">
        <label htmlFor="commissionRate" className="col-sm-5 col-form-label">
          Commission Rate
        </label>
        <div className="col-sm-4">
          <input
            id="commissionRate"
            className="form-control"
            type="text"
            value={comm}
            onChange={(e) => {
              dispatch({ type: "commRate", payload: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="hourlyWage" className="col-sm-5 col-form-label">
          Hourly Wage
        </label>
        <div className="col-sm-4">
          <input
            id="hourlyWage"
            className="form-control"
            type="text"
            value={hourly}
            onChange={(e) => {
              dispatch({ type: "hourly", payload: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="hoursWorked" className="col-sm-5 col-form-label">
          Hours worked
        </label>
        <div className="col-sm-4">
          <input
            id="hoursWorked"
            className="form-control"
            type="text"
            value={hours}
            onChange={(e) => {
              dispatch({ type: "hours", payload: e.target.value });
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default Fixed;
