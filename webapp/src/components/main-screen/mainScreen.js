// TODO: This is a temp name for a container component that will be the main draft screen
// This component will be visible after the user has selected a room/name + any login stuff 
// Come up with a better name once we start making the login flow --WWALSH

import { useEffect, useState } from "react";

import SlBadge from '@shoelace-style/shoelace/dist/react/badge';
import PokemonList from "../pokemon-list/pokemonList";
import SearchBar from "../search-bar/searchBar";
import TeamList from "../teams/team-list/teamList";
import Title from "../title/title";
import { socket } from "../../socket";
import "./mainScreen.css";

const MainScreen = () => {
    // https://socket.io/how-to/use-with-react
    const [isConnect, setIsConnected] = useState(socket.connected);
    const [data, setData] = useState();
    const [pickingTeamId, setPickingTeamId] = useState();
    const [teams, setTeams] = useState([]);
    const [mons, setMons] = useState([]);

    useEffect(() => {
        socket.connect();
        socket.on("connect", () => setIsConnected(true));
        socket.on("disconnect", () => setIsConnected(false));
        socket.on("teamsList", (data) => setTeams(data));
        socket.on("monsList", (data) => setMons(data));
        socket.on("pickingTeam", (data) => setPickingTeamId(data));
        
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
            <PokemonList mons={mons}/>
        </div>
        <div>
            <TeamList teams={teams} pickingTeamId={pickingTeamId}/>
        </div>
    </div>;
}

export default MainScreen;
