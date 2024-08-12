import React, { useEffect, useState } from 'react'
import { replace, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import FlashCard from '../components/FlashCard';

function AdminDash() {

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn"))
    getLatestID()
    getAllData()
  }, [])

  const logout = () => {
    localStorage.setItem("loggedIn", false)
    navigate("/", { replace: true })
  }

  const getLatestID = async () => {
    const { data, error } = await supabase
      .from('flashcards')
      .select("id")
      .order("id", { ascending: false })
      .limit(1)

    setId(data[0].id + 1)
  }

  const getAllData = async() => {
    const { data, error } = await supabase
    .from('flashcards')
    .select("*")
    .order("id", {ascending: true})

    setData(data)
    setLoading(false)
  }

  const [id, setId] = useState("")
  const [data, setData] = useState(null)

  const handleClick = () => {
    setLoading(true)
    login(user.email, user.password)
  }

  const login = (email, password) => {
    if (email == process.env.REACT_APP_EMAIL) {
      if (password == process.env.REACT_APP_PASSWORD) {
        localStorage.setItem("loggedIn", true)
        setLoggedIn("true")
        setLoading(false)
      }
      else {
        setUser({ email: "", password: "" })
        setLoading(false)
      }
    }
    else {
      setUser({ email: "", password: "" })
      setLoading(false)
    }
  }

  const [add, setAdd] = useState({ question: "", answer: "" })
  const [addCheck, setAddCheck] = useState({ question: false, answer: false })

  const handleAdd = async () => {
    if (add.question == "") {
      setAddCheck({ ...addCheck, question: true })
      return
    }
    if (add.answer == "") {
      setAddCheck({ ...addCheck, answer: true })
      return
    }
    if (add.question != "" && add.answer != "") {
      setLoading(true)
      const { data, error } = await supabase
        .from('flashcards')
        .insert([
          { id: id, question: add.question, answer: add.answer },
        ])
        .select()
      setAdd({ id: "", question: "", answer: "" })
      getLatestID()
      getAllData()
      setLoading(false)
    }
  }

  return (
    <div className="bg-blue-300 h-screen flex justify-center items-center">
      {
        loading ? <>Loading...</>
          :
          <>
            {
              loggedIn === "true" ?
                //Logged In
                <div className='flex justify-center items-center h-screen w-full flex-col relative gap-5 bg-blue-300 p-20'>
                  <p className='font-bold font-mono text-xl absolute top-20'>Flash Admin Panel</p>
                  <button onClick={() => { logout() }} className='absolute top-10 right-10 font-mono text-lg font-semibold hover:underline underline-offset-8'>Logout</button>
                  <div className='grid grid-cols-5 gap-5 w-full h-2/3'>
                    <div className='bg-white p-5 col-span-2 gap-5 rounded-md flex flex-col'>
                      <p className='font-bold font-mono text-xl'>Add new flashcard</p>
                      <input disabled={true} contentEditable={false} className='bg-white cursor-not-allowed border-slate-100 border-2 rounded-md px-5 py-2 outline-none font-mono' value={id} placeholder='ID (Unique Integer)' />
                      <textarea onChange={(e) => { setAdd({ ...add, question: e.target.value }); setAddCheck({ question: false, answer: false }) }} className={`bg-white ${addCheck.question ? "border-red-300" : "border-slate-100"} border-2 rounded-md px-5 py-2 outline-none font-mono`} value={add.question} rows={5} placeholder='Question' />
                      <textarea onChange={(e) => { setAdd({ ...add, answer: e.target.value }); setAddCheck({ question: false, answer: false }) }} className={`bg-white ${addCheck.answer ? "border-red-300" : "border-slate-100"} border-2 rounded-md px-5 py-2 outline-none font-mono`} value={add.answer} rows={5} placeholder='Answer' />
                      <button onClick={() => { handleAdd() }} className='bg-slate-100 rounded-md px-5 py-2 active:scale-95 font-mono'>Add</button>
                    </div>
                    <div className='bg-white p-5 col-span-3 rounded-md flex gap-5 flex-col overflow-scroll overflow-x-hidden'>
                      <p className='font-bold font-mono text-xl'>Edit and delete flash</p>
                      <div className='bg-white col-span-2 gap-4 rounded-md flex flex-col'>
                        {
                          data?.map((item, index) =>(
                            <FlashCard data={item} key={index} setLoading={setLoading} updateData={getAllData} />
                          ))
                        }
                      </div>
                    </div>
                  </div>
                </div>
                :
                //Not Logged In
                <div className='flex flex-col gap-5'>
                  <p className='text-xl font-mono text-center font-bold'>Flash Admin Portal</p>
                  <div className='flex flex-col gap-2'>
                    <input onChange={(e) => { setUser({ ...user, email: e.target.value }) }} className='bg-white rounded-md px-5 py-2 outline-none font-mono' placeholder='Admin email' />
                    <input onChange={(e) => { setUser({ ...user, password: e.target.value }) }} className='bg-white rounded-md px-5 py-2 outline-none font-mono' placeholder='Admin password' />
                  </div>
                  <button onClick={() => { handleClick() }} className='bg-white rounded-md px-5 py-2 hover:scale-105 font-mono active:scale-100'>Login</button>
                  <p className='font-mono'>Cred: admin, admin</p>
                </div>
            }
          </>
      }
    </div>
  );
}

export default AdminDash