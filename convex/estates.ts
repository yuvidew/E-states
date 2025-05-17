import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const getEstates = query({
    args: {
        query: v.optional(v.string()),
        filter: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("User not authenticated");
        }

        let estatesQuery = await ctx.db.query("estates")

        if (args.query?.length) {
            return estatesQuery
                .withSearchIndex("search_title", (q) => 
                    q.search("name", args.query!)
                )
                .collect();
        }
        if(args.filter?.length && args.filter !== "All"){
            return estatesQuery
            .withIndex("by_type" , q => q.eq("type" , args.filter!))
            .collect();
        }
        
        return estatesQuery
            .order("desc")
            .collect();
    },
})

export const getEstatesById = query({
    args : {
        id : v.id("estates")
    },
    handler : async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        return await ctx.db.get(args.id)
    },
})