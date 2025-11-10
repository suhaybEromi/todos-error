export default function TableStyle({ todos }) {
  return (
    <div className="grid grid-cols-26 w-315 mx-auto font-poppins font-bold text-lg">
      <div className="col-span-8">
        <p className="px-4 py-2 border border-gray-300">{todos}</p>
      </div>

      <div className="col-span-3">
        <p className="px-4 py-2 border border-gray-300">Status</p>
      </div>

      <div className="col-span-4">
        <p className="px-4 py-2 border border-gray-300">Type</p>
      </div>

      <div className="col-span-5">
        <p className="px-4 py-2 border border-gray-300">Date</p>
      </div>

      <div className="col-span-2">
        <p className="px-4 py-2 border border-gray-300 text-center">View</p>
      </div>

      <div className="col-span-2">
        <p className="px-4 py-2 border border-gray-300 text-center">Update</p>
      </div>

      <div className="col-span-2">
        <p className="px-4 py-2 border border-gray-300 text-center">Delete</p>
      </div>
    </div>
  );
}
