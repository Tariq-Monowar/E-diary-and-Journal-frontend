import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdDeleteSweep } from "react-icons/md"; 
import { RiQuillPenFill } from "react-icons/ri";

const Home = () => {

  const [findUser, setFindUser] = useState(null)
  const [lodding, setLodding] = useState(true)
  const [error, setError] = useState(null)


  const getAllUser = async()=>{
    try {
      const getUser = await fetch('https://e-diary-and-journal-server-side.onrender.com/api')
      const myData = await getUser.json()
      setError(null)
      setLodding(false)
      setFindUser(myData)
    } catch (error) {
      setError(error.message)
      setLodding(false)
      setFindUser(null)
    }
  }
  useEffect(() => {getAllUser()}, [])
  


  // updateSystem--------------------------------------------
  const [updateKeys, setupdateKeys] = useState(null)
  const updateKey = async()=>{
    try {
        const mykey = await fetch('https://e-diary-and-journal-server-side.onrender.com/api/key')
        const keys = await mykey.json()
        setupdateKeys(keys)
    } catch (error) {
        setError(error.message)
    }
  }
  updateKey()

  const [aggryUpdate, setaggryUpdate] = useState(false)
  const [forUpdatevalue, setForUpdateValue] = useState({
    title: "",
    desc: "",
    userName: ""
  })

  const [updateId, setUpdateId] = useState(null)

  const updateUser = async(_id)=>{
    setaggryUpdate(true)
    setUpdateId(_id)
    const filterUser = findUser.filter(user=>user._id === _id)
    console.log(filterUser[0])
    setForUpdateValue({
      title: filterUser[0].title,
      desc: filterUser[0].desc,
      userName: filterUser[0].userName
    })
  }
   // This function is called when the user makes changes to the input fields in the form
  const ifChange = (e)=>{
    const userFild = e.target.name
    const userValue = e.target.value
    setForUpdateValue(prev=>{
      return {...prev, [userFild]: userValue}
    })
  }


  const ifSubmit = async(e)=>{
    e.preventDefault()
    console.log(forUpdatevalue)
    let updatekeyData = prompt("Enter Your update key")
    if(updatekeyData === updateKeys){
      try {
        const res = await fetch(`https://e-diary-and-journal-server-side.onrender.com/api/${updateId}`,{
          method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(forUpdatevalue)
         })
         getAllUser()
         if(res.ok){
          setaggryUpdate(false)
         }
      } catch (error) {
        setError(error.message)
      }
    }else{
      alert("you are unauthorized! You cannot update any data")
      setaggryUpdate(false)
    }
  }


  //Delete-----------------------------------------
  
  const deleteUser = async(_id)=>{
    let deleteKey = prompt("Enter Youe Delete Key")
    if(deleteKey === updateKeys){
      try {
        await fetch(`https://e-diary-and-journal-server-side.onrender.com/api/${_id}`,{
          method: 'DELETE'
      })
      getAllUser()
      } catch (error) {
        setError(error.message)
      }
    }else{
      alert("you are unauthorized! You cannot update any data")
    }

  }

  return (
    <div>
        <header className='page-header'>

          { aggryUpdate?(

            <div className='form-form-box'>
              <form className='from-form-tag' onSubmit={ifSubmit}>
                <div className='form-element'>
                    <input  
                      className='form-input' 
                      type='text' 
                      name='title'
                      value={forUpdatevalue.title}
                      onChange={ifChange}
                      />
                </div>
                <div className='form-element'>
                    <textarea 
                      className='form-textarea' 
                      type='text' 
                      name='desc' 
                      value={forUpdatevalue.desc} 
                      onChange={ifChange}
                    />
                </div>
                <div className='form-element'>
                    <input 
                      className='form-input' 
                      type='text' 
                      name='userName' 
                      value={forUpdatevalue.userName} 
                      onChange={ifChange}
                    />
                </div>
                  <button 
                    className='form-btn' 
                    type='submit'>
                    Submit
                  </button>
                  <button 
                    className='form-btn' 
                    type='submit' 
                    onClick={()=>setaggryUpdate(false)}>
                    don't update
                  </button>
              </form>
            </div>

        ):( 
            <div>
              <h1 className='page-title'>E-diary and Journal</h1>
              <div className='btn-and-author'>
                <Link 
                  to={'/from'}
                  className="page-header-link-button">
                  Create memoirs
                </Link>
              </div>
            </div>
          )}
          
        </header>

      <section className='event-section'>
        {
          lodding && 
          <h1 className='lodding'>Lodding........</h1>
         }
         {
          error && 
          <p className='error'>internet problem please reload your browser</p>
         }
        {
           findUser &&
           findUser.map(user=>{
             const {title, desc,userName, _id} = user
             return <article key={_id} className='card-article'>
               <h3 className='card-title'>{title}</h3>
               <hr className='card-scall'/>
               <textarea value={desc} className='card-desc'/>
               <h3 className='card-userName'>@{userName}</h3>
              <div className='button-remove-delete'>
                <button 
                    className='card-btn' 
                    onClick={()=>deleteUser(_id)}>
                    <MdDeleteSweep  />
                 </button>
                 <button 
                    className='card-btn' 
                    onClick={()=>updateUser(_id)}>
                    <RiQuillPenFill />
                 </button>
              </div>
             </article>
           })
        }
      </section>
        
    </div>
  )
}

export default Home