import { useEffect, useState } from "react";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

type SliderProps = React.ComponentProps<typeof Slider>;

interface RiskScoreSliderProps {
  defaultValue: SliderProps["defaultValue"];
  handleValueChange: (value: number) => void;
}

function RiskScoreSlider({
  defaultValue,
  handleValueChange,
}: RiskScoreSliderProps) {
  const [value, setValue] = useState(defaultValue);

  // update the value on component mount when defaultValue changes
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const renderRiskValueColor = () => {
    const valueNum = value?.[0];
    switch (valueNum) {
      case 0:
      case 10:
      case 20:
      case 30:
        return "text-green-600";
      case 40:
      case 50:
      case 60:
        return "text-yellow-500";
      case 70:
      case 80:
      case 90:
      case 100:
        return "text-red-600";
      default:
        return "text-green-600";
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Label htmlFor="riskScore">Risk Score</Label>
        <div className="flex items-center gap-2">
          <span className={`font-semibold ${renderRiskValueColor()}`}>
            {value} %
          </span>
        </div>
      </div>
      <Slider
        id="riskScore"
        max={100}
        defaultValue={value}
        value={value}
        step={10}
        onValueChange={(value) => {
          setValue(value);
          handleValueChange(value as unknown as number);
        }}
        className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
        aria-label="Risk Score"
      />
    </>
  );
}

export default RiskScoreSlider;
