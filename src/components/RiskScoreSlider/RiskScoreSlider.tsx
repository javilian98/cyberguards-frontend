import { useState } from "react";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

type SliderProps = React.ComponentProps<typeof Slider>;

interface RiskScoreSliderProps {
  defaultValue: SliderProps["defaultValue"];
}

function RiskScoreSlider({ defaultValue }: RiskScoreSliderProps) {
  const [value, setValue] = useState(defaultValue);

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
        <Label htmlFor="email">Risk Score</Label>
        <div className="flex items-center gap-2">
          <span className={`font-semibold ${renderRiskValueColor()}`}>
            {value} %
          </span>
        </div>
      </div>
      <Slider
        max={100}
        defaultValue={value}
        step={10}
        onValueChange={setValue}
        className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
        aria-label="Risk Score"
      />
    </>
  );
}

export default RiskScoreSlider;
