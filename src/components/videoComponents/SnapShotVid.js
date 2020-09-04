import React from 'react';
import video from "../../assets/Videos/SnapShot-sample.mp4";

export default function SnapShotVid({className="modal-video", style={}}) {
  return <video
    className={className}
    style={style}
    alt="SnapShot Image Editor"
    autoPlay
    muted
    loop
    src={video}
  /> 
}