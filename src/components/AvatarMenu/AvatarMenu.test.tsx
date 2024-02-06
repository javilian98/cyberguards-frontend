import AvatarMenu from "@/components/AvatarMenu/AvatarMenu";
import { render, screen } from "@/utils/test-utils";

describe("Unit Testing on AvatarMenu.tsx", () => {
  it("should display correct display picture when URL is provided", () => {
    // ARRANGE
    const name = "John Doe";
    const imgSrc = "https://github.com/shadcn.png";
    render(<AvatarMenu name={name} imgSrc={imgSrc} />);

    // ACT
    const avatarImage = screen.getByRole("img", {
      name,
    }) as HTMLImageElement;

    // ASSERT
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute("src", imgSrc);
  });

  it("should display correct initials when no display picture URL is provided", () => {
    // ARRANGE
    const name = "John Doe";

    render(<AvatarMenu name={name} imgSrc="" />);

    // ASSERT
    const avatarInitials = screen.getByText(name);
    expect(avatarInitials).toBeInTheDocument();
  });
});