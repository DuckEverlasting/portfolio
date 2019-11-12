import React from 'react';
import './App.css';
import Starfield from './Starfield'
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    height: 100vh;
    margin: 0;
    padding: 0;
`

function App() {
  return (
    <div>
        <Container>
          <Starfield></Starfield>
        </Container>
        <p>wassup</p>
        <p>wassup</p>
        <p>wassup</p>
    </div>
  );
}

export default App;
