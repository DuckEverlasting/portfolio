import React from 'react';
import video from "../../assets/Videos/Hexsweeper-sample.mp4";

export default function HexsweeperVid({className="modal-video", style={}, onPlay}) {
  return <video
    className={className}
    style={style}
    alt="Hexsweeper"
    autoPlay
    muted
    loop
    onPlay={onPlay}
    src={video}
  /> 
}