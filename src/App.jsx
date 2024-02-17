import "./App.css";
import Header from "./components/Header/Header.jsx";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar.jsx";

function App() {
  return (
    <>
      <Header />
      <div className="flex flex-row">
        <div className="w-1/5 border-r border-gray-200 overflow-y-auto">
          {" "}
          {/* Adjusted width for the sidebar */}
          <Sidebar />
        </div>

        <div className="w-4/5 border-r border-gray-200 overflow-y-auto">
          {" "}
          {/* Adjusted width for the content area */}
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
