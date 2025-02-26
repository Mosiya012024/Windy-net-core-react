import React from 'react';
import './App.css';
import Home from './components/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleAPI from './components/GoogleAPI';
import ErrorBoundary from './shared/ErrorBoundary';

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <ErrorBoundary>
        <Home/>
      </ErrorBoundary>
      {/* <GoogleAPI></GoogleAPI> */}
    </div>
  );
}

export default App;
