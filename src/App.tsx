import React from 'react';
import './App.css';
// import Signup from './components/Signup';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/" element={<Signup />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// }

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

