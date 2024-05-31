import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const NavigationSidebar = async () => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect("/")
    }

    //check other servers that a user is part of
    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    return (
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full
        dark:bg-[#1E1F22]">
            Navigation Sidebar
        </div>
    )
}