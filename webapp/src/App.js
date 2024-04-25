import Pokemonlist from './components/pokemon-list/pokemonList';
import '@shoelace-style/shoelace/dist/themes/light.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';
import SearchBar from './components/search-bar/searchBar';
import TeamCard from './components/teams/team-card/teamCard';
import TeamList from './components/teams/team-list/teamList';
import Title from './components/title/title';
import MainScreen from './components/main-screen/mainScreen';

// We can set this to NOT use a CDN but instead copy the nodemodule assets into ../public
// https://shoelace.style/frameworks/react
setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.0/cdn/');

function App() {
  return (
    <MainScreen></MainScreen>
  );
}

export default App;
