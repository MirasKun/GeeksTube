import { Link } from "react-router-dom";

const Logo = ({ onToggleSidebar }) => (
  <div className="flex items-center gap-1 sm:gap-4">
    <button
      onClick={onToggleSidebar}
      className="p-1.5 sm:p-2 rounded-full hover:bg-gray-700 shrink-0"
    >
      <img src="/header/BurgerMenu.svg" alt="Burger Menu" className="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
    <div className="flex items-center gap-1">
      <Link to='/'><img src="/header/YouTube.svg" alt="YouTube" className="w-7 h-7 sm:w-8 sm:h-8" /></Link>
      <Link to="/"><h1 className="text-white text-sm sm:text-xl font-semibold max-[420px]:hidden">GeeksTube</h1></Link>
    </div>
  </div>
);

export default Logo;
