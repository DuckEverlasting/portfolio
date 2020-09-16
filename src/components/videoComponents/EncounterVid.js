import React from 'react';
import video from "../../assets/Videos/5E-Encounter-sample.mp4";

export default function EncounterVid({className="modal-video", style={}, onPlay}) {
  return <video
    className={className}
    style={style}
    alt="5E Enounter Generator"
    autoPlay
    muted
    loop
    onPlay={onPlay}
    src={video}
  /> 
}