"use server";

import {auth} from "@clerk/nextjs/server"
import {db} from "@/db"
import {eq, desc, and} from "drizzle-orm"
import {revalidatePath} from "next/cache"
import {pantryItems} from "@/db/schema"

// GET: fetch all pantry items of user's household
export async function getPantryItems() {
    const {orgId} = await auth();
    if (!orgId) return []; // if user not in any household

    return await db
        .select()
        .from(pantryItems)
        .where(eq(pantryItems.householdId, orgId))
        .orderBy(desc(pantryItems.createdAt));
}

// POST: pantry Items
export async function addPantryItem(formData: FormData) {
    const {orgId, userId} = await auth();
    if (!orgId || !userId) throw new Error("Unauthorized: Must select a  household")
    
    const name = formData.get("name") as string;
    if (!name || !name.trim()) return;

    await db.insert(pantryItems).values({
        id: crypto.randomUUID(),
        householdId: orgId,
        name: name.trim(),
        inStock: true,
        lastUpdatedBy: userId
    });

    revalidatePath("/");
}

// PATCH: inStock state update
export async function toggleItemStock(id: string, inStock: boolean) {
    const { orgId, userId } = await auth();
    if (!orgId || !userId) throw new Error("Unauthorized")

    await db
        .update(pantryItems)
        .set({
            inStock,
            lastUpdatedBy: userId
        })
        .where(
            and(
                eq(pantryItems.id, id),
                eq(pantryItems.householdId, orgId)
            )
        )
    // revalidatePath("/");
}

// DELETE: remove an item from the pantry
export async function removePantryItem(id: string) {
    const {orgId} = await auth()
    if (!orgId) throw new Error("Unauthorized")

    await db
        .delete(pantryItems)
        .where(
            and(
                eq(pantryItems.id, id),
                eq(pantryItems.householdId, orgId)
            )
        )
    revalidatePath("/");
}
