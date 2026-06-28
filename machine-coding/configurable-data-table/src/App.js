import logo from './logo.svg';
import './App.css';
import DataTable from './Datatable';
import { columns,data } from "./utils";
import AutoComplete from './AutoComplete';
const users = [
  { id: 1, name: "Rahul Sharma" },
  { id: 2, name: "Priya Mehta" },
  { id: 3, name: "Aman Verma" },
  { id: 4, name: "Neha Singh" },
  { id: 5, name: "Karan Gupta" },
];

function App() {
  return (
    <div className="App">
    {/* <DataTable columns = {columns} data = {data}/> */}
    <AutoComplete users={users}/>
    </div>
  );
}

export default App;
