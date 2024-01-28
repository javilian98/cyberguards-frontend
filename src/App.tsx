import Sidebar from "@/components/Layouts/Sidebar";

function App() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="py-4 px-3">Main Content Area</div>
      </div>
    </>
  );
}

export default App;
