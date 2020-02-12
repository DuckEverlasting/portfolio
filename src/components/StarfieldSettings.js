import React from "react";

function StarfieldSettings({newSettings, handleChange, handleSubmit, handleCancel}) {
  return (
    <form style={{ position: "relative", zIndex: "12", color: "white" }}>
      <label>
        Total Particles
        <input
          type="range"
          name="totalParticles"
          max={500}
          value={newSettings.totalParticles}
          onChange={handleChange}
        />
      </label>
      <label>
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
      <label>
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
      <label>
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
      <label>
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
      <label>
        Avoid Radius
        <input
          type="range"
          name="avoidRadius"
          max={500}
          value={newSettings.avoidRadius}
          onChange={handleChange}
        />
      </label>
      <label>
        Click Strength
        <input
          type="range"
          name="clickStrength"
          max={500}
          value={newSettings.clickStrength}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleSubmit}>SUBMIT</button>
      <button onClick={handleCancel}>CANCEL</button>
    </form>
  );
}

export default StarfieldSettings;
