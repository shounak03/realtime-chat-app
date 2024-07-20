import { useEffect, useRef, useState } from 'react'
import './chat.css'
import EmojiPicker from 'emoji-picker-react'

function Chat(){

  const [emoji, setEmoji] = useState(false)
  const [text, setText] = useState() 
  const endRef = useRef(null)

  useEffect(()=>{
    endRef.current?.scrollIntoView({behaviour:"smooth"})
  },[])
  const handleEmoji = (e)=>{
    setText((prev)=>prev+e.emoji)
    setEmoji(false)
  }
  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>shounak</span>
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
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto aperiam, facilis eveniet aliquid iure consequuntur ad! Placeat similique pariatur esse, rem, illo itaque at explicabo sed est iusto, expedita laborum.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          {/* <img src="./avatar.png" alt="" /> */}
          <div className="texts">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto aperiam, facilis eveniet aliquid iure consequuntur ad! Placeat similique pariatur esse, rem, illo itaque at explicabo sed est iusto, expedita laborum.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto aperiam, facilis eveniet aliquid iure consequuntur ad! Placeat similique pariatur esse, rem, illo itaque at explicabo sed est iusto, expedita laborum.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          {/* <img src="./avatar.png" alt="" /> */}
          <div className="texts">
            <img src="./zen.jpeg" alt="" />
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto aperiam, facilis eveniet aliquid iure consequuntur ad! Placeat similique pariatur esse, rem, illo itaque at explicabo sed est iusto, expedita laborum.</p>
            <span>1 min ago</span>
          </div>
        </div>
          <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
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
        <button className='sendButton'>Send</button>
      </div>
    </div>
  )
}

export default Chat