import { io } from "socket.io-client";

export const socket = io("ws://192.168.0.14:10310", {autoConnect:false});
