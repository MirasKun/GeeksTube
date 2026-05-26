const AccordionItem = ({
  label,
  iconName,
  isActive,
  isOpen,
  isExpanded,
  onClick,
}) => {
  const iconSrc = isActive
    ? `/sidebar/selected/${iconName}.svg`
    : `/sidebar/${iconName}.svg`;

  const arrowSrc = isActive
    ? "/sidebar/selected/Arrow.svg"
    : "/sidebar/Arrow.svg";

  return (
    <button
      onClick={onClick}
      className={`flex items-center rounded-xl font-sans text-sm transition-all duration-200 cursor-pointer ${
        isOpen
          ? "w-full px-4 py-2.5 justify-between"
          : "w-12 h-12 justify-center mx-auto"
      } ${isActive ? "bg-red-600/15 text-white font-medium" : "text-zinc-300 hover:bg-white/5 font-normal"}`}
    >
      <div className={`flex items-center ${isOpen ? "gap-5" : ""}`}>
        <span className="w-5 h-5 flex items-center justify-center shrink-0">
          <img
            src={iconSrc}
            alt={label}
            className="w-full h-full object-contain"
          />
        </span>
        <span className={isOpen ? "block" : "hidden"}>{label}</span>
      </div>
      <span
        className={`w-4 h-4 items-center justify-center shrink-0 transition-transform duration-300 ${
          isOpen ? "flex" : "hidden"
        } ${isExpanded ? "rotate-180" : ""}`}
      >
        <img
          src={arrowSrc}
          alt="Arrow"
        />
      </span>
    </button>
  );
};

export default AccordionItem;
