"use client";

import React, { FormEvent } from "react";
import ChatHistory from "./ChatHistory";
import UsernameForm from "./UsernameForm";
import "./Chat.css";
import { useHandleWS } from "../lib/useHandleWS";

export const Chat = () => {
  const { socketRef, messages } = useHandleWS();

  let isUsernameSet = false;
  if (typeof window !== "undefined") {
    isUsernameSet = !!localStorage.getItem("username");
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = event.currentTarget.elements[0] as HTMLInputElement;
    const message = input.value;
    const username = localStorage.getItem("username");

    if (
      socketRef.current?.readyState === WebSocket.OPEN &&
      isUsernameSet &&
      username
    ) {
      const messageData = { username, text: message };
      socketRef.current.send(JSON.stringify(messageData));
      input.value = "";
    } else {
      console.error(
        "WebSocket is not open or username is not set. Cannot send message."
      );
    }
  };

  return (
    <div className="chat-container">
      {!isUsernameSet ? (
        <UsernameForm />
      ) : (
        <>
          <ChatHistory messages={messages} />{" "}
          <form onSubmit={handleSubmit} className="chat-form">
            <input type="text" placeholder="Type a message..." required />
            <button type="submit">Send</button>
          </form>
        </>
      )}
    </div>
  );
};
