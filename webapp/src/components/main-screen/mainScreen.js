// TODO: This is a temp name for a container component that will be the main draft screen
// This component will be visible after the user has selected a room/name + any login stuff 
// Come up with a better name once we start making the login flow --WWALSH

import { useEffect, useState } from "react";

import SlBadge from '@shoelace-style/shoelace/dist/react/badge';
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import PokemonList from "../pokemon/pokemon-list/pokemonList";
import SearchBar from "../search-bar/searchBar";
import TeamList from "../teams/team-list/teamList";
import { socket } from "../../socket";
import "./mainScreen.css";
import PokemonConfirmation from "../pokemon/pokemon-confirmation/pokemonConfirmation";
import Lobby from "../lobby/lobby";

const MainScreen = (props) => {
    const myId = props.userId;
    const isAdmin = props.userId === "wgb";
    const myPfp = props.pfp;

    // https://socket.io/how-to/use-with-react
    const [isConnect, setIsConnected] = useState(socket.connected);
    const [pickingTeamId, setPickingTeamId] = useState(null);
    const [teams, setTeams] = useState([]);
    const [mons, setMons] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [draftComplete, setDraftComplete] = useState(false);
    const [connections, setConnections] = useState([]);

    useEffect(() => {
        socket.auth = { userId: props.userId, pfp: myPfp }
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
            setSelectedPokemon(null);
        });
    };

    const cancelPokemon = () => {
        setSelectedPokemon(null);
    };

    const setUserPickOrder = (id, pickOrder) => {
        const connectionIdx = connections.findIndex(connection => connection.id === id);
        connections[connectionIdx].pickOrder = pickOrder;
        socket.emit("updatedPickOrder", connections);
    }

    const renderMainScreen = () => {
        if (!pickingTeamId && !isAdmin) {
            return <Lobby connections={connections}></Lobby>
        }

        return <div className="main">
            <div className="game">
                <div className="heading">
                    <h1>GEN7 OU Draft</h1>
                </div>
                {isAdmin && <div>
                    <SlBadge variant="danger">ADMIN CONTROLS</SlBadge>
                    <SlBadge variant={isConnect ? "success" : "neutral"}>Picking team</SlBadge>
                    <SlBadge variant="primary">{pickingTeamId}</SlBadge>
                    <SlButton onClick={() => { socket.emit("startGame") }}>Start</SlButton>
                    <SlButton onClick={() => socket.emit("stopGame")}>Stop</SlButton>
                </div>}
                <SearchBar />
                <PokemonList mons={mons} selectedMon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} isPlayerPicking={myId == pickingTeamId} />
                <PokemonConfirmation selectedMon={selectedPokemon} confirmPokemon={confirmPokemon} cancelPokemon={cancelPokemon} isPlayerPicking={myId == pickingTeamId} />
            </div>
            <div>
                <TeamList teams={teams} pickingTeamId={pickingTeamId} userId={props.userId} />
                {(isAdmin && !pickingTeamId) && <Lobby isAdmin={isAdmin} connections={connections} setUserPickOrder={setUserPickOrder} />}
            </div>
        </div>;
    }

    return renderMainScreen();
}

export default MainScreen;
