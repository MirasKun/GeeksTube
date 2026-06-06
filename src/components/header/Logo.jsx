import { Link } from "react-router-dom";

const Logo = ({ onToggleSidebar }) => (
  <div className="flex items-center gap-4">
    <button
      onClick={onToggleSidebar}
      className="p-2 rounded-full hover:bg-gray-700"
    >
      <img src="/header/BurgerMenu.svg" alt="Burger Menu" className="w-6 h-6" />
    </button>
    <div className="flex items-center gap-1">
      <Link to='/'><img src="/header/YouTube.svg" alt="YouTube" className="w-8 h-8" /></Link>
      <Link to="/"><h1 className="text-white text-xl font-semibold">GeeksTube</h1></Link>
      
    </div>
  </div>
);

export default Logo;
