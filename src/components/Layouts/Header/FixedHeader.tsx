import { ReactNode } from "react";

interface FixedHeaderProps {
  children: ReactNode;
}

function FixedHeader({ children }: FixedHeaderProps) {
  return (
    <div className="fixed flex gap-2 bg-white w-[calc(100%-300px)] h-fit z-10 -ml-3 -mt-4 pt-4 pb-2 px-3 border-b">
      {children}
    </div>
  );
}

export default FixedHeader;
