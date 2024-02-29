import FixedHeader from "@/components/Layouts/Header/FixedHeader";
import { render } from "@/utils/test-utils";

it('renders children correctly', () => {
    const { getByText } = render(
      <FixedHeader>
        <span>Child Element</span>
      </FixedHeader>
    );
  
    const childElement = getByText('Child Element');
    expect(childElement).toBeInTheDocument();
  });