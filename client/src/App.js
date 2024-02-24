import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
/*In React Router v6, the Switch component has been replaced by the Routes component*/
import './styles/globals.css';

import Header from './components/Header';
//import MainButtons from './components/MainButtons';
import Preferences from './components/Preferences';
//import Recommendations from './components/Recommendations';
import Feedback from './components/Feedback';

function App() {
  return (
    <Router>
      <div className='App'>
      <Header />
        <Routes>
          <Route path="/" element={<Preferences />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
