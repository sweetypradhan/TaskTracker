function Header({ text, bg, count }) {
  return (
    <div className={`${bg} flex items-center justify-between h-12 pl-4 pr-4 rounded-md uppercase text-sm text-white shadow-md`}>
      <span>{text}</span>
      <div className="ml-2 bg-white w-6 h-6 text-gray-800 rounded-full flex items-center justify-center font-bold">
        {count}
      </div>
    </div>
  );
}

export default Header;