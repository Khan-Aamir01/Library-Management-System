export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-500">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
      <p className="mt-4 text-xl text-blue-500">Loading...</p>
    </div>
  );
}
