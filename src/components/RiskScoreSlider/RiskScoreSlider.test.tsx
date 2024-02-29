import RiskScoreSlider from "@/components/RiskScoreSlider/RiskScoreSlider";
import { render, screen, fireEvent, waitFor } from "@/utils/test-utils";

vi.mock("@/components/ui/slider", () => ({
    Slider: vi.fn((props) => (
      <input
        type="range"
        value={props.value[0]} 
      onChange={(e) => props.onValueChange([parseInt(e.target.value)])}
      />
    )),
  }));
  
  describe("RiskScoreSlider Component", () => {
    it("renders with default value", () => {
      const defaultValue = 50;
      const handleValueChange = vi.fn();
      render(
        <RiskScoreSlider defaultValue={[50]} handleValueChange={handleValueChange} />
      );
  
      const riskScoreLabel = screen.getByText(/Risk Score/i);
      expect(riskScoreLabel).toBeInTheDocument();
  
      const riskValue = screen.getByText(`${defaultValue} %`);
      expect(riskValue).toBeInTheDocument();
    });
  
    it("updates value when slider is changed", async () => {
        const handleValueChange = vi.fn().mockResolvedValue(undefined); 
        render(<RiskScoreSlider defaultValue={[50]} handleValueChange={handleValueChange} />);
    
        const slider = screen.getByRole("slider");
        fireEvent.change(slider, { target: { value: 40 } });
        await waitFor(() => {
            expect(handleValueChange).toHaveBeenCalledWith([40]);
    });
  });
});