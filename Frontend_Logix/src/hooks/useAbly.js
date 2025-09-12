import { useEffect, useRef } from "react";
import { getChannel } from "../utils/ably";

const useAbly = (channelName, eventName, callback) => {
  const callbackRef = useRef();
  useEffect(() => { callbackRef.current = callback; }, [callback]);

  useEffect(() => {
    const channel = getChannel(channelName);
    const wrapper = (msg) => callbackRef.current(msg.data);

    channel.subscribe(eventName, wrapper);

    return () => { channel.unsubscribe(eventName, wrapper); };
  }, [channelName, eventName]);
};

export default useAbly;
