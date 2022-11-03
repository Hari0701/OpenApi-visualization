import data from "./data.json";
import PieChart from "./components/PieChart";
function App() {
  return (
    <div>
      <PieChart paths={data.paths} components={data.components} />
    </div>
  );
}

export default App;
