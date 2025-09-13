import React from "react";
import "./NumerologyBackground.css";

const NumerologyBackground: React.FC = () => {
  return (
    <div className="numerology-background">
      {/* Background numérologique avec chiffres */}
      <div className="numerology-bg">
        <div className="numerology-pattern numerology-large">1</div>
        <div className="numerology-pattern numerology-medium">7</div>
        <div className="numerology-pattern numerology-small">3</div>
        <div className="numerology-pattern numerology-large numerology-rotated">
          9
        </div>
        <div className="numerology-pattern numerology-medium numerology-tilted">
          5
        </div>
        <div className="numerology-pattern numerology-small numerology-rotated">
          2
        </div>
        <div className="numerology-pattern numerology-medium numerology-tilted">
          8
        </div>
        <div className="numerology-pattern numerology-small">1</div>
        <div className="numerology-pattern numerology-large numerology-rotated">
          6
        </div>
        <div className="numerology-pattern numerology-medium numerology-tilted">
          7
        </div>
        <div className="numerology-pattern numerology-small numerology-rotated">
          1
        </div>
        <div className="numerology-pattern numerology-medium">3</div>
        <div className="numerology-pattern numerology-small numerology-tilted">
          7
        </div>
        <div className="numerology-pattern numerology-large numerology-rotated">
          5
        </div>
        <div className="numerology-pattern numerology-medium numerology-tilted">
          9
        </div>
        <div className="numerology-pattern numerology-small">2</div>
        <div className="numerology-pattern numerology-large numerology-rotated">
          1
        </div>
        <div className="numerology-pattern numerology-medium numerology-tilted">
          8
        </div>
        <div className="numerology-pattern numerology-small numerology-rotated">
          6
        </div>
        <div className="numerology-pattern numerology-medium">3</div>
      </div>
    </div>
  );
};

export default NumerologyBackground;
