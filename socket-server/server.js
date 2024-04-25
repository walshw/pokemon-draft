import { Server } from "socket.io";
import { configDotenv } from "dotenv";

configDotenv();

const port = 10310;
const roomName = "demoRoom";

const io = new Server({
    cors: {
        origin: [process.env.LOCAL_URL, process.env.REACT_URL]
    }
});

const teams = [
    { id: 0, name: "William", pickOrder: 1, mons: [] },
    { id: 1, name: "Billy", pickOrder: 3, mons: [] },
    { id: 2, name: "Guillermo", pickOrder: 2, mons: [] },
    { id: 3, name: "Wilhelm", pickOrder: 4, mons: [] },
    { id: 4, name: "Guglielmo", pickOrder: 6, mons: [] },
];

const mons = [
    { name: "Goku", type: "Saiyan", cost: 99 },
    { name: "Pikachu", type: "Electric", cost: 5 },
    { name: "Charmander", type: "Fire", cost: 3 },
    { name: "Aipom", type: "Monkey", cost: 12 },
    { name: "Minun", type: "Electric", cost: 6 },
    { name: "Plusle", type: "Electric", cost: 6 },
    { name: "Mewtwo", type: "Psychic", cost: 98 },
];

const emitGameState = (room) => {
    io.to(room).emit("teamsList", teams);
    io.to(room).emit("monsList", mons);
    // io.to(room).emit("pickingTeam", pickingTeamId);
}

io.on("connection", (socket) => {
    socket.join(roomName);

    let intervalId = "";
    let pickingTeamId = teams[0].id;

    socket.on("startGame", () => {
        // ? pull the roomName from some payload in the socket ?
        pickingTeamId = teams[0].id;
        emitGameState(roomName);

        intervalId = setInterval(() => {
            pickingTeamId = Math.floor(Math.random() * teams.length);
            io.to(roomName).emit("pickingTeam", pickingTeamId);
        }, 3000);
    });

    socket.on("stopGame", () => {
        // Remove all game listeners
        // Cleanup etc.
        clearInterval(intervalId);
        socket.offAny();
    });

    socket.on("pick", (monId) => {
        // console.log(`User ${socket.handshake.auth.userId} picked ${monId}`);
        console.log(`User ${socket.handshake.address} picked ${monId}`);

        // Validate if user can pick

        // Is it their turn
        // Do they have space
        // Can they afford the pick

        // Store user point counts server-side to prevent forgery
    })
});


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
