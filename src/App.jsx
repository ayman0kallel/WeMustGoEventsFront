
// import { BrowserRouter as Router} from "react-router-dom"

import { Footer, Events, Carte, Header } from './containers';
import { Navbar } from './components';

import './App.css';

function App() {

  return (
    <div className="App">
        <div className="gradient__bg">
            <Navbar />
            <Header />
        </div>
        <Events />
        <Carte />
        <Footer />
    </div>
  )
}

export default App
