import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Calculator from './businessTools/Calculator/Calculator';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/calculator" element={<Calculator />} />
    </Routes>
  </Router>
);

export default App;
