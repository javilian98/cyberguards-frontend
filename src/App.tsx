import Sidebar from "@/components/Layouts/Sidebar/Sidebar";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Threats from "@/pages/Threats";
import Users from "@/pages/Users";
import Cases from "@/pages/Cases";
import CreateEditCase from "./pages/CreateEditCase";

function App() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="py-4 px-3 w-full ml-[300px]">
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="threats" element={<Threats />} />
            <Route path="users" element={<Users />} />
            <Route path="cases">
              <Route index element={<Cases />} />
              <Route path="create" element={<CreateEditCase />} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
