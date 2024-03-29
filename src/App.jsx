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

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id:'',
    name: '',
    email: '',
    score: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }  

  loadUser = (data) => {
    this.setState({user: {
      id:data.id,
      name: data.name,
      email: data.email,
      score: data.score,
      joined: data.joined
    }})
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
    fetch('https://face-recognition-backend-me54.onrender.com/imageUrl',{
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({
        input:this.state.input
      })
    })
    .then(response => response.json())
      .then(response => { 
        if (response) {
          fetch('https://face-recognition-backend-me54.onrender.com/imagescore', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id,
            })

          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { score: count}))
          })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(error => console.log('error', error));
  

  }

  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }


  render() {
    return (
      <div className='App'>
        <ParticlesBg color="#6F94A0" num={50} type="cobweb" bg={true} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        { this.state.route === 'home' 
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} score={this.state.user.score} />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition  box={this.state.box} imageUrl={this.state.imageUrl} />
            </div>
          : (
              this.state.route === 'signin' 
              ? <SignIn loadUser={this.loadUser} onRouteChange = {this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange} />
              
            )
          
        }
        
      </div>
    )
  }
}

export default App