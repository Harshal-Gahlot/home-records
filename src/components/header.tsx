"use client";

import {
    SignInButton,
    // SignedIn,
    // SignedOut,
    UserButton,
    OrganizationSwitcher,
    Show
} from "@clerk/nextjs";

export function Header() {
    return (
        <header className="border-b px-4 py-3 flex items-center justify-between bg-background">
            <div className="font-semibold text-lg">
                Home Records
            </div>
            <div>
                <Show>
                    <Show.IfLoaded>
                        <Show.IfSignedIn>
                            <OrganizationSwitcher
                                hidePersonal
                                afterSelectOrganizationUrl="/"
                                afterCreateOrganizationUrl="/"
                            / >
                            <UserButton />
                        </Show.IfSignedIn>
                        <Show.IfSignedOut>
                            <SignInButton mode="modal">
                                <button className="px-3 py-1.5 text-sm bg-neutral-900 text-neutral-50 rounded-md hover:bg-neutral-800 transition-colors">Sign In</button>
                            </SignInButton>
                        </Show.IfSignedOut>
                    </Show.IfLoaded>
                </Show>
            </div> 
        </header>
    );
}
