import { useEffect, useState } from 'react'
import {useDispatch} from "react-redux"
import './App.css'
import authService from "./Appwrite/auth"
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components/Index'
function App() {
  const [loading, setLoading] = useState(true)
   const dispatch = useDispatch()

    useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData))
      }
      else{
        dispatch(logout())
      }
    })
    .catch((error)=>
    console.log("error to fetch the detail",error)
    )
    .finally(
      ()=>setLoading(false)
    )
   },[])
console.log("ev file data");
  return !loading ? (
   <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
       <Header/>
       <Footer/>
    </div>

   </div>
  ):
  null
}

export default App
