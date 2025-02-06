import { io } from "socket.io-client";

// todo, tidy this logic up, maybe a switch, it would be nice to not have to worry about erasing localhost
const wsUrl = ["localhost:3000", process.env.REACT_APP_LOCAL_WINDOW_LOCATION_IP].includes(window.location.host) ? process.env.REACT_APP_LOCAL_WS_URL : process.env.REACT_APP_WS_URL;

alert(wsUrl);

export const makeSocket = (userId) => {
    const mySocket = io(wsUrl, { autoConnect: false, auth: { cookie: "lole", userId: userId } })
    // mySocket.connect();
    return mySocket;
}

export const socket = io(wsUrl + "", { autoConnect: false, auth: { cookie: "lole", userId: "0" } });
