function Totals({ hourly, hours, commTotalEarned }) {
  return (
    <div className="totals container comp">
      <h2>Totals</h2>
      <p>
        Your total commission earned is <span className="num-display">${commTotalEarned}</span>
      </p>
      <p>
        Your total from your hourly is <span className="num-display">${hourly * hours}</span>
      </p>
      <p>
        Your grand total is <span className="num-display">${hourly * hours + commTotalEarned}</span>
      </p>
    </div>
  );
}

export default Totals;
