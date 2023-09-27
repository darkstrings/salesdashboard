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
export default Fixed;
