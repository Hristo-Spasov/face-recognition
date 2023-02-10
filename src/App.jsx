import React,{ Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from "./components/Logo/Logo";
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ParticlesBg from 'particles-bg'
import './App.css';


class App extends Component {
  render() {
    return (
      <div className='App'>
        <ParticlesBg color="#6F94A0" num={150} type="cobweb" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/* {<FaceRecognition />} */}
      </div>
    )
  }
}

export default App
