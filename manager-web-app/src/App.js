import "./App.css";
import Home from "./components/home/Home";
import NavBar from "./components/navbar/NavBar";
import AddData from "./components/addData/AddData";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="w-auto ml-6 mr-6 flex justify-center">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/add" element={<AddData/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
