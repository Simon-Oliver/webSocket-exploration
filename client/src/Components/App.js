import React from 'react';
import './App.css';
import AddOrder from './Order/AddOrder';
import ItemSelection from './Order/ItemSelection';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ItemSelection></ItemSelection>
        <AddOrder></AddOrder>
      </header>
    </div>
  );
}

export default App;
