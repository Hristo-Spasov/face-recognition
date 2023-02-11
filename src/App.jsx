import React,{ Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from "./components/Logo/Logo";
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ParticlesBg from 'particles-bg';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
    }
  }  


  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    const PAT = '76d9f0ea2bf64630b23f756b4f0b84cc';
    const USER_ID = 'tricky';       
    const APP_ID = 'face-detection';
    const IMAGE_URL = this.state.input;
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '45fb9a671625463fa646c3523a3087d5';
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {  
                      "url": IMAGE_URL
                  }
              }
          }
      ]
    });

      const requestOptions = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Key ' +  PAT 
          },
          body: raw
      };



      fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result.outputs[0].data.regions[0].region_info.bounding_box))
      .catch(error => console.log('error', error));
  

  }

  render() {
    return (
      <div className='App'>
        <ParticlesBg color="#6F94A0" num={150} type="cobweb" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition  imageUrl={this.state.imageUrl} />
      </div>
    )
  }
}

export default App
