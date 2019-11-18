export default function programScroll(keyframes, scrollPosition) {
    // Keyframe = {scrollPct, deltaX, deltaY (default 0), scale (default 1), opacity (default 1), rotate (default 0)}
    keyframes.sort((a, b) => a.ScrollNum - b.ScrollNum)
    let current = 0;
    let scrollNum, deltaX, deltaY, scale, opacity, rotate;

    const output = () => ({
      transform: `translate(${deltaX}%, ${deltaY}%) scale(${scale}) rotate(${rotate})`,
      opacity: opacity
    })

    while (current < keyframes.length) {
      ({scrollNum, deltaX = 0, deltaY = 0, scale = 1, opacity = 1, rotate = 0} = keyframes[current])

      if (scrollPosition === scrollNum) {
        return output();
      } else if (scrollPosition > scrollNum) {
        current ++
      } else if (scrollPosition < scrollNum) {
        if (current > 0) {
          let {
            scrollNum: prevScrollNum, 
            deltaX: prevDeltaX = 0,
            deltaY: prevDeltaY = 0,
            scale: prevScale = 1,
            opacity: prevOpacity = 1,
            rotate: prevRotate = 0
          } = keyframes[current - 1]

          let ratio = (scrollPosition - prevScrollNum) / (scrollNum - prevScrollNum)
          
          deltaX = prevDeltaX + ((deltaX - prevDeltaX) * ratio)
          deltaY = prevDeltaY + ((deltaY - prevDeltaY) * ratio)
          scale = prevScale + ((scale - prevScale) * ratio)
          opacity = prevOpacity + ((opacity - prevOpacity) * ratio)
          rotate = prevRotate + ((rotate - prevRotate) * ratio)

          return output();
        } else {
          console.log("PREVIOUS", "(none)")
          return output();
        }
      }
    }
    return output();
  }