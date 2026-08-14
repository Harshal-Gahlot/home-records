import { getPantryItems, addPantryItem } from "@/actions/pantry";

import SinglePantryItem from "@/components/singlePantryItem";

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
          placeholder="New item (e.g., milk)"
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

        <div>
          <div>
            <h2>In stock</h2>
            {items
              .filter((item) => item.inStock)
              .map((item) => (
                <div>{<SinglePantryItem item={item} />}</div>
              ))}
          </div>
          <div>
            <h2>Out of stock</h2>
            {items
              .filter((item) => !item.inStock)
              .map((item) => (
                <div>{<SinglePantryItem item={item} />}</div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
