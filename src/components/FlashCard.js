import React, { useState } from 'react'
import { supabase } from '../supabaseClient'

function FlashCard({ data, setLoading, updateData }) {

    const [edit, toggleEdit] = useState(false)
    const [changeMade, setChangeMade] = useState(false)
    const [editedData, setEditedData] = useState({ question: data.question, answer: data.answer })

    const handleEditClick = async () => {
        setLoading(true)
        const { somedata, error } = await supabase
            .from('flashcards')
            .update({ question: editedData.question, answer: editedData.answer })
            .eq('id', data.id)
            .select()
        updateData()
        setLoading(false)
    }

    const handleDelete = async () => {
        setLoading(true)
        const { error } = await supabase
            .from('flashcards')
            .delete()
            .eq('id', data.id)
        updateData()
        setLoading(false)
    }

    return (
        <div onDoubleClick={() => { toggleEdit(true) }} className='grid grid-cols-9 gap-5 bg-slate-100 p-5 rounded-md font-mono'>
            <p className='col-span-1 font-bold'>{data.id}</p>
            {
                edit ?
                    <>
                        <textarea onChange={(e) => { setEditedData({ ...editedData, question: e.target.value }); setChangeMade(true) }} className='col-span-3 border-slate-100 border-2 rounded-md px-5 py-2 outline-none font-mono' rows={5} value={data.question}>{data.question}</textarea>
                        <textarea onChange={(e) => { setEditedData({ ...editedData, answer: e.target.value }); setChangeMade(true) }} className='col-span-3 border-slate-100 border-2 rounded-md px-5 py-2 outline-none font-mono' rows={5} value={data.answer}>{data.answer}</textarea>
                        {
                            changeMade ?
                                <button onClick={() => { toggleEdit(false); setChangeMade(false); handleEditClick() }} className='col-span-2 cursor-pointer justify-center items-center flex'>
                                    <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/000000/edit--v1.png" alt="edit--v1" />
                                </button>
                                :
                                <>
                                    <button className='col-span-1 justify-center cursor-not-allowed items-center flex'>
                                        <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/636363/edit--v1.png" alt="edit--v1" />
                                    </button>
                                    <button onClick={() => { toggleEdit(false) }} className='col-span-1 justify-center items-center flex'>
                                        <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/cancel.png" alt="cancel" />
                                    </button>
                                </>
                        }
                    </>
                    :
                    <>
                        <p className='col-span-3'>{data.question}</p>
                        <p className='col-span-3'>{data.answer}</p>
                        <button className='cursor-pointer' onClick={() => { toggleEdit(true) }}>
                            <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/000000/edit--v1.png" alt="edit--v1" />
                        </button>
                        <button onClick={()=>{handleDelete()}} className='cursor-pointer'>
                            <img width="25" height="25" src="https://img.icons8.com/sf-ultralight-filled/25/filled-trash.png" alt="filled-trash" />
                        </button>
                    </>
            }
        </div>
    )
}

export default FlashCard