import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Login from "./components/login/Login";
import Notif from "./components/notification/Notif";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";

function App() {
  const { currUser, isLoading, fetchUserInfo } = useUserStore();
  const {chatId} = useChatStore()
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  console.log(currUser);

  if (isLoading) 
    return (
      <div className="loading">
        Loading...
      </div>
    );

  return (
    <div className="container">
      {currUser ? (
        <>
          <List />
          {chatId && <Chat /> }
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
      <Notif />
    </div>
  );
}

export default App;