import { useUserStore } from '../../../lib/userStore';
import './userinfo.css'

function UserInfo(){

  const { currUser } = useUserStore();
  return (
    <div className='userInfo'>
       <div className="user">
        <img src={currUser.avatar || "./avatar.png"} alt="" />
        <h2>{currUser.username} </h2>
       </div>
       <div className="icons">
        <img src="./more.png" alt="" />
        <img src="./video.png" alt="" />
        <img src="./edit.png" alt="" />
       </div>
    </div>
  )
}

export default UserInfo