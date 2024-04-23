import { Server } from "socket.io";
import { configDotenv } from "dotenv";

configDotenv();

const port = 10310;

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

io.on("connection", (socket) => {
    socket.emit("clientConnected", "Thank you for connecting REACT client: " + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
    socket.emit("teamsList", teams);
    socket.emit("monsList", mons);

    setInterval(() => {
        socket.emit("pickingTeam", Math.floor(Math.random() * teams.length));
    }, 3000);
});

console.log("Listening on port: " + port);
io.listen(port);
