import React, { useEffect } from 'react';
import video from "../../assets/Videos/Hexsweeper-sample.mp4";

export default function HexsweeperVid({className="modal-video", style={}, onLoad}) {
  useEffect(() => {
    if (onLoad) {
      onLoad();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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