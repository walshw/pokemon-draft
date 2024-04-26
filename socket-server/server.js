import { Server } from "socket.io";
import { configDotenv } from "dotenv";

configDotenv();

const port = 10310;
const roomName = "demoRoom";

const teamMonMin = 10;
const teamMonMax = 13;

const io = new Server({
    cors: {
        origin: [process.env.LOCAL_URL, process.env.REACT_URL]
    }
});

// Teams that CANNOT pick will be have their compelete key set to true during pick rotation
const teams = [
    { id: 0, name: "William", pickOrder: 1, points:999, complete: false, mons: [] },
    { id: 1, name: "Billy", pickOrder: 3, points:0, complete: false, mons: [] },
    { id: 2, name: "Guillermo", pickOrder: 2, points:0, complete: false, mons: [] },
    { id: 3, name: "Wilhelm", pickOrder: 4, points:99, complete: false, mons: [] },
    { id: 4, name: "Guglielmo", pickOrder: 6, points:0, complete: false, mons: [] },
];

// TODO: Grab the list of pokemon and import it properly AT SOME POINT NOT RIGHT NOW DONT GET DISTRACT FROM THE CORE LOOP! --WWALSH
const mons = [
    { id: 0, name: "Goku", type: "Saiyan", picked: false , cost: 99 },
    { id: 1, name: "Pikachu", type: "Electric", picked: false , cost: 5 },
    { id: 2, name: "Charmander", type: "Fire", picked: false , cost: 3 },
    { id: 3, name: "Aipom", type: "Monkey", picked: false , cost: 12 },
    { id: 4, name: "Minun", type: "Electric", picked: false , cost: 6 },
    { id: 5, name: "Plusle", type: "Electric", picked: false , cost: 6 },
    { id: 6, name: "Mewtwo", type: "Psychic", picked: false , cost: 98 },
];

io.on("connection", (socket) => {
    const emitGameState = (room) => {
        io.to(room).emit("teamsList", teams);
        io.to(room).emit("monsList", mons);
        io.to(room).emit("pickingTeam", pickingTeamId);
    }

    socket.join(roomName);

    let pickingTeamId = teams[0].id;

    socket.on("startGame", () => {
        // ? pull the roomName from some payload in the socket ?
        pickingTeamId = teams[0].id;
        emitGameState(roomName);
    });

    socket.on("stopGame", () => {
        // Remove all game listeners
        // Cleanup etc.
        socket.offAny();
    });

    socket.on("pick", (monId, callback) => {
        // TODO: What do I do when a request "fails"? --WWALSH
        // Just return? what happens next?

        console.log(`User ${socket.handshake.auth.userId}|${socket.handshake.address} picked ${monId}`);

        // Pulling team id from the id set in socket.js
        // ! COMMENTING FOR LOCAL TESTING
        // if (Number(socket.handshake.auth.userId) !== pickingTeamId) {
        //     return;
        // }

        const playerTeam = teams.find(team => team.id === pickingTeamId);
        const selectedMon = mons.find(mon => mon.id === monId);

        if (selectedMon.picked) {
            callback(false);
            return false;
        }

        if (playerTeam.mons.length >= 13) {
            callback(false);
            return false;
        }

        if (playerTeam.points < selectedMon.cost) {
            callback(false);
            return false;
        }

        console.log("Made it?");

        playerTeam.points = playerTeam.points - selectedMon.cost;
        selectedMon.picked = true;
        playerTeam.mons.push(selectedMon);
        
        // If the team is full OR can no longer pick any more mons, move them to the complete teams
        if (!(playerTeam.mons.length < 13 || (playerTeam.points > 0 && mons.some(mon => mon.cost >= playerTeam.points)))) {
            playerTeam.complete = true;
        }
        
        updateCompletedTeams();

        const nextTeamId = getNextTeamId(pickingTeamId);
        pickingTeamId = nextTeamId;

        // Check for any other completed teams?
        // code smell???

        emitGameState(roomName);

        return callback(true);
    })
});

const updateCompletedTeams = () => {
    teams.forEach(team => {
        if (!canTeamStillPick(team)) {
            team.complete = true;
        }
    });
}

const canTeamStillPick = (team) => {
    // BROKE OUT THIS BOOLEAN LOGIC FOR SANITY
    if (team.mons.length >= 13) {
        return false;
    }

    if (team.points <= 0) {
        return false;
    }

    return mons.some(mon => mon.cost <= team.points);
}

const getNextTeamId = (currentTeamId) => {
    let myTeams = teams.filter(team => !team.complete);
    myTeams.sort((a,b) => a.pickOrder - b.pickOrder);
    const teamIndex = myTeams.findIndex(team => team.id === currentTeamId);
    const indexForNextTeam = myTeams.length > 1 ? (teamIndex + 1) % myTeams.length : 0;
    const nextTeamId = myTeams[indexForNextTeam].id;
    console.log(nextTeamId);
    console.log(myTeams);

    const x = teams.find(team => team.id === nextTeamId);

    console.log(`Team: ${x.name} up next pick order: ${x.pickOrder}`);

    return nextTeamId;
}

const playerCanStillPick = (player) => {
    return player.mons.length < 13 || (player.points > 0 && mons.some(mon => mon.cost >= player.points));
}

const currentPlayerId = 0;

const coreGameLoop = () => {
    // Loop through each player

    // - If the player is *able* to pick
    // - - Set turn to this player
    // - - Wait for player input (Is there a better)


    // ? Do I have a game loop that broadcasts a gamestate to all the clients (assuming everyone is there and listening)
    // * Or do I have the server be a gamestate, with listeners 
}


console.log("Listening on port: " + port);
io.listen(port);
