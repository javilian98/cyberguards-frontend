import Sidebar from "@/components/Layouts/Sidebar/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "@/pages/Home";
import Threats from "@/pages/Threats";
import Users from "@/pages/Users";
import Cases from "@/pages/Cases";
import Sign from "@/pages/Sign";

function App() {
  const location = useLocation(); // This hook gives you access to the location object
  const showSidebar = location.pathname !== '/'; // Check if we're not on the sign-in page (which is the root)
  return (
    <>
      <div className={`flex ${!showSidebar && 'justify-center'}`}> {/* Center the content if there's no sidebar */}
        {showSidebar && <Sidebar />} {/* Render the Sidebar only if showSidebar is true */}
        <div className="py-4 px-3 w-full">
          <Routes>
            <Route path="/" element={<Sign />} />
            {/* Other routes remain the same */}
            <Route path="/home" element={<Home />} />
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
