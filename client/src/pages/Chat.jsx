import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotenitalChats from "../components/chat/potenitalChats";

const ChatApp = () => {
    
  const { user } =useContext(AuthContext);

  const { userChats, isUserChatsLoading, userChatsError } =
    useContext(ChatContext);

  console.log("SuperChats", userChats);
//   console.log(userChats.length);
  return (
    <Container>
       <PotenitalChats/>

      {userChats?.length < 1 ? null : (
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
              {isUserChatsLoading && <p>Loading Chats.....</p>}
              {userChats?.map((chat,index)=>{
                     return (
                     <div key={index}>
                            <UserChat chat={chat} user={user}/>
                     </div>
                     );
              })}iasd
              </Stack>
          
          <p>ChatBox</p>
        </Stack>
      )}
    </Container>
  );
};

export default ChatApp;
