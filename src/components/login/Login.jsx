import { useState } from 'react'
import './login.css'
import { toast } from 'react-toastify'
import { auth, db } from '../../lib/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import upload from '../../lib/upload'

function Login(){

    const [avatar, setavatar] = useState({
        file :null,
        url:""
    })

    const handleAvatar = e=>{
        if(e.target.files[0]){
        setavatar({
            file:e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
        })}
    }

    const handleLogin=e=>{
        e.preventDefault()
        toast.success("Logged-in")
    }
    const handleRegister= async e=>{

        e.preventDefault()
        const formData = new FormData(e.target)
        const {username, email, password} = Object.fromEntries(formData)
        try{
            const res = await createUserWithEmailAndPassword(auth,email,password)
            const imageUrl = await upload(avatar.file)
            await setDoc(doc(db,"users",res.user.uid),{
                username,
                email,
                avatar:imageUrl,
                id:res.user.uid,
                blocked:[]
            });

            await setDoc(doc(db,"userchats",res.user.uid),{
                chats:[]
            });
            toast.success("account created successfully")
        }catch(err){
            console.log(err);
            toast.error(err.message )
        }
    }
    return (
    <div className='login'>
        
        <div className="item">
            <h2>Welcome back,</h2>
            <form action="" onSubmit={handleLogin}>
                <input type="text" placeholder='Email' name='email'/>
                <input type="password" placeholder='Password' name="password" />
                <button>Sign In</button>
            </form>
        </div>
        <div className="seperator"></div>
        <div className="item">

        <h2>Create an Account</h2>
            <form onSubmit={handleRegister}>
                <label htmlFor="file">
                    <img src={avatar.url || "./avatar.png"} alt="" />
                    Upload an image
                </label>
                <input type="file" id='file' style={{display:"none"}} onChange={handleAvatar}/>
                <input type="text" placeholder='Username' name='username'/>
                <input type="text" placeholder='Email' name='email'/>
                <input type="password" placeholder='Password' name="password" />
                <button>Sign Up</button>
            </form>
        </div>
    </div>
  )
}

export default Login