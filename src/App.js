import React from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Root from './components/Root'; /*main wrapper component*/
import { GoalProvider } from './context/GoalContext'; /*context provider for managing goals*/

import GoalForm from './components/GoalForm';
import GoalItem from './components/GoalItem';
import LearningList from './components/LearningList';
import ListContainer from './components/ListContainer';

import './App.css';

const router = createBrowserRouter(createRoutesFromElements( /*createRoutesFromElements - helper function to define the routes*/
  <Route path="/" element={<Root />}> {/* "/" will display the Root component */}
    <Route path="/goal-form" element={<GoalForm />} />
    <Route path="/goal-item" element={<GoalItem />} />
    <Route path="/list-container" element={<ListContainer />} />
    <Route path="/learning-list" element={<LearningList />} />
  </Route>
));

function App() {
  return (
    /* GoalProvider wraps the entire app, making GoalContext available 
    to child components (e.g. GoalForm, LearningList)
     to modify the goal state or needs access */
            <GoalProvider>
                <RouterProvider router={router} /> {/* RouterProvider renders router & controls navigation between diff views */}
                <h1>Learning Dashboard</h1>
                <ListContainer />
                <LearningList />
        </GoalProvider>
  );
}

export default App;
