import React from "react";

interface RippleProps {
  color: string;
}

const Ripple: React.FC<RippleProps> = ({ color }) => {
  return (
    <div className="ripple-container">
      <div className="ripple-container">
        <div className="dot" style={{ backgroundColor: color }}></div>
        <div className="ripple ripple1" style={{ borderColor: color }}></div>
        <div className="ripple ripple2" style={{ borderColor: color }}></div>
      </div>
    </div>
  );
};

export default Ripple;
