import React from 'react';
import video from "../../assets/Videos/Gazorkazork-sample.mp4";

export default function GazorkazorkVid({className="modal-video", style={}, onPlay}) {
  return <video
    className={className}
    style={style}
    alt="Gazorkazork"
    autoPlay
    muted
    loop
    onPlaying={onPlay}
    src={video}
  /> 
}