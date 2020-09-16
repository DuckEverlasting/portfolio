import React, { useEffect } from 'react';
import video from "../../assets/Videos/First-Person-sample.mp4";

export default function FirstPersonVid({className="modal-video", style={}, onLoad}) {
  useEffect(() => {
    if (onLoad) {
      onLoad();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <video
    className={className}
    style={style}
    alt="First Person Prototype"
    autoPlay
    muted
    loop
    src={video}
  /> 
}