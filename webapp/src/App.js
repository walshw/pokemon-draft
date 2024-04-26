import '@shoelace-style/shoelace/dist/themes/light.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';
import MainScreen from './components/main-screen/mainScreen';
import LoginScreen from './components/login-screen/loginScreen';
import { useState } from 'react';

// We can set this to NOT use a CDN but instead copy the nodemodule assets into ../public
// https://shoelace.style/frameworks/react
setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.0/cdn/');

function App() {

  // TODO: We gotta rename these higher order components
  // * LoginScreen: I treat it as a login auth-wall (it totally COULD be )
  const [id, setUserId] = useState(null);

  return (
    <LoginScreen setUserId={setUserId}>
      <MainScreen userId={id} setUserId={setUserId}/>
    </LoginScreen>
  );
}

export default App;
