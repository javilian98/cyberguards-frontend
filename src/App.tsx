import Sidebar from "@/components/Layouts/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Threats from "@/pages/Threats";
import Users from "@/pages/Users";
import Cases from "@/pages/Cases";

function App() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="py-4 px-3 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/threats" element={<Threats />} />
            <Route path="/users" element={<Users />} />
            <Route path="/cases" element={<Cases />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
