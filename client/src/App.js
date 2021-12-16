// import logo from './logo.svg';
import './App.css';

import Responsivedrawer from './components/drawers/Responsivedrawer'

import Main from './pages/Main'

function App() {
  return (
    <>
      <Responsivedrawer>
        <Main />
      </Responsivedrawer>
    </>
  );
}

export default App;
