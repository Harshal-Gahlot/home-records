import {clerkClient} from "@clerk/nextjs/server"
import {db} from "@/db"
import {households} from "@/db/schema"

export async function ensureHouseholdExist(orgId: string) {
    const client = await clerkClient()
    const org = await client.organizations.getOrganization({
        organizationId: orgId
    })

    await db
        .insert(households)
        .values({
            id: orgId,
            name: org.name || "My Household"
        })
        .onConflictDoNothing();
}
