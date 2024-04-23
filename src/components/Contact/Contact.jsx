import "./contact.css";
function Contact() {
  return (
    <div className="contact">
      <a
        className="menu-item menu-item--red"
        href="mailto:info@salt-echoes.com?subject=Inquiry from the website&body=Hi there,"
      >
        Email
      </a>

      <a
        className="menu-item menu-item--red"
        href="https://www.youtube.com/@SaltEchoes?sub_confirmation=1"
      >
        YouTube
      </a>
    </div>
  );
}

export default Contact;
