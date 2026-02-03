import { Link } from "react-router-dom";

function InventoryListPage() {
  return (
    <div className="w-full h-full flex flex-col items-start justify-start gap-4">
      <div className="w-full h-auto flex items-start justify-start">
        <Link
          to={"/inventory-list/add-product"}
          className="text-left px-3 py-2 rounded cursor-pointer hover:bg-gray-100 text-sm"
        >
          Add Product
        </Link>
      </div>

      <div className="w-full h-auto flex flex-col items-start justify-start gap-4 rounded-lg border border-gray-200 p-4 shadow-md">
        <div className="w-full h-auto flex items-center justify-between gap-4">
          <input
            type="search"
            placeholder="Search inventory..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

export default InventoryListPage;
