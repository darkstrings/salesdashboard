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

export default Totals;
