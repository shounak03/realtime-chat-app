import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useChatStore } from '../../lib/chatStore'
import { auth, db } from '../../lib/firebase'
import { useUserStore } from '../../lib/userStore';
import './detail.css'
import upload from '../../lib/upload';

function Detail(){

  const {chatId, user, isCurrentUserBlocked,isReceiverBlocked, changeBlock} = useChatStore();
  const {currUser} = useUserStore()

  const handleBlock = async()=>{
    if(!user) return;

    const userDocRef = doc(db,"users",currUser.id)

    try{
      await updateDoc(userDocRef,{
        blocked: isReceiverBlocked? arrayRemove(user.id) : arrayUnion(user.id)
      });
      changeBlock()
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='detail'>
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, voluptatibus. Porro tempore quibusdam eum aperiam dolor hic numquam, voluptatum soluta commodi unde rerum explicabo. Asperiores magnam mollitia rem alias ab.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy and help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
          
        </div>
        <div className="option">
          <div className="title">
            <span>shared photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photo-item">
              <div className="photo-detail">
                <img src="./zen.jpeg" alt="" />
                <span>photo_2345689.png</span>
              </div>
              <img src="./download.png" className='icon' alt="" />
            </div>
            <div className="photo-item">
              <div className="photo-detail">
                <img src="./zen.jpeg" alt="" />
                <span>photo_2345689.png</span>
              </div>
              <img src="./download.png" className='icon' alt="" />
            </div>
            <div className="photo-item">
              <div className="photo-detail">
                <img src="./zen.jpeg" alt="" />
                <span>photo_2345689.png</span>
              </div>
              <img src="./download.png" className='icon' alt="" />
            </div>
            <div className="photo-item">
              <div className="photo-detail">
                <img src="./zen.jpeg" alt="" />
                <span>photo_2345689.png</span>
              </div>
              <img src="./download.png" className='icon' alt="" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button>{
          isCurrentUserBlocked? "You are Blocked":
          isReceiverBlocked? "User Blocked":
          "Block User"

          }</button>
        <button className='logout' onClick={()=>auth.signOut()}>Log-Out </button>
      </div>
    </div>
  )
}

export default Detail