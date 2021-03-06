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
    delay: 600 + Math.floor(Math.random() * 800),
    config: {tension: 500, friction: 15}
  }))

  return (
    <nobr> 
      {textSprings.map((props, index) => {
        return <animated.span key={index} style={props}>{characters[index]}</animated.span>
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
          <AnimatedWord key={index} word={word}/>
          :
          <span key={index}>
            <AnimatedWord word={word}/>
            <span> </span>
          </span>
      })}
    </>
  );
}
export default AnimatedText