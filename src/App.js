import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ParticlesBg from 'particles-bg';
import 'tachyons';
import './App.css';

const initialState = {
  input: '',
  imageUrl: null,
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}; 

class App extends  Component{
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
  }

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({ isSignedIn: true});
    } else {
      this.setState(initialState);
    }
    this.setState({ route: route });
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input });

        fetch('http://localhost:3001/imageurl', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                input: this.state.input
              })
        })
        .then(response => response.json())
        .then(result => {
          if(result) {
            fetch('http://localhost:3001/image', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(prevState => ({
                user: {
                  ...prevState.user,
                  entries: count
                }
              }));
            })
            .catch(console.log)
          }
          this.displayFaceBox(this.calculateFaceLocation(result))
        })
        .catch(error => console.log('error', error));
  }

  render() {
    const { isSignedIn, imageUrl, box } = this.state;
    return (
      <div className='App'>
        <ParticlesBg color='#ffffff' type='cobweb' bg={true} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {
          this.state.route === 'home' ?
            <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} />
              <FaceRecognition imageUrl={imageUrl} box={box} />
            </div> : 
            (
              this.state.route === 'signin' ?
                <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} /> :
                <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            )
        }
      </div>
    );
  }
}

export default App;
