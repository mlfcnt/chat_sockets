"use client";

import { useEffect, useRef, useState } from "react";

export const useHandleWS = () => {
  const [messages, setMessages] = useState<
    { username: string; text: string; timestamp: string }[]
  >([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8080/ws");

    socketRef.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    socketRef.current.onmessage = (event) => {
      console.log("Message received from server");
      const messageHistory = JSON.parse(event.data);
      setMessages(messageHistory);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  return {
    messages,
    socketRef,
  };
};
