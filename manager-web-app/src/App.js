import "./App.css";
import Home from "./components/home/Home";
import NavBar from "./components/navbar/NavBar";
import { BrowserRouter , Route , Routes} from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
        <Route exact path="/" element={<Home/>}></Route>
</Routes>
        {/* <nav className="flex items-center justify-between flex-wrap bg-lime-700 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">
            Your App Name
          </span>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v15z" />
            </svg>
          </button>
        </div>
      </nav>
      <div
        className={`fixed bg-lime-700 top-0 right-0 h-full w-64 z-20 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-200 ease-in-out lg:hidden`}
      >
        <div className="text-base">
          <div className="w-full flex">
            <img src="./close.svg" alt="" />
          </div>
          <a
            href="#responsive-header"
            className="block mt-4 text-teal-200 hover:text-white mr-4"
          >
            Docs
          </a>
          <a
            href="#responsive-header"
            className="block mt-4 text-teal-200 hover:text-white mr-4"
          >
            Examples
          </a>
          <a
            href="#responsive-header"
            className="block mt-4 text-teal-200 hover:text-white"
          >
            Blog
          </a>
        </div>
      </div> */}
        {/* <nav className="flex h-24 bg-lime-700">
          <div className="flex flex-row items-center justify-between text-center">
            <div className="ml-5 mr-8">
              <img src={"./logo192.png"} className="size-20" alt="logo" />
            </div>
            <div className="text-white w-28 text-xl font-bold">
              <a>Home</a>
            </div>
            <div className="text-white w-28 text-xl font-medium">
              Add
            </div>
            <div className="text-white w-28 text-xl font-medium">
              View
            </div>
            <div className="text-white w-28 text-xl font-medium">
              Edit
            </div>
          </div>
        </nav> */}
      </BrowserRouter>
    </>
  );
}

export default App;
