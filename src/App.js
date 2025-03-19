import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Root from './components/Root'; /* Main wrapper component */
import { GoalProvider } from './context/GoalContext'; /* Context provider for managing goals */

import GoalForm from './components/GoalForm';
import GoalItem from './components/GoalItem';
import LearningList from './components/LearningList';
import ListContainer from './components/ListContainer';

import './App.css';

function App() {
  return (
    <GoalProvider>
      <HashRouter>
        <Root />
        <Routes>
          <Route path="/" element={<ListContainer />} />
          <Route path="/goal-form" element={<GoalForm />} />
          <Route path="/goal-item" element={<GoalItem />} />
          <Route path="/learning-list" element={<LearningList />} />
        </Routes>
      </HashRouter>
    </GoalProvider>
  );
}

export default App;
