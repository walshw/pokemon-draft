import { Server } from "socket.io";
import { configDotenv } from "dotenv";
import monsDefault from './data/draftListLoader.js';

configDotenv();

const port = 10310;

const teamMonMin = 10;
const teamMonMax = 13;

const io = new Server({
    cors: {
        origin: [process.env.LOCAL_URL, process.env.REACT_URL, process.env.LOCALHOST_URL]
    }
});

// Teams that CANNOT pick will be have their compelete key set to true during pick rotation
let teamsDefault = [
    { id: 0, name: "William", pickOrder: 1, points: 999, complete: false, mons: [] },
    { id: 1, name: "Billy", pickOrder: 3, points: 0, complete: false, mons: [] },
    { id: 2, name: "Guillermo", pickOrder: 2, points: 0, complete: false, mons: [] },
    { id: 3, name: "Wilhelm", pickOrder: 4, points: 99, complete: false, mons: [] },
    { id: 4, name: "Guglielmo", pickOrder: 6, points: 0, complete: false, mons: [] },
];
teamsDefault = [];

let mons = structuredClone(monsDefault);
let teams = structuredClone(teamsDefault);

let connections = [];
let pickingTeamId = null;

io.on("connection", (socket) => {
    const userId = socket.handshake.auth.userId;
    const roomName = "demoRoom";

    if (userId === null) {
        return;
    }

    const emitGameState = () => {
        io.to(roomName).emit("teamsList", teams);
        io.to(roomName).emit("monsList", mons);
        io.to(roomName).emit("pickingTeam", pickingTeamId);
        io.to(roomName).emit("draftComplete", draftComplete);
        io.to(roomName).emit("connections", connections);
    }

    socket.join(roomName);
    console.log(`User: ${socket.handshake.auth.userId} | CONNECTED | IP: ${socket.handshake.address}`);

    connections.push({ address: socket.handshake.address, id: socket.handshake.auth.userId });
    io.to(roomName).emit("connections", connections);

    let draftComplete = false;

    socket.on("startGame", () => {
        // ? pull the roomName from some payload in the socket ?
        console.log("starts");
        // Reset teams
        mons = structuredClone(monsDefault);
        teams = structuredClone(teamsDefault);

        connections.forEach(connection => {
            teams.push(
                {
                    id: connection.id,
                    name: connection.id,
                    pickOrder: 1,
                    points: 999,
                    complete: false,
                    mons: []
                },
            )
        })

        pickingTeamId = teams[0].id;
        emitGameState(roomName);
    });

    socket.on("stopGame", () => {
        // Remove all game listeners
        // Cleanup etc.
        mons = structuredClone(monsDefault);
        teams = structuredClone(teamsDefault);

        pickingTeamId = null;
        emitGameState(roomName);
        socket.offAny();
    });

    socket.on("pick", (monId, callback) => {
        // TODO: What do I do when a request "fails"? --WWALSH
        // Just return? what happens next?

        console.log(`User ${socket.handshake.auth.userId}|${socket.handshake.address} picked ${monId}`);

        // Pulling team id from the id set in socket.js
        // ! COMMENTING FOR LOCAL TESTING
        console.log(`U ${socket.handshake.auth.userId} | P ${pickingTeamId}`);

        if (socket.handshake.auth.userId !== pickingTeamId + "") {
            return;
        }

        console.log("?");

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

        selectedMon.picked = true;
        playerTeam.mons.push(selectedMon);

        // If the team is full OR can no longer pick any more mons, move them to the complete teams
        if (!(playerTeam.mons.length < 13)) {
            playerTeam.complete = true;
        }

        // Check for any other completed teams?
        // code smell???
        updateCompletedTeams();

        const nextTeamId = getNextTeamId(pickingTeamId);
        pickingTeamId = nextTeamId;

        // is game done?
        if (!mons.some(mon => !mon.picked) || !teams.some(team => !team.complete)) {
            draftComplete = true;
            console.log("draft complete");
        }

        emitGameState(roomName);

        return callback(true);
    });

    socket.on("disconnect", () => {
        connections = connections.filter(connection => connection.id !== socket.handshake.auth.userId);
        console.log(`User: ${socket.handshake.auth.userId} | LEAVING | IP: ${socket.handshake.address}`);
        io.to(roomName).emit("connections", connections);
        socket._cleanup();
    });
});

const updateCompletedTeams = () => {
    teams.forEach(team => {
        if (!canTeamStillPick(team)) {
            team.complete = true;
        }
    });
}

const canTeamStillPick = (team) => {
    // BROKE OUT THIS BOOLEAN LOGIC FOR SANITY 🤡
    if (team.mons.length >= 13) {
        return false;
    }

    if (team.points <= 0) {
        return false;
    }

    return true;
}

const getNextTeamId = (currentTeamId) => {
    let myTeams = teams.filter(team => !team.complete);
    myTeams.sort((a, b) => a.pickOrder - b.pickOrder);
    const teamIndex = myTeams.findIndex(team => team.id === currentTeamId);
    const indexForNextTeam = myTeams.length > 1 ? (teamIndex + 1) % myTeams.length : 0;
    const nextTeamId = myTeams[indexForNextTeam].id;
    console.log(nextTeamId);
    console.log(myTeams);

    const x = teams.find(team => team.id === nextTeamId);

    console.log(`Team: ${x.name} up next pick order: ${x.pickOrder}`);

    return nextTeamId;
}

console.log("Listening on port: " + port);
io.listen(port);
