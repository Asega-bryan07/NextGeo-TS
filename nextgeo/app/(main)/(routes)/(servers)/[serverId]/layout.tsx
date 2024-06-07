import { ServerSidebar } from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const serverIdLayout = async ({
    children,
    params, 
}:{
    children: React.ReactNode;
    params: { serverId: string };
}) => {
    const profile = await currentProfile;

    if (!profile) {
        return auth().redirectToSignIn();
    }

    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                profileId: profile.id
                }
            }
        }
    });

    if (!server) {
        redirect("/");
    }

    return (
        <div className="h-full">
            <div className="h-full hidden md:flex w-60 z-20 flex-col fixed inset-y-0">
                <ServerSidebar serverId={params.serverId}/>
            </div>
            <main className="h-full md:pl-60">
            {children}
            </main>
        </div>
    );
}

export default serverIdLayout;