import React from 'react';
import video from "../../assets/Videos/Rejeweler-sample.mp4";

export default function RejewelerVid({className="modal-video", style={}}) {
  return <video
    className={className}
    style={style}
    alt="Rejeweler"
    autoPlay
    muted
    loop
    src={video}
  /> 
}