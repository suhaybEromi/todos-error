export default function TableStyle({ todos }) {
  return (
    <div className="grid grid-cols-26 w-full max-w-7xl mx-auto font-poppins font-bold text-lg">
      <div className="col-span-26 lg:col-span-7 xl:col-span-8">
        <p className="px-2 lg:px-4 py-2 border border-gray-300 bg-slate-950">
          {todos}
        </p>
      </div>

      <div className="col-span-4 xl:col-span-3 hidden lg:block">
        <p className="px-4 py-2 border border-gray-300 bg-slate-950">Status</p>
      </div>

      <div className="col-span-4 hidden lg:block">
        <p className="px-4 py-2 border border-gray-300 bg-slate-950">Type</p>
      </div>

      <div className="col-span-5 hidden lg:block">
        <p className="px-4 py-2 border border-gray-300 bg-slate-950">Date</p>
      </div>

      <div className="col-span-2 hidden lg:block">
        <p className="px-4 py-2 border border-gray-300 bg-slate-950 text-center">
          View
        </p>
      </div>

      <div className="col-span-2 hidden lg:block">
        <p className="px-4 py-2 border border-gray-300 bg-slate-950 text-center">
          Update
        </p>
      </div>

      <div className="col-span-2 hidden lg:block">
        <p className="px-4 py-2 border border-gray-300 bg-slate-950 text-center">
          Delete
        </p>
      </div>
    </div>
  );
}
