import React from 'react';
import video from "../../assets/Videos/Hexsweeper-sample.mp4";

export default function HexsweeperVid({className="modal-video", style={}}) {
  return <video
    className={className}
    style={style}
    alt="Hexsweeper"
    autoPlay
    muted
    loop
    src={video}
  /> 
}