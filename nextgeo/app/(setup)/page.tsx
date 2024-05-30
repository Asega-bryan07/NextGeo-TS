import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NextResponse } from 'next/server';  // for typenarrowing to differentiateresponse type
import { InitialModal } from "@/components/modals/initial-modal";
const SetupPage = async () => {
    const profile = await initialProfile();

    if (profile instanceof NextResponse) {
        // Handle redirection response
        return profile;
    }

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if (server) {
        return redirect(`/servers/${server.id}`);
    }

    return <InitialModal/>;
};

export default SetupPage;
