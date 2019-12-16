import React from "react";
import { useSprings, animated } from "react-spring";

function AnimatedWord({ word }) {
  const characters = word.split("");
  
  const [textSprings, setTextSprings] = useSprings(characters.length, i => ({
    display: "inline-block",
    transform: "scale(0)"
  }))

  setTextSprings(i => ({
    display: "inline-block",
    transform: "scale(1)",
    delay: 200 + Math.floor(Math.random() * 800),
    config: {tension: 200, friction: 10}
  }))

  return (
    <nobr> 
      {textSprings.map((props, index) => {
        return <animated.span style={props}>{characters[index]}</animated.span>
      })}
    </nobr>
  );
}

function AnimatedText({string}) {
  const words = string.split(" ")
  return (
    <> 
      {words.map((word, index) => {
        return index === words.length - 1 ?
          <AnimatedWord word={word}/>
          :
          <>
            <AnimatedWord word={word}/>
            <span> </span>
          </>
      })}
    </>
  );
}
export default AnimatedText