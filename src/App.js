import React from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Root from './components/Root';
import { GoalProvider } from './context/GoalContext';
import GoalForm from './components/GoalForm';
import GoalItem from './components/GoalItem';
import LearningList from './components/LearningList';

import './App.css';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root />}>
    <Route path="/goal-form" element={<GoalForm />} />
    <Route path="/goal-item" element={<GoalItem />} />
    <Route path="/learning-list" element={<LearningList />} />
  </Route>
));

function App() {
  return (
    <GoalProvider>
      <div>
        <RouterProvider router={router} />
        <GoalForm />
        <LearningList />
        <GoalItem />
      </div>
    </GoalProvider>
  );
}

export default App;
