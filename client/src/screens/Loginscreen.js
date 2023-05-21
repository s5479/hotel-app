import React,{useState} from 'react'
import axios from 'axios'
import Loader from "../components/Loader";
import Error from "../components/Error";



function Loginscreen() {
    
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [loading, setloading] = useState(false);
const [error, seterror] = useState();


    function login(e){
      e.preventDefault();
        const user = [
            
            email,
            password,
            
        ]
        async function fetchData() {
          try {
            setloading(true)
            const result = await axios.post('/api/users/login', user)
            const result1 = result.data;
            setloading(false)
            localStorage.setItem('currentUser', JSON.stringify(result1))
            window.location.href = '/home';
          } catch (error) {
            setloading(false)
            seterror(true)
            console.log(error);
            
          }
        }
        fetchData();
    }
  return (
    <div className='row justify-content-center mt-5 w-75 m-auto p-5 border shadow-lg '>
    {loading && (<Loader />)}
      <form className='col-md-6 pt-3 border rounded-1  w-75 shadow-lg '>
    {error && (<Error message='Invalid Credentials'/>)} 
  <div className="form-group text-left">
    <label htmlFor="exampleInputEmail1 ">Email address</label>
    <input value={email} onChange={(e) => {setemail(e.target.value)}} type="email" className="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  <div className="form-group text-left">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input value={password} onChange={(e) => {setpassword(e.target.value)}} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>
  
  
  <button type="submit" className="btn btn-dark mb-2" onClick={login}>Login</button>
</form>
    </div>
  )
}

export default Loginscreen
