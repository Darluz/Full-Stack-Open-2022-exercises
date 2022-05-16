import { useState } from "react";

const Display = ({ text }) => <h2>{text}</h2>;

const setHandler = (setter, newValue) => () => setter(newValue);

const Button = ({ handler, text }) => (
  <button onClick={handler}> {text} </button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ data, value, condition }) => {
  if (condition == 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text={data[0]} value={value[0]} />
          <StatisticLine text={data[1]} value={value[1]} />
          <StatisticLine text={data[2]} value={value[2]} />
          <StatisticLine text={data[3]} value={value[3]} />
          <StatisticLine text={data[4]} value={value[4]} />
          <StatisticLine text={data[5]} value={value[5] + " %"} />
        </tbody>
      </table>
    );
  }
};

const App = () => {
  const name = ["good", "neutral", "bad"];
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  let all = good + neutral + bad;
  let score = good + bad * -1;
  let average = all == 0 ? 0 : score / all;
  let positive = all == 0 ? 0 : good / all;

  return (
    <div>
      <Display text={"give feedback"} />
      <Button handler={setHandler(setGood, good + 1)} text={name[0]} />
      <Button handler={setHandler(setNeutral, neutral + 1)} text={name[1]} />
      <Button handler={setHandler(setBad, bad + 1)} text={name[2]} />
      <Display text={"statistics"} />
      <Statistics
        data={[name[0], name[1], name[2], "all", "average", "positive"]}
        value={[good, neutral, bad, all, average, positive]}
        condition={all}
      />
    </div>
  );
};

export default App;
