function Totals({ hourly, hours, commTotalEarned }) {
  return (
    <div className="totals container comp">
      <h2>Totals</h2>
      <p>
        Your total commission earned is <span className="total-comm">${commTotalEarned}</span>
      </p>
      <p>
        Your total from your hourly is <span className="total-hourly">${hourly * hours}</span>
      </p>
      <p>
        Your grand total is <span className="total-grand">${hourly * hours + commTotalEarned}</span>
      </p>
    </div>
  );
}

export default Totals;
