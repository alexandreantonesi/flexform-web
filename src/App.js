import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import ExercisePage from './components/ExercisePage';
import ExerciseStartPage from './components/ExerciseStartPage'; // Make sure this component exists
import AnatomyPage from './components/AnatomyPage';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<ExercisePage />} />
          <Route path="/exercicios" element={<ExercisePage />} />
          <Route path="/anatomia" element={<AnatomyPage />} />
          <Route path="/start-exercise" element={<ExerciseStartPage />} /> {/* This line is new */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
