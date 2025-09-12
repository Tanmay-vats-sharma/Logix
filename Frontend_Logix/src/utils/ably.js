import Ably from "ably";

let ablyClient = null;
const channels = {};

export const initAbly = () => {
  if (!ablyClient) {
    ablyClient = new Ably.Realtime({
      authUrl: `${import.meta.env.VITE_API_URL}/api/ably/token` || "https://y84kkwcocgcs888ks4s4cg48.ircollab.com/api/ably/token"
    });

    ablyClient.connection.on((stateChange) => {
      console.log("Ably connection state:", stateChange.current);
    });

    ablyClient.connection.on("failed", (err) => console.error("Ably connection failed:", err));
  }
  return ablyClient;
};

export const getChannel = (channelName) => {
  const client = initAbly();
  if (!channels[channelName]) channels[channelName] = client.channels.get(channelName);
  return channels[channelName];
};
