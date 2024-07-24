import { useEffect, useRef, useState } from 'react'
import './chat.css'
import EmojiPicker from 'emoji-picker-react'
import { doc,getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'
import { arrayUnion } from 'firebase/firestore'
import { useUserStore } from '../../lib/userStore'
import upload from '../../lib/upload'

function Chat(){

  
  const [chat, setChat] = useState();
  const [emoji, setEmoji] = useState(false)
  const [text, setText] = useState()
  const[img, setImg] = useState({
    file:null,
    url:"",
  })
  
  const endRef = useRef(null)

  const {chatId, user, isCurrentUserBlocked,isReceiverBlocked} = useChatStore()
  const {currUser} = useUserStore()

  useEffect(()=>{
    endRef.current?.scrollIntoView({behaviour:"smooth"})
  },[])

  console.log(chat);

  useEffect(()=>{
    const unSub = onSnapshot(doc(db,"chats",chatId),(res)=>{
      setChat(res.data())
    })
    return()=>{
      unSub()
    }
  },[chatId]);

  const handleEmoji = (e)=>{
    setText((prev)=>prev+e.emoji)
    setEmoji(false)
  }

  const handleImg = e=>{
    if(e.target.files[0]){
      setImg({
          file:e.target.files[0],
          url: URL.createObjectURL(e.target.files[0])
      })}
  }

  const sendMsg =async()=>{
    if(text=="")
      return
    let imgUrl = null;
    try{

      if(img.file){
        imgUrl = await upload(img.file)
      }
      await updateDoc(doc(db,"chats",chatId),{
        messages:arrayUnion({
          senderId:currUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && {img:imgUrl}),
        }),
      });

      const userIDs = [currUser.id, user.id];

      userIDs.forEach(async(id)=>{

        const userChatsRef = doc(db,"userchats", id)
        const userChatsSnapshots = await getDoc(userChatsRef)
        
        if(userChatsSnapshots.exists()){
          
          const userChatsData = userChatsSnapshots.data()
          const chatIndex = userChatsData.chats.findIndex((c)=>c.chatId === chatId)
         
          if(chatIndex!==-1){

            userChatsData.chats[chatIndex].lastMessage = text;
            userChatsData.chats[chatIndex].isSeen = currUser.id?true:false;
            userChatsData.chats[chatIndex].updatedAt = Date.now();
            
            await updateDoc (userChatsRef,{
              chats: userChatsData.chats,
            })
          }
          
          
        }
      })
        
    }catch(err){
      console.log(err);
    }

    setImg({
      file:null,
      url:"",
    });

    setText("");
  };


  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src={user?.avatar ||"./avatar.png"} alt="" />
          <div className="texts">
            <span>{user?.username}</span>
            <p>Levi</p>
          </div>
          </div>
          <div className="icons">
            <img src="./phone.png" alt="" />
            <img src="./video.png" alt="" />
            <img src="./info.png" alt="" />
          </div>
        </div>
      <div className="center">
       { 
        chat?.messages?.map((message)=>(
          <div className={message.senderId === currUser?.id? "message own": "message"} key={message?.createAt}>
          <div className="texts">
            {message.img && <img src={message.img} alt="" />}
            <p>{message.text}</p>
            {/* <span>{message.createAt}</span> */}
          </div>
        </div>
        ))}
        {img.url && 
        (<div className="message own">
          <div className="texts">
            <img src={img.url} alt="" />
          </div>
        </div>)
        }

      <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="" />
          </label>
          <input type="file" id="file" style={{display:"none"}} onChange={handleImg}
          disabled={isCurrentUserBlocked || isReceiverBlocked}/>
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input type="text" value={text} placeholder='Type...' onChange={(e)=>setText(e.target.value)}/>
        <div className='emoji'>
          <img src="./emoji.png" alt="" onClick={()=> setEmoji((prev)=>(!prev))} />
          <div className="picker">

            <EmojiPicker open={emoji} onEmojiClick={handleEmoji}/>
          </div>
        </div>
        <button className='sendButton' onClick={sendMsg} disabled={isCurrentUserBlocked || isReceiverBlocked}>Send</button>
      </div>
    </div>
  )
}

export default Chat