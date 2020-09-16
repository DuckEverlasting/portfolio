import React, { useEffect } from 'react';
import video from "../../assets/Videos/Gazorkazork-sample.mp4";

export default function GazorkazorkVid({className="modal-video", style={}, onLoad}) {
  useEffect(() => {
    if (onLoad) {
      onLoad();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <video
    className={className}
    style={style}
    alt="Gazorkazork"
    autoPlay
    muted
    loop
    src={video}
  /> 
}