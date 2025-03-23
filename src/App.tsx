import './App.css';
import Leftsection from './components/Leftsection';
import Rightsection from './components/Rightsection';

function App() {
  return (
    <div className="App" >
      <div className='mainpage'>
      <div className='left'>
        <Leftsection />
      </div>
      <div className='right' > 
        <Rightsection />
      </div>
    </div>
    </div>
  );
}

export default App;
