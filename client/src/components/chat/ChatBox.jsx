import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
// import moment from "moment";
// import InputEmoji from "react-input-emoji";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessageLoading, messagesError,sendTextMessage } =
    useContext(ChatContext);

  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  if (!recipientUser)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
       
        No Conversation Selected yet..
      </p>
    );

  if (!isMessageLoading)
    return (
      <p style={{ textAlign: "center", width: "100%" }}> loading charts..</p>
    );

  return (
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <strong>{recipientUser?.name}</strong>
      </div>
      <Stack gap={3} className="messages">
        {messages &&
          messages.map((message, index) => {
            <Stack
              key={index}
              className={`${
                message?.senderId === user?._id
                  ? "message self align-self-end flex-grow-0"
                  : "message self align-self-start flex-grow-0"
              }`}
            >
              <span>{message.text}</span>
              <span className="message-footer">
                {/* {moment(message.createdAt).calender()} */}
              </span>
            </Stack>;
          })}
      </Stack>
      <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
        {/* <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          fontFamily="nunito"
          borderColor="rgba(72,112,223,0.2"
        /> */}
        <button className="send-btn" onClick={()=> sendTextMessage(textMessage,user,currentChat._id,setTextMessage)}>
          
        </button>
      </Stack>
    </Stack>
  );
};

export default ChatBox;
