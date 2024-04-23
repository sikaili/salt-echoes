import React, { useState } from 'react'
import './Pictures.css'
function Pictures({pics}) {
  const [currentBackground, setCurrentBackground] = useState('')
  return (
    <>
      <h4>
        Passé Imprimé:
      </h4>
      <div className='Pictures'>
        {
          pics.map(item=>(
            <img  
              onMouseEnter={() => setCurrentBackground(item.src)}
              onMouseLeave={() => setCurrentBackground('')}
              src={item.src} key={item.src}/>
          ))
        }
      </div>
      {currentBackground&& <img className="BackgroundPicture" src={currentBackground} />}
    </>
  )
}

export default Pictures