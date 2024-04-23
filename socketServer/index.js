import { Server } from "socket.io";

const port = 10310;

const io = new Server({
    cors: {
        origin: ["http://localhost:3000", "http://192.168.0.14:3000"]
    }
});

const teams = [
    { id:0, name: "William", pickOrder: 1, mons: []},
    { id:1, name: "Billy", pickOrder: 3, mons: [] },
    { id:2, name: "Guillermo", pickOrder: 2, mons: [] },
    { id:3, name: "Wilhelm", pickOrder: 4, mons: [] },
    { id:4, name: "Guglielmo", pickOrder: 6, mons: [] },
];

io.on("connection", (socket) => {
    socket.emit("clientConnected", "Thank you for connecting REACT client: " + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));

    socket.on("williamEvent2", (payload) => {
        console.log("Recieved this payload:");
        console.log(payload);
    });

    socket.emit("teamsList", teams);

    setInterval(() => {
        socket.emit("pickingTeamChange", Math.floor(Math.random() * teams.length));
    }, 3000);

    return () => {
        socket.off("williamEvent2")
    }
});

console.log("Listening on port: " + port);
io.listen(port);
