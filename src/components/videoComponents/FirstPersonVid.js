import React from 'react';
import video from "../../assets/Videos/First-Person-sample.mp4";

export default function FirstPersonVid({className="modal-video", style={}, onPlay}) {
  return <video
    className={className}
    style={style}
    alt="First Person Prototype"
    autoPlay
    muted
    loop
    onPlay={onPlay}
    src={video}
  /> 
}