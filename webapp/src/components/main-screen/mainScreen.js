// TODO: This is a temp name for a container component that will be the main draft screen
// This component will be visible after the user has selected a room/name + any login stuff 
// Come up with a better name once we start making the login flow --WWALSH

import { useEffect, useState } from "react";

import SlBadge from '@shoelace-style/shoelace/dist/react/badge';
import PokemonList from "../pokemon-list/pokemonlist";
import SearchBar from "../search-bar/searchbar";
import TeamList from "../teams/team-list/teamlist";
import Title from "../title/title";
import { socket } from "../../socket";
import "./mainScreen.css";

const MainScreen = () => {
    // https://socket.io/how-to/use-with-react
    const [isConnect, setIsConnected] = useState(socket.connected);
    const [data, setData] = useState();
    const [pickingTeamId, setPickingTeamId] = useState();
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        socket.connect();
        socket.on("connect", () => setIsConnected(true));
        socket.on("disconnect", () => setIsConnected(false));
        socket.on("serverMessage", (data) => console.log(data));
        socket.on("teamsList", (data) => setTeams(data));
        socket.on("pickingTeamChange", (data) => setPickingTeamId(data));
        // Do we have all these sockets for the data, or can we collapse data into a state socket
        // Just keep it all in one socket?
        
        return () => {
            socket.off("connect", () => setIsConnected(true));
            socket.off("disconnect", () => setIsConnected(false));
            socket.off("reactMessage", setData);
            socket.disconnect();
        };
    }, []);

    return <div className="mainScreenContainer">
        <div className="leftContainer">
            <SlBadge variant={isConnect ? "success": "neutral"}>Status</SlBadge>
            <Title />
            <SearchBar />
            <PokemonList />
        </div>
        <div>
            <TeamList teams={teams} pickingTeamId={pickingTeamId}/>
        </div>
    </div>;
}

export default MainScreen;
