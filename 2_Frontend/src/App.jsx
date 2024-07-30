import { Outlet } from "react-router-dom";
import "./App.css";
import Header from './Components/HeaderComponents/Header/Header'
import Footer from './Components/Footer/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
