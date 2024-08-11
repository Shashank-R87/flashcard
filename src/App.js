import { useEffect, useState } from 'react';
import './App.css';
import { supabase } from "./supabaseClient"
import FlashSlider from './components/FlashSlider';

function App() {

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
                <p  className='font-mono text-xl'>No questions found!</p>
                :
                <FlashSlider data={data} />
            }
          </>
      }
    </div>
  );
}

export default App;
