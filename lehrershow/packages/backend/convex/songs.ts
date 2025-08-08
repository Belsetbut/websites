import { v } from "convex/values";
import { mutation } from "./_generated/server";

const songArgs = {
    songName: v.string(),
    whishes: v.optional(v.string()),
    songLink: v.optional(v.string()),
    songFileId: v.optional(v.id("_storage")),
};

export const createSong = mutation({
    args: songArgs,
    handler: async (ctx, args) => {
        await ctx.db.insert("songs", {
        songName: args.songName,
        wishes: args.wishes,
        songLink: args.songLink,
        songFileId: args.songFileId,
    }),
    },
}),