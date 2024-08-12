import React, { useEffect, useState } from 'react'

function FlashSlider({ data }) {

  const [cardindex, setCardIndex] = useState(0)
  const [flip, setFlip] = useState(false)

  const nextCard = () => {
    setFlip(false)
    if (cardindex == data.length - 1) {
      setCardIndex(0)
    }
    else {
      setCardIndex(cardindex + 1)
    }
  }

  const prevCard = () => {
    setFlip(false)
    if (cardindex == 0) {
      setCardIndex(data.length - 1)
    }
    else {
      setCardIndex(cardindex - 1)
    }
  }

  return (
    <div className='relative w-[40%] h-[50%]'>
      <img onClick={() => { prevCard() }} className='absolute top-[50%] -left-16 cursor-pointer' width="26" height="26" src="https://img.icons8.com/metro/26/000000/sort-left.png" alt="sort-left" />
      <img onClick={() => { nextCard() }} className='absolute top-[50%] -right-16 cursor-pointer' width="26" height="26" src="https://img.icons8.com/metro/26/000000/sort-right.png" alt="sort-left" />
      <div className='w-[100%] h-[100%] overflow-hidden flex rounded-md'>
        {
          data.map((card, index) => (
            <div onClick={()=>{setFlip(!flip)}} style={{ translate: `${-100 * cardindex}%`, backfaceVisibility: "hidden", transformStyle: "preserve-3d", transform: flip ? "rotateY(180deg)" : "rotateY(0deg)" }} div className='card bg-white block relative font-mono w-[100%] rounded-md shadow-md cursor-pointer hover:-translate-y-1 transition-all ease-in-out hover:shadow-xl shrink-0 grow-0' key={index} >
              <div onClick={()=>{setFlip(!flip)}} style={{ backfaceVisibility: "hidden"}} className='w-full p-10 h-full absolute flex flex-col gap-2'>
                <p className='text-gray-500 font-medium text-sm'>{card.id}</p>
                <p className='font-bold text-xl'>{card.question}</p>
              </div>
              <div onClick={()=>{setFlip(!flip)}} style={{transform: "rotateY(180deg)",  backfaceVisibility: "hidden"}} className='flex p-10 justify-center items-center w-full h-full absolute bg-white'>
                <p className='font-bold text-xl'>{card.answer}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div >
  )
}

export default FlashSlider