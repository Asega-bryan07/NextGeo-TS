import { auth } from "@clerk/nextjs/server";

import { db } from "./db";

export const currentProfile: any = async () => { // added : any
    const {userId} = auth();

    if (!userId) {
        return null;
    }

    const profile = await db.profile.findUnique({
        where: {
            userId
        }
    });

    return profile;
}