import React from 'react'

function Success({message}) {
  return (
    <div className=' m-auto w-75 '>
      <div class="alert alert-success p-1 mt-1 w-50 m-auto" role="alert">
           {message}
     </div>
    </div>
  )
}

export default Success
