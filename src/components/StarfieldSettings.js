import React from "react";
import { useSpring, animated, config } from "react-spring";

function StarfieldSettings({
  newSettings,
  handleChange,
  handleSubmit,
  handleCancel,
  handleClose,
  isOpen
}) {
  const starfieldSettingsSpring = useSpring({
    from: { transform: "translateX(0px)" },
    transform: isOpen ? "translateX(0px)" : "translateX(800px)",
    config: isOpen ? {tension: 50, friction: 15} : {tension: 20, friction: 10}
  });

  const handleOffButton = ev => {
    ev.preventDefault();
    handleClose();
  };

  return (
    <animated.div className="starfield-form-outer-box" style={starfieldSettingsSpring}>
      <button className="form-off-button" onClick={handleOffButton}>
        {">"}
      </button>
      <form className="starfield-form">
        <div className="input-box">
          <label title="Sets the total amount of particles. (Higher numbers may decrease performance.)">
            Total Particles
            <input
              type="range"
              name="totalParticles"
              min={1}
              max={500}
              value={newSettings.totalParticles}
              onChange={handleChange}
            />
          </label>
          <label title="Sets the base particle color.">
            Color
            <input
              type="range"
              name="hue"
              max={255}
              step={1}
              value={newSettings.hue}
              onChange={handleChange}
            />
          </label>
          <label title="Sets the range of particle colors. (Turn to max for rainbow.)">
            Color Variance
            <input
              type="range"
              name="hueVariance"
              max={255}
              step={1}
              value={newSettings.hueVariance}
              onChange={handleChange}
            />
          </label>
          <label title="Toggles particle glow. (Reduces performance.)">
            Outer Glow
            <input
              type="checkbox"
              name="glow"
              checked={newSettings.glow}
              onChange={handleChange}
            />
          </label>
          <label title="Sets base particle size.">
            Size
            <input
              type="range"
              name="size"
              min={1}
              max={10}
              step={0.1}
              value={newSettings.size}
              onChange={handleChange}
            />
          </label>
          <label title="Sets base particle speed.">
            Speed
            <input
              type="range"
              name="baseSpeed"
              max={10}
              step={0.1}
              value={newSettings.baseSpeed}
              onChange={handleChange}
            />
          </label>
          <label title="Sets how quickly particles will move away from the cursor.">
            Avoid Strength
            <input
              type="range"
              name="avoidStrength"
              max={10}
              step={0.1}
              value={newSettings.avoidStrength}
              onChange={handleChange}
            />
          </label>
          <label title="Sets the radius of mouse effects.">
            Avoid Radius
            <input
              type="range"
              name="avoidRadius"
              max={500}
              value={newSettings.avoidRadius}
              onChange={handleChange}
            />
          </label>
          <label title="Sets the strength of mouse clicks / finger taps.">
            Click Strength
            <input
              type="range"
              name="clickStrength"
              max={400}
              value={newSettings.clickStrength}
              onChange={handleChange}
            />
          </label>
          <div className="button-box">
            <button className="animated-button" onClick={handleSubmit}>
              SAVE
            </button>
            <button className="animated-button" onClick={handleCancel}>
              CANCEL
            </button>
          </div>
        </div>
      </form>
    </animated.div>
  );
}

export default StarfieldSettings;
