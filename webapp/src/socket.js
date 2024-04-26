import { io } from "socket.io-client";

const wsUrl = window.location.host === "localhost:3000" ? process.env.REACT_APP_LOCAL_WS_URL : process.env.REACT_APP_WS_URL;

export const makeSocket = (userId) => {
    const mySocket = io(wsUrl, {autoConnect:false, auth: {cookie: "lole", userId: userId}})
    // mySocket.connect();
    return mySocket;
}

export const socket = io(wsUrl + "", {autoConnect:false, auth: {cookie: "lole", userId: "0"}});
