"use client";

import { toggleItemStock, removePantryItem } from "@/actions/pantry";
import { pantryItems } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { useState } from "react";

type PantryItem = InferSelectModel<typeof pantryItems>;

type SinglePantryItemProp = {
  item: PantryItem;
  // kind: string,
};

export default function SinglePantryItem({ item }: SinglePantryItemProp) {
  const [crossedOutItem, setCrossedOutItems] = useState<string[]>([]);

  async function handleToggle(id: string, updatedStock: boolean) {
    setCrossedOutItems((prev) =>
      prev.includes(id) ? prev.filter((idx) => idx !== id) : [...prev, id],
    );
    await toggleItemStock(id, updatedStock);
  }
  async function handleRemove(id: string) {
    await removePantryItem(id);
  }

  return (
    <>
      <div
        key={item.id}
        className="flex items-center justify-between border p-3 rounded text-sm"
      >
        <span
          className={
            crossedOutItem.includes(item.id)
              ? "line-through text-neutral-400"
              : ""
          }
          onClick={() => handleToggle(item.id, !item.inStock)}
        >
          {item.name}
        </span>

        <div className="flex gap-2">
          {/* Test Deletion */}
          <form action={() => handleRemove(item.id)}>
            <button
              type="submit"
              className="px-2 py-1 text-xs text-white bg-red-600 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
