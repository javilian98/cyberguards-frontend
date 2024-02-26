import Sidebar from "@/components/Layouts/Sidebar";
import Home from "@/pages/Home";
import Threats from "@/pages/Threats";
import Users from "@/pages/Users";
import Cases from "@/pages/Cases";
import { render, screen, userEvent } from "@/utils/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Unit Testing on Sidebar.tsx", () => {
  it("should navigate to Home page when Home link is clicked", async () => {
    render(
      <>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/threats" element={<Threats />} />
            <Route path="/users" element={<Users />} />
            <Route path="/cases" element={<Cases />} />
          </Routes>
          <Sidebar />
        </MemoryRouter>
      </>
    );

    userEvent.click(screen.getByRole("link", { name: /home/i }));
    await screen.findByText("Home");
  });

  it("should navigate to Threats page when Threats link is clicked", async () => {
    render(
      <>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/threats" element={<Threats />} />
            <Route path="/users" element={<Users />} />
            <Route path="/cases" element={<Cases />} />
          </Routes>
          <Sidebar />
        </MemoryRouter>
      </>
    );

    userEvent.click(screen.getByRole("link", { name: /threats/i }));
    await screen.findByText("Home");
  });

  it("should navigate to Users page when Users link is clicked", async () => {
    render(
      <>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/threats" element={<Threats />} />
            <Route path="/users" element={<Users />} />
            <Route path="/cases" element={<Cases />} />
          </Routes>
          <Sidebar />
        </MemoryRouter>
      </>
    );

    userEvent.click(screen.getByRole("link", { name: /users/i }));
    await screen.findByText("Home");
  });

  it("should navigate to Cases page when Cases link is clicked", async () => {
    render(
      <>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/threats" element={<Threats />} />
            <Route path="/users" element={<Users />} />
            <Route path="/cases" element={<Cases />} />
          </Routes>
          <Sidebar />
        </MemoryRouter>
      </>
    );

    userEvent.click(screen.getByRole("link", { name: /cases/i }));
    await screen.findByText("Home");
  });
});
