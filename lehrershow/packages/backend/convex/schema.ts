import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  songs: defineTable({
    songName: v.string(),
    songLink: v.optional(v.string()),
    songFileId: v.optional(v.id("_storage")),
    wishes: v.optional(v.string()),
    editedFile: v.optional(v.id("_storage")),
    feedback: v.optional(v.string()),
  }),
});
