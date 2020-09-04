import React from 'react';
import video from "../../assets/Videos/Key-Cons-sample.mp4";

export default function KeyConsVid({className="modal-video", style={}}) {
  return <video
    className={className}
    style={style}
    alt="Key Conservation"
    autoPlay
    muted
    loop
    src={video}
  /> 
}