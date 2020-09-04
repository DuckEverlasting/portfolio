import React from 'react';
import video from "../../assets/Videos/Gazorkazork-sample.mp4";

export default function GazorkazorkVid({className="modal-video", style={}}) {
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