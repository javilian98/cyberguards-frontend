import Sidebar from "@/components/Layouts/Sidebar/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "@/pages/Home";
import Threats from "@/pages/Threats";
import Users from "@/pages/Users";
import Cases from "@/pages/Cases";
import UserDetail from "./pages/UserDetail";
import Sign from "@/pages/Sign";
import PrivateRoutes from "./utils/PrivateRoutes";
import CreateEditCase from "./pages/CreateEditCase";
import { Toaster } from "sonner";
import CreateEditUser from "./pages/CreateEditUser";
import ThreatDetail from "./pages/ThreatDetail";

function App() {
  const location = useLocation(); // This hook gives you access to the location object
  const showSidebar = location.pathname !== "/login"; // Check if we're not on the sign-in page (which is the root)
  return (
    <>
      <Toaster richColors position="top-right" closeButton />
      {/* Center the content if there's no sidebar */}
      <div className={`flex ${!showSidebar && "justify-center"}`}>
        {/* Render the Sidebar only if showSidebar is true */}
        {showSidebar && <Sidebar />}
        <div className={`py-4 px-3 w-full ${showSidebar && "ml-[300px]"}`}>
          <Routes>
            <Route path="/login" element={<Sign />} />
            {/* Other routes remain the same */}
            <Route element={<PrivateRoutes />}>
              <Route index path="/" element={<Home />} />
              {/* <Route path="/threats" element={<Threats />} /> */}
              <Route path="threats">
                <Route index element={<Threats />} />
                <Route
                  path="employee/:employeeid/:logtype"
                  element={<ThreatDetail />}
                />
                <Route
                  path="employee/:employeeid/:logtype/:logid"
                  element={<ThreatDetail />}
                />
              </Route>
              <Route path="users">
                <Route index element={<Users />} />
                <Route path=":id" element={<UserDetail />} />
                <Route path="create" element={<CreateEditUser />} />
                <Route path="edit/:id" element={<CreateEditUser />} />
              </Route>
              <Route path="cases">
                <Route index element={<Cases />} />
                <Route path="create" element={<CreateEditCase />} />
                <Route path=":id" element={<CreateEditCase />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
