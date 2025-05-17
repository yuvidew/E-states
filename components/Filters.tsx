import { Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { categories } from "@/constants/data";

const Filters = () => {
    const params = useLocalSearchParams<{ filter?: string }>();
    const [selectedCategory, setSelectedCategory] = useState(
        params.filter || "All"
    );

    const onCategory = (category: string) => {
        if (selectedCategory === category) {
            setSelectedCategory("All");
            router.setParams({ filter: "All" });

            return;
        }
        setSelectedCategory(category);
        router.setParams({ filter: category });
    };

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-3 mb-2"
        >
            {categories.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => onCategory(item.category)}
                    className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${selectedCategory === item.category
                            ? "bg-blue-500"
                            : "bg-blue-100/80 border border-blue-200"
                        }`}
                >
                    <Text
                        className={` ${selectedCategory === item.category
                                ? "text-white font-bold mt-0.5"
                                : "text-black/75"
                            }`}
                    >
                        {item.title}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default Filters;
