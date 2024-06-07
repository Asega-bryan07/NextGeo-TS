import { Server, Member,Profile } from "@prisma/client"

export type serverWithMembersWithProfiles = Server & {
    members: (Member & { profile: Profile})[];
}