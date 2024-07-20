import { useState } from 'react'
import './chatlist.css'
import Adduser from './addUser/adduser'

function ChatList(){

  const [addMode, setAddMode] =useState(false)
  return (
    
    <div className='chatlist'>
      <div className="search">
        <div className="search-bar">
        <img src="search.png" alt="" />
        <input type="text"  placeholder='Search'/>
        </div>
        <img src={addMode?"./minus.png":"./plus.png"} onClick={()=> 
          setAddMode((prev)=>!prev)} className='add' />
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Shounak</span>
            <p>hello</p>
          </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>diksha</span>
            <p>hello</p>
          </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>papa</span>
            <p>hello</p>
          </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>mumma</span>
            <p>hello</p>
          </div>
      </div>
      {addMode && <Adduser/>}
    </div> 

  )
}

export default ChatList