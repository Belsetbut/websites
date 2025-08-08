import { action } from "@/../../packages/backend/convex/_generated/server";

export const generateUploadUrl = action({
    args: {},
    handler: async (ctx) => {
        return await ctx.storage.generateUploadUrl();
    },
});