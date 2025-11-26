'use client'

import { signout } from "@/app/(auth)/actions"
import { Button } from "@/components/ui/button"

export function SignOutButton() {
    return (
        <form action={signout}>
            <Button type="submit" variant="outline">
                Sign Out
            </Button>
        </form>
    )
}
