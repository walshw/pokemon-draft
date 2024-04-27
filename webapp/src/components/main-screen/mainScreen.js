// TODO: This is a temp name for a container component that will be the main draft screen
// This component will be visible after the user has selected a room/name + any login stuff 
// Come up with a better name once we start making the login flow --WWALSH

import { useEffect, useState } from "react";

import SlBadge from '@shoelace-style/shoelace/dist/react/badge';
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import PokemonList from "../pokemon/pokemon-list/pokemonList";
import SearchBar from "../search-bar/searchBar";
import TeamList from "../teams/team-list/teamList";
import Title from "../title/title";
import { socket } from "../../socket";
import "./mainScreen.css";
import PokemonConfirmation from "../pokemon/pokemon-confirmation/pokemonConfirmation";
import Lobby from "../lobby/lobby";

const MainScreen = (props) => {
    // I think the ID should be stored in local storage with a random value
    // The name they put in should just be a display name
    
    const myId = props.userId;
    const isAdmin = props.userId === "wgb";

    // https://socket.io/how-to/use-with-react
    const [isConnect, setIsConnected] = useState(socket.connected);
    const [pickingTeamId, setPickingTeamId] = useState(null);
    const [teams, setTeams] = useState([]);
    const [mons, setMons] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [error, setError] = useState(false);
    const [draftComplete, setDraftComplete] = useState(false);
    const [connections, setConnections] = useState([]);

    useEffect(() => {
        socket.auth = { userId: props.userId }
        socket.connect();
        socket.on("connect", () => setIsConnected(true));
        socket.on("disconnect", () => setIsConnected(false));
        socket.on("teamsList", (data) => setTeams(data));
        socket.on("monsList", (data) => setMons(data));
        socket.on("pickingTeam", (data) => setPickingTeamId(data));
        socket.on("draftComplete", (data) => setDraftComplete(data));
        socket.on("connections", (data) => {
            setConnections(data);
        });

        return () => {
            socket.off("connect", () => setIsConnected(true));
            socket.off("disconnect", () => setIsConnected(false));
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (draftComplete) {
            alert("OHHH BABY");
        }
    }, [draftComplete]);

    const confirmPokemon = () => {
        socket.emitWithAck("pick", selectedPokemon.id).then((resp) => {
            if (!resp) {
                alert("An error has occured with your poke-confirmation");
                return;
            }

            // On success, next player turn
        });
    };

    const cancelPokemon = () => {
        setSelectedPokemon(null);
    };

    const renderMainScreen = () => {
        if (!pickingTeamId && !isAdmin) {
            return <Lobby connections={connections}></Lobby>
        }

        return <div className="mainScreenContainer">
            <div className="leftContainer">
                <div>
                    <SlBadge variant={isConnect ? "success" : "neutral"}>Status</SlBadge>
                    <SlBadge variant="primary">{pickingTeamId}</SlBadge>
                    <SlButton onClick={() => { socket.emit("startGame") }}>Start</SlButton>
                    <SlButton onClick={() => socket.emit("stopGame")}>Stop</SlButton>
                </div>
                <Title />
                <SearchBar />
                <PokemonList mons={mons} selectedMon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
                <PokemonConfirmation selectedMon={selectedPokemon} confirmPokemon={confirmPokemon} cancelPokemon={cancelPokemon} isPlayerPicking={myId == pickingTeamId} />
            </div>
            <div>
                <TeamList teams={teams} pickingTeamId={pickingTeamId} userId={props.userId}/>
                {isAdmin && <Lobby connections={connections} />}
            </div>
        </div>;
    }

    return renderMainScreen();
}

export default MainScreen;
