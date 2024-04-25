// TODO: This is a temp name for a container component that will be the main draft screen
// This component will be visible after the user has selected a room/name + any login stuff 
// Come up with a better name once we start making the login flow --WWALSH

import { useEffect, useState } from "react";

import SlBadge from '@shoelace-style/shoelace/dist/react/badge';
import SlCard from '@shoelace-style/shoelace/dist/react/card';
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import PokemonList from "../pokemon/pokemon-list/pokemonList";
import SearchBar from "../search-bar/searchBar";
import TeamList from "../teams/team-list/teamList";
import Title from "../title/title";
import { socket } from "../../socket";
import "./mainScreen.css";

const MainScreen = () => {
    const roomCode = "abc124";
    const myId = 0;

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
            <div>
                <SlBadge variant={isConnect ? "success" : "neutral"}>Status</SlBadge>
                <SlButton onClick={() => {socket.emit("startGame")}}>Start</SlButton>
                <SlButton onClick={() => socket.emit("stopGame")}>Stop</SlButton>
                <SlButton onClick={() => socket.emit("pick", 43)}>Pick</SlButton>
            </div>
            <Title />
            <SearchBar />
            <PokemonList mons={mons} />
        </div>
        <div>
            <TeamList teams={teams} pickingTeamId={pickingTeamId} />
        </div>
    </div>;
}

export default MainScreen;
