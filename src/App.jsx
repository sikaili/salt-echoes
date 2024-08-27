import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Experiment from './pages/Experiment/Experiment';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/experiment" element={<Experiment />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
