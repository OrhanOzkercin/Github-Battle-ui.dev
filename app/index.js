import React from 'react';
import ReactDom from 'react-dom';
import './index.css';

class App extends React.Component {
  render() {
    return <h1>Hello Orhan</h1>;
  }
}

ReactDom.render(<App />, document.getElementById('app'));
