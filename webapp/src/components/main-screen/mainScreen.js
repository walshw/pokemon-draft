// TODO: This is a temp name for a container component that will be the main draft screen
// This component will be visible after the user has selected a room/name + any login stuff 
// Come up with a better name once we start making the login flow --WWALSH

import PokemonList from "../pokemon-list/pokemonlist";
import SearchBar from "../search-bar/searchbar";
import TeamList from "../teams/team-list/teamlist";
import Title from "../title/title";
import "./mainScreen.css"

const MainScreen = () => {
    return <div className="mainScreenContainer">
        <div className="leftContainer">
            <Title />
            <SearchBar />
            <PokemonList />
        </div>
        <div>
            <TeamList />
        </div>
    </div>;
}

export default MainScreen;
