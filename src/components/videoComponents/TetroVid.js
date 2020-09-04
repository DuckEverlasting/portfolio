import React from 'react';
import video from "../../assets/Videos/Tetro-sample.mp4";

export default function TetroVid({className="modal-video", style={}}) {
  return <video
    className={className}
    style={style}
    alt="Tetro"
    autoPlay
    muted
    loop
    src={video}
  /> 
}