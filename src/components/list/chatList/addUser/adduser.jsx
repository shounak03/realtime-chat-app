import { useState } from 'react';
import { db } from '../../../../lib/firebase';
import './adduser.css'
import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { useUserStore } from '../../../../lib/userStore';

function Adduser(){

  const [user, setUser] = useState(null)

  const {currUser} = useUserStore()

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");
  
    try {
      const newChatRef = doc(chatRef);
  
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: []
      });
  
      const chatData = {
        chatId: newChatRef.id,
        lastMessage: "",
        updateAt: Date.now(),
      };
  
      const updateUserChat = async (userId, receiverId) => {
        const userChatDocRef = doc(userChatsRef, userId);
        const userChatDoc = await getDoc(userChatDocRef);
  
        if (userChatDoc.exists()) {
          await updateDoc(userChatDocRef, {
            Chats: arrayUnion({
              ...chatData,
              receiverId: receiverId,
            })
          });
        } else {
          await setDoc(userChatDocRef, {
            Chats: [{
              ...chatData,
              receiverId: receiverId,
            }]
          });
        }
      };
  
      await updateUserChat(user.id, currUser.id);
      await updateUserChat(currUser.id, user.id);
  
      // Update or create user document in 'users' collection
      await setDoc(doc(db, 'users', user.id), {
        username: user.username,
        avatar: user.avatar || null,
        // any other relevant user data
      }, { merge: true });
  
    } catch (err) {
      console.log(err);
    }
  };
  

  const handleSearch = async (e)=>{
    e.preventDefault()
    const formData = new FormData(e.target); 
    const username = formData.get("username")

    try{
        const userRef = collection(db, "users");
        const q = query(userRef , where("username", "==", username));
        const querySnapShot = await getDocs(q)

        if(!querySnapShot.empty){
          setUser({...querySnapShot.docs[0].data(), id: querySnapShot.docs[0].id})
        }

    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='adduser'>
        <form onSubmit={handleSearch}> 
            <input type="text" placeholder='Username' name='username' />
            <button>Search</button>
        </form>
        { user && <div className='user'>
            <div className="detail">
                <img src={user.avatar || "./avatar.png"} alt={user.username} />
                <span>{user.username}</span>
            </div>
            <button onClick={handleAdd}>Add User</button>
        </div>}
        
    </div>
  )
}

export default Adduser