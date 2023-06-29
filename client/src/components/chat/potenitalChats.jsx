import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PotenitalChats = () => {
       const {user}=useContext(AuthContext);
       const {potenitalChats,createChat} =useContext(ChatContext);

       return (<>
       <div className="all-users" >
              {potenitalChats&& potenitalChats.map((u,index)=>{
                     return(

                     <div className="single-user" key={index} onClick={()=>createChat(user._id,u._id)}>
                            {u.name}
                            <span className="user-online"></span>
                     </div>
                     );

              })}
       </div>
       </>);
}
 
export default PotenitalChats;