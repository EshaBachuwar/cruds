import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Form from './pages/form/Form';
import Home from './pages/home/Home';

function App() {
  return (
    <div className="App bg-cyan-950 m-0 min-h-screen">
      <Router>
        <Routes>
          <Route path='/' element={<Form/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
