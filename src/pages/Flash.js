import React, { useEffect, useState } from 'react'
import FlashSlider from '../components/FlashSlider'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

function Flash() {

    const navigate = useNavigate();

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const { data, error } = await supabase
                .from('flashcards')
                .select("*")
            if (error) throw error
            if (data != null) {
                setData(data)
                setTimeout(() => {
                    setLoading(false)
                }, 2000)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='flex justify-center items-center h-screen flex-col relative bg-blue-300'>
            <p className='absolute top-20 text-2xl font-semibold font-mono'>A Simple Flashcard Learning Tool</p>
            {
                loading ? <div className='font-mono text-xl'>Loading very hard questions...</div> :
                    <>
                        {
                            data.length == 0 ?
                                <p className='font-mono text-xl'>No questions found!</p>
                                :
                                <FlashSlider data={data} />
                        }
                    </>
            }
            <button onClick={()=>{navigate("/admin", {replace: true})}} className='absolute top-10 right-10 font-mono text-lg font-semibold hover:underline underline-offset-8'>Flash Admin</button>
        </div>
    )
}

export default Flash