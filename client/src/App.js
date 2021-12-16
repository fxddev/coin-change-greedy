// import logo from './logo.svg';
import './App.css';

import PersistentDrawerLeft from './components/drawers/PersistentDrawerLeft'

import Main from './pages/Main'

function App() {
  return (
    <>
      <PersistentDrawerLeft>
        <Main />
      </PersistentDrawerLeft>
    </>
  );
}

export default App;
