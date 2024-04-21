import { NavLink, useNavigate, useLocation } from 'react-router-dom';


export default function ToggleLink({ to, children, ...props }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === to;

  const handleClick = (event) => {
    // If the link is active and is clicked, navigate to the root path
    if (isActive) {
      event.preventDefault(); // Prevent default link behavior
      navigate('/'); // Navigate to the root path
    }
    // If the link is not active, it will navigate to 'to' as usual
  };

  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? 'MenuItem MenuItem--active' : 'MenuItem')}
      onClick={handleClick}
      {...props}
    >
      {children}
    </NavLink>
  );
}
