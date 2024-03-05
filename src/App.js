import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import ExercisePage from './components/ExercisePage';
import AnatomyPage from './components/AnatomyPage';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route exact path="/" element={<ExercisePage />} />
          <Route path="/exercicios" element={<ExercisePage />} />
          <Route path="/anatomia" element={<AnatomyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
