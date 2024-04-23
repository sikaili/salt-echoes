import React from 'react'
import './Contact.css'
function Contact() {
  return (
    <div className="Contact">           
      <a   className="MenuItem MenuItem--red"
        href="mailto:info@salt-echoes.com?subject=Inquiry from the website&body=Hi there,">Email
      </a>

      <a   className="MenuItem MenuItem--red"
        href="https://www.youtube.com/@SaltEchoes?sub_confirmation=1">YouTube
      </a>
    </div>
  )
}

export default Contact