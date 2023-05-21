import React, {useState} from 'react'
import axios from 'axios'
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from '../components/Success';

function Registerscreen() {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [cpassword, setcpassword] = useState('')
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();

    function register(e){
    e.preventDefault()
        const user = [
            name,
            email,
            password,
            cpassword
        ]
       
        // console.log(user)
       
          async function fetchData() {
            try {
              setloading(true)
              const result = await axios.post('/api/users/register', user)
              const result1 = result.data;
              console.log(result1)
              setloading(false)
              setsuccess(true)

              setname('')
              setemail('')
              setpassword('')
              setcpassword('')
            } catch (error) {
              setloading(false)
              seterror(true)
              console.log(error);
              
            }
          }
          fetchData();
    }
  return (
    <div className='mt-2'>
      {loading && (<Loader />)}
    {error && (<Error />)}

    <div className='row justify-content-center  w-75 m-auto p-1   shadow-lg  '>


      <form className='col-md-6 p-3  border rounded-1  w-50 shadow-lg '>
  <div className="form-group text-left">

    <label htmlFor="exampleInputEmail1" className='mb-0'>Name</label>
    <input value={name} onChange={(e) => {setname(e.target.value)}} type="text" className="form-control" id="exampleInputname" aria-describedby="nameHelp" placeholder="Enter your name" required/>
  </div>
  <div className="form-group text-left">
    <label htmlFor="exampleInputEmail1 " className='mb-0'>Email address</label>
    <input value={email} onChange={(e) => {setemail(e.target.value)}} type="email" className="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  <div className="form-group text-left">
    <label htmlFor="exampleInputPassword1" className='mb-0'>Password</label>
    <input value={password} onChange={(e) => {setpassword(e.target.value)}} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>
  <div className="form-group text-left">
    <label htmlFor="exampleInputPassword1" className='mb-0'>Confirm Password</label>
    <input value={cpassword} onChange={(e) => {setcpassword(e.target.value)}} type="password" className="form-control " id="exampleInputPassword2" placeholder="Confirm Password"/>
  </div>
  
  <button type="submit" className="btn btn-dark " onClick={register}>Register</button>
</form>
  

    </div>
    {success && (<Success message="Registration Success" />)}

    </div>
  )
}

export default Registerscreen
