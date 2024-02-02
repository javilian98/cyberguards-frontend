import Sidebar from "@/components/Layouts/Sidebar/Sidebar";
import Home from "@/pages/Home";
import Threats from "@/pages/Threats";
import { render, screen, userEvent } from "@/utils/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Unit Testing on Sidebar.tsx", () => {
  it("should navigate to the correct page when link is clicked", async () => {
    // ARRANGE
    render(
      <>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/threats" element={<Threats />} />
          </Routes>
          <Sidebar />
        </MemoryRouter>
      </>
    );

    //ACT
    const linkThreats = screen.getByRole("link", { name: /threats/i });
    const textThreats = await screen.findByText("Threats");
    userEvent.click(linkThreats);

    // ASSERT
    expect(textThreats).toBeInTheDocument();
  });
});
