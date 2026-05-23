const SidebarItem = ({ label, iconName, isActive, isOpen, onClick }) => {
  const iconSrc = isActive
    ? `/sidebar/selected/${iconName}.svg`
    : `/sidebar/${iconName}.svg`;

  return (
    <button
      onClick={onClick}
      className={`flex items-center rounded-xl font-sans text-sm transition-all duration-200 cursor-pointer ${
        isOpen
          ? "w-full gap-5 px-4 py-2.5 justify-start"
          : "w-12 h-12 justify-center mx-auto"
      } ${isActive ? "bg-red-600/15 text-white font-medium" : "text-zinc-300 hover:bg-white/5 font-normal"}`}
    >
      <span className="w-5 h-5 flex items-center justify-center shrink-0">
        <img
          src={iconSrc}
          alt={label}
          className="w-full h-full object-contain"
        />
      </span>
      <span className={isOpen ? "block" : "hidden"}>{label}</span>
    </button>
  );
};

export default SidebarItem;
