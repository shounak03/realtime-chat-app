import { useEffect, useState } from 'react';
import './chatlist.css';
import Adduser from './addUser/adduser';
import { useUserStore } from '../../../lib/userStore';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useChatStore } from '../../../lib/chatStore';

function ChatList() {
  const [addMode, setAddMode] = useState(false);
  const [Chats, setChats] = useState([]);

  const { currUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'userchats', currUser.id), async (res) => {
      const data = res.data();
      if (!data || !data.Chats) {
        setChats([]);
        return;
      }
      
      const items = data.Chats;

      const promises = items.map(async (item) => {
        const userdocRef = doc(db, 'users', item.receiverId);
        const userdocSnap = await getDoc(userdocRef);

        const user = userdocSnap.data();
        return { ...item, user };
      });

      const chatData = await Promise.all(promises);

      setChats(chatData.sort((a, b) => b.updateAt - a.updateAt));
    });

    return () => {
      unSub();
    };
  }, [currUser.id]);

  const handleSelect = async (chat)=>{
    changeChat(chat.chatId ,chat.user)
  }

  return (
    <div className="chatlist">
      <div className="search">
        <div className="search-bar">
          <img src="search.png" alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          src={addMode ? './minus.png' : './plus.png'}
          onClick={() => setAddMode((prev) => !prev)}
          className="add"
        />
      </div>

      {Chats.map((chat) => (
        <div className="item" key={chat.chatId} onClick={()=>handleSelect(chat)}>
          <img src={chat.user.avatar || "./avatar.png" }alt="" />
          <div className="texts">
            <span>{chat.user.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}
      {addMode && <Adduser />}
    </div>
  );
}

export default ChatList;
