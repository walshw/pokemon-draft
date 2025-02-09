import { Server } from "socket.io";
import { configDotenv } from "dotenv";
import monsDefault from './data/draftListLoader.js';
import { writeFileSync } from "fs";

configDotenv();

const port = 10310;

const teamMonMax = 5;

const io = new Server({
    cors: {
        origin: [process.env.LOCAL_URL, process.env.REACT_URL, process.env.LOCALHOST_URL]
    }
});

// Teams that CANNOT pick will be have their compelete key set to true during pick rotation
let teamsDefault = [
    { id: 0, name: "William", pickOrder: 1, complete: false, mons: [] },
    { id: 1, name: "Billy", pickOrder: 3, complete: false, mons: [] },
    { id: 2, name: "Guillermo", pickOrder: 2, complete: false, mons: [] },
    { id: 3, name: "Wilhelm", pickOrder: 4, complete: false, mons: [] },
    { id: 4, name: "Guglielmo", pickOrder: 6, complete: false, mons: [] },
];
teamsDefault = [];

let mons = structuredClone(monsDefault);
let teams = structuredClone(teamsDefault);

let connections = [];
let pickingTeamId = null;
let draftComplete = false;

// TODO: These can be better engineered to use a turn count approach.
let direction = 1;
let firstPickDone = false;

io.on("connection", (socket) => {
    const userId = socket.handshake.auth.userId;
    const roomName = "demoRoom";

    // how to reconnect:
    // pick same name

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

    connections.push({ address: socket.handshake.address, id: socket.handshake.auth.userId, pfp: socket.handshake.auth.pfp, pickOrder: 0 });
    io.to(roomName).emit("connections", connections);

    if (teams.length > 0) {
        console.log("emitted");

        emitGameState();
    }

    socket.on("startGame", () => {
        direction = 1;
        firstPickDone = false;
        draftComplete = false;
        // ? pull the roomName from some payload in the socket ?
        console.log("starts");
        // Reset teams
        mons = structuredClone(monsDefault);
        teams = [];

        const connectionIdSet = new Set();

        connections.forEach((connection, index) => {
            if (!connectionIdSet.has(connection.id)) {
                teams.push(
                    {
                        id: connection.id,
                        name: connection.id,
                        pfp: connection.pfp,
                        pickOrder: connection.pickOrder,
                        complete: false,
                        mons: []
                    },
                )

                connectionIdSet.add(connection.id);
            }
        })

        setNextTeamId();
        emitGameState(roomName);
    });

    socket.on("stopGame", () => {
        // Remove all game listeners
        // Cleanup etc.
        pickingTeamId = null;
        mons = [];
        teams = [];
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

        const playerTeam = teams.find(team => team.id === pickingTeamId);
        const selectedMon = mons.find(mon => mon.id === monId);

        if (selectedMon.picked) {
            callback(false);
            return false;
        }

        if (playerTeam.mons.length >= teamMonMax) {
            callback(false);
            return false;
        }

        selectedMon.picked = true;
        playerTeam.mons.push(selectedMon);

        // If the team is full OR can no longer pick any more mons, move them to the complete teams
        if (!(playerTeam.mons.length < teamMonMax)) {
            playerTeam.complete = true;
        }

        // Check for any other completed teams?
        // code smell???
        updateCompletedTeams();

        // is game done?
        if (!mons.some(mon => !mon.picked) || !teams.some(team => !team.complete)) {
            draftComplete = true;
            console.log("draft complete");

            const outputJson = teams.map(team => {
                return {
                    name: team.name,
                    mons: team.mons.map(mon => mon.name),
                }
            });

            const now = new Date();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const year = now.getFullYear();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const filename = `${month}-${day}-${year}_${hours}-${minutes}_draft.json`;

            writeFileSync("completedDrafts/" + filename, JSON.stringify(outputJson, null, "\t"));

            // TODO: Do something clientside to prevent clicking or see a "heres my team" page
        } else {
            setNextTeamId(pickingTeamId);
        }

        emitGameState(roomName);

        return callback(true);
    });

    socket.on("updatedPickOrder", (updatedConnections) => {
        connections = updatedConnections;
    });

    socket.on("kick", (userId) => {
        console.log("Kicking user: " + userId);
        connections = connections.filter(connection => connection.id !== userId);
        io.to(roomName).emit("connections", connections);
    });

    socket.on("clearConnections", () => {
        connections = [];
        io.to(roomName).emit("connections", connections);
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
    if (team.mons.length >= teamMonMax) {
        return false;
    }

    return true;
}

// 1, 2, 3, 3, 2, 1, 1, 2, 3, 3, 2, 1
const setNextTeamId = () => {
    let myTeams = teams;
    myTeams.sort((a, b) => a.pickOrder - b.pickOrder);

    if (!pickingTeamId) {
        pickingTeamId = myTeams[0].id;
        return;
    }

    const teamIndex = myTeams.findIndex(team => team.id === pickingTeamId);
    let indexForNextTeam = (teamIndex + direction);

    if (indexForNextTeam >= myTeams.length) {
        indexForNextTeam = myTeams.length - 1;
    } else if (indexForNextTeam <= 0 && (!firstPickDone || direction === -1)) {
        indexForNextTeam = 0;
    }

    const nextTeamId = myTeams[indexForNextTeam].id;
    const x = teams.find(team => team.id === nextTeamId);

    console.log(`Team: ${x.name} up next pick order: ${x.pickOrder}`);

    pickingTeamId = nextTeamId;

    switch (teamIndex) {
        case 0:
            direction = 1;
            break;
        case myTeams.length - 1:
            direction = -1;
            break;
        default:
            break;
    }

    firstPickDone = true;
}

console.log("Listening on port: " + port);
io.listen(port);
