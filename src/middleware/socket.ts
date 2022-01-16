import { FEED, INFO, SocketActionTypes, SOCKET_ACTION } from "../app/actions/socket/types";
import { store } from "../app/store";

export const socketMiddleware = (s: any) => (next: any) => (action: any) => {
    next(action);
}