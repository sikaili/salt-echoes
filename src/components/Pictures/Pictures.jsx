import React from 'react'
import './Pictures.css'
function Pictures() {
  const hrefs = Array(5).fill('').map((item,index)=>{
    return {
      name: "",
      src: "/imgs/_"+index+".jpg"
    }
  }).reverse();
  return (
    <div className='Pictures'>
      <h4>
        Passé Composé:
      </h4>
      {
        hrefs.map(item=>(
          <img  src={item.src} key={item.src}/>
        ))
      }
    </div>
  )
}

export default Pictures