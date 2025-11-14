export default function Header() {
  return (
    <header className="w-full h-[100px] bg-white flex items-center px-4 mb-2 shadow-md">
      <div className="flex items-center gap-4 pl-3.5">
        <img 

          src="/assets/logo-inventariomaker.png" 
          alt="Logo Inventário Maker"
        />

        <h1 className="text-[30px] leading-tight">
          <p>Inventário</p>
          <p>Maker</p>
        </h1>
      </div>
    </header>
  );
}
