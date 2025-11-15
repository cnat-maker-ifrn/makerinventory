export default function Header() {
  return (
    <header className="w-full h-[100px] bg-white flex items-center px-4 mb-2 shadow-md">
      <div className="flex items-center gap-4 pl-[10px]">
        <img 
          className="w-[85px] h-[85px]"
          src="/assets/logo-inventariomaker.svg" 
          alt="Logo Inventário Maker"
        />

        <h1 className="text-[30px] flex flex-col items-start leading-tight logo-font">
          <span className="font-light">Inventário</span>
          <span className="font-bold ml-5">Maker</span>
        </h1>
      </div>
    </header>
  );
}
