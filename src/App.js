import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import React from 'react';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Main />
        <Footer />
      </>
    );
  } 
}

export default App;
