import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    estates: defineTable({
        name: v.string(),
        type: v.string(),
        description: v.string(),
        address: v.string(),
        geolocation: v.string(),
        price: v.number(),
        area: v.number(),
        bedrooms: v.number(),
        bathrooms: v.number(),
        rating: v.number(),
        facilities: v.array(v.string()),
        image: v.string(),
        agent: v.string(),
        reviews: v.array(v.string()),
        gallery: v.array(v.string()),
    })
    .index("by_type" , ["type"])
    .searchIndex("search_title", {
        searchField: "name",
        filterFields: ["type"],
    }),
});
