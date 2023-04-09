import logo from './logo.svg';
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import { Dashboard } from './Pages/Dashboard';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Dashboard/>
    </div>
  );
}

export default App;
