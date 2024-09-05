import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TagsDashboard from './components/TagsDashboard';
import ComponentDetail from './components/ComponentDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TagsDashboard />} />
        <Route path="/component/:name" element={<ComponentDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
