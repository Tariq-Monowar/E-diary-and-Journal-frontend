import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

  const UserForm = () => {
    const navigate = useNavigate()

    const [inputData, setInputData] = useState({
        title: "",
        desc: "",
        userName: ""
    })
    const [error, setError] = useState(null)

    const [createKeys, setCreateKeys] = useState(null)
    
    const createKey = async()=>{
      try {
          const mykey = await fetch('https://e-diary-and-journal-server-side.onrender.com/api/key')
          const keys = await mykey.json()
          setCreateKeys(keys)
      } catch (error) {
          setError(error.message)
      }
    }
    createKey()

    const ifChange = async (e)=>{
        const userFild = e.target.name
        const userValue = e.target.value

        setInputData((prev)=>{
            return {...prev, [userFild]: userValue}
        })
    }
    const createUser = async ()=>{
        try {
           const res =  await fetch('https://e-diary-and-journal-server-side.onrender.com/api',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputData)
            })
            console.log(res)
            if(res.ok){
               navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    const ifSubmit = (e)=>{
        e.preventDefault()
        let data = prompt("Enter Your Create Key: ")
        if(data===createKeys){
            inputData && createUser() && console.log(inputData)
        }else{
            alert("Hay Who are Yoy! you don't create any data without create key")
        }
        
    }


  return (
    <div className='userForm'>
    {
        error&&
        <h2>{error}</h2>
    }
    <h1 className='userForm-page-title'>Save your memories</h1>
        <form onSubmit={ifSubmit}>
            <div className='user-form-div'>
                <input 
                 className='user-form-input'
                 type='text' 
                 placeholder='Title' 
                 name='title' 
                 onChange={ifChange}
                 required
                 />
            </div>
            <div className='user-form-div'>
                <textarea 
                 className='user-form-textarea'
                 type='text' 
                 placeholder='Description' 
                 name='desc' 
                 onChange={ifChange}
                 required
                 />
            </div>
            <div className='user-form-div'>
                <input 
                  className='user-form-input' 
                  type='text' 
                  placeholder='your Name' 
                  name='userName' 
                  onChange={ifChange} 
                  required
                />
            </div>
            <button 
              className='user-form-btn' 
              type='submit'>
              Submit
            </button>
            <button 
              className='user-form-btn' 
              onClick={()=>navigate('/')}>
              Go to home
            </button>
        </form>
    </div>
  )
}

export default UserForm