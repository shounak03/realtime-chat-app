import { ToastContainer } from 'react-toastify'
// import './notif.scss'
import "react-toastify/dist/ReactToastify.css";
function Notif(){
  return (
    <div className='notif'>
        <ToastContainer position='bottom-right'/>
    </div>
  )
}

export default Notif