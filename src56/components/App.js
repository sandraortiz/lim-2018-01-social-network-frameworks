import React, { Component } from 'react';


//COMPONENTS
import Header from './global/Header';
import Content from './global/Content';
import Footer from './global/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Header />
       <Content />
       <Footer />
      </div>
    );
  }
}

export default App;