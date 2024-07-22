import { useState } from 'react';
import { db } from '../../../../lib/firebase';
import './adduser.css'
import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { useUserStore } from '../../../../lib/userStore';

function Adduser(){

  const [user, setUser] = useState(null)

  const {currUser} = useUserStore()

  const handleAdd = async ()=>{


      const chatRef = collection(db,"chats")
      const userChatsRef = collection(db,"userchats")

      try{

        const newChatRef = doc(chatRef)

        await setDoc(newChatRef,{
          createdAt: serverTimestamp(),
          messages: [] 
        })
        await updateDoc(doc(userChatsRef, user.id),{
          chats: arrayUnion({
            chatId : newChatRef.id,
            lastMessage:"",
            receiverId: currUser.id,
            updateAt: Date.now(),
          })
        });
        await updateDoc(doc(userChatsRef, currUser.id),{
          chats: arrayUnion({
            chatId : newChatRef.id,
            lastMessage:"",
            receiverId: user.id,
            updateAt: Date.now(),
          })
        });
      }catch(err){
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
          setUser(querySnapShot.docs[0].data())
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
                <img src={user.avatar || "./avatar.png"} />
                <span>{user.username}</span>
            </div>
            <button onClick={handleAdd}>Add User</button>
        </div>}
        
    </div>
  )
}

export default Adduser