import AvatarMenu from "@/components/AvatarMenu/AvatarMenu";
import { render, screen } from "@/utils/test-utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

describe("Unit Testing on AvatarMenu.tsx", () => {
  it("should display correct display picture when URL is provided", () => {
    // Create a new QueryClient instance
    const queryClient = new QueryClient();

    // ARRANGE
    const name = "John Doe";
    const imgSrc = "https://github.com/shadcn.png";
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AvatarMenu name={name} imgSrc={imgSrc} />
        </QueryClientProvider>
      </BrowserRouter>
    );

    // ACT
    const avatarImage = screen.getByRole("img", {
      name,
    }) as HTMLImageElement;

    // ASSERT
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute("src", imgSrc);
  });

  it("should display correct initials when no display picture URL is provided", () => {
    // Create a new QueryClient instance
    const queryClient = new QueryClient();

    // ARRANGE
    const name = "John Doe";

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AvatarMenu name={name} imgSrc="" />
        </QueryClientProvider>
      </BrowserRouter>
    );

    // ASSERT
    const avatarInitials = screen.getByText(name);
    expect(avatarInitials).toBeInTheDocument();
  });
});
