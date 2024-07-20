import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Login from "./components/login/Login";
import Notif from "./components/notification/Notif";

function App(){

  const user=false;
  return(
  
  <div className="container">
    {user?(<>
      <List/>
      <Chat/> 
      <Detail/>
    </>):(<Login/>)}
    <Notif/>
  </div>
  
)};
export default App