import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const songArgs = {
    songName: v.string(),
    wishes: v.optional(v.string()),
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
    });
    }
});

export const get = query({
    handler: async (ctx) => {
        return await ctx.db.query("songs").collect();
    }
});

export const getFileUrl = query({
    args: { fileId: v.id("_storage") },
    handler: async (ctx, args) => {
        return await ctx.storage.getUrl(args.fileId);
    }
})

