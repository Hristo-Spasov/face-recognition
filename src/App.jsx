import React,{ Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from "./components/Logo/Logo";
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import SignIn from './components/SignIn/SignIn';
import Register from './components/SignIn/Register';
import ParticlesBg from 'particles-bg';
import './App.css';



class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }  


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage')
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftColumn: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightColumn: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
    
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box})
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
      .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
      .catch(error => console.log('error', error));
  

  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render() {
    return (
      <div className='App'>
        <ParticlesBg color="#6F94A0" num={150} type="cobweb" bg={true} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        { this.state.route === 'home' 
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition  box={this.state.box} imageUrl={this.state.imageUrl} />
            </div>
          : (
              this.state.route === 'signin' 
              ? <SignIn onRouteChange = {this.onRouteChange} />
              : <Register onRouteChange = {this.onRouteChange} />
              
            )
          
        }
        
      </div>
    )
  }
}

export default App