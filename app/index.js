import React from 'react';
import ReactDom from 'react-dom';
import Popular from './components/popular';
import './index.css';

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <Popular />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));
