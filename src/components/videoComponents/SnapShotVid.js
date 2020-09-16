import React, { useEffect } from 'react';
import video from "../../assets/Videos/SnapShot-sample.mp4";

export default function SnapShotVid({className="modal-video", style={}, onLoad}) {
  useEffect(() => {
    if (onLoad) {
      onLoad();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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