import React from 'react';
import ReactDom from 'react-dom';
import Battle from './components/Battle';
import Popular from './components/Popular';
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
