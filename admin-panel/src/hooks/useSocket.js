import { useEffect } from "react";
import { getSocket } from "../utils/socket";

const useSocket = (eventName, callback) => {
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on(eventName, callback);

    return () => {
      socket.off(eventName, callback);
    };
  }, [eventName, callback]);
};

export default useSocket;