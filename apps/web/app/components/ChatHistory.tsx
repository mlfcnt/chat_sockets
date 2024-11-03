import "./Chat.css";

interface ChatHistoryProps {
  messages: { username: string; text: string; timestamp: string }[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  if (!messages || messages.length === 0) {
    return <div>No messages yet</div>;
  }
  console.log({ messages });
  return (
    <div className="chat-history">
      {messages
        .slice()
        .reverse()
        .map((msg, index) => (
          <div key={index}>
            <strong>{msg.username}:</strong> {msg.text}{" "}
            <em>({msg.timestamp})</em>
          </div>
        ))}
    </div>
  );
};

export default ChatHistory;
