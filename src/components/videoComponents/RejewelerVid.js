import React, { useEffect } from 'react';
import video from "../../assets/Videos/Rejeweler-sample.mp4";

export default function RejewelerVid({className="modal-video", style={}, onLoad}) {
  useEffect(() => {
    if (onLoad) {
      onLoad();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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