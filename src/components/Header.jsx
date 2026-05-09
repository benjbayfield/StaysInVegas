export default function Header() {
  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div>
          <span className="text-xl font-bold tracking-tight">Stays in Vegas</span>
          <p className="text-slate-400 text-sm mt-0.5">Find your perfect Las Vegas stay</p>
        </div>
        <div className="text-slate-400 text-sm hidden sm:block">
          Las Vegas, Nevada, USA
        </div>
      </div>
    </header>
  );
}
