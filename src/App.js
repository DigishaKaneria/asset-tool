import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TagsDashboard from './components/TagsDashboard';
import TagDetails from './components/TagDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TagsDashboard />} />
        <Route path="/tags/:tagName" element={<TagDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
