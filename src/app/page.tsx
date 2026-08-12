import {
  getPantryItems,
  addPantryItem,
  toggleItemStock,
  removePantryItem,
} from "@/actions/pantry";

export default async function Home() {
  // 1. Test Fetching items from DB
  const items = await getPantryItems();

  return (
    <div className="max-w-md mx-auto py-8 space-y-6">
      <h1 className="text-xl font-bold">Actions Test Page</h1>

      {/* 2. Test Inserting an item */}
      <form action={addPantryItem} className="flex gap-2">
        <input
          type="text"
          name="name"
          placeholder="New item (e.g., Eggs)"
          required
          className="border px-3 py-1.5 rounded flex-1 text-sm"
        />
        <button
          type="submit"
          className="bg-black text-white px-3 py-1.5 rounded text-sm font-medium"
        >
          Add Item
        </button>
      </form>

      {/* 3. Render items and test Toggle & Delete */}
      <div className="space-y-2">
        {items.length === 0 && (
          <p className="text-sm text-neutral-500">
            No items yet (or no household selected in Header).
          </p>
        )}

        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border p-3 rounded text-sm"
          >
            <span className={item.inStock ? "" : "line-through text-neutral-400"}>
              {item.name}
            </span>

            <div className="flex gap-2">
              {/* Test Stock Toggle */}
              <form
                action={async () => {
                  "use server";
                  await toggleItemStock(item.id, !item.inStock);
                }}
              >
                <button
                  type="submit"
                  className="px-2 py-1 text-xs border rounded bg-neutral-100 hover:bg-neutral-200"
                >
                  {item.inStock ? "Mark Out" : "Mark In"}
                </button>
              </form>

              {/* Test Deletion */}
              <form
                action={async () => {
                  "use server";
                  await removePantryItem(item.id);
                }}
              >
                <button
                  type="submit"
                  className="px-2 py-1 text-xs text-white bg-red-600 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
