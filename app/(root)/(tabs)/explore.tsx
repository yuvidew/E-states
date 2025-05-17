import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Cards} from "@/components/Cards";
import Search from "@/components/Search";
import Icons from "@/constants/Icons";
import Filters from "@/components/Filters";

const Explore = () => {
    const [loading, setIsLoading] = useState(true);
    const params = useLocalSearchParams<{ query?: string; filter?: string }>();
    const EstatesList = useQuery(api.estates.getEstates, params);

    useEffect(() => {
        if (EstatesList !== undefined) {
            setIsLoading(false);
        }
    }, [EstatesList]);

    const handleCardPress = (id: string) => router.push(`/properties/${id}`);

    return (
        <SafeAreaView>
            <FlatList
                data={EstatesList || []}
                renderItem={({ item }) => (
                    <Cards
                        name={item.name}
                        address={item.address}
                        price={item.price}
                        rating={item.rating}
                        image={item.image}
                        onPress={() => handleCardPress(item._id)}
                    />
                )}
                keyExtractor={(item) => item._id}
                numColumns={2}
                contentContainerClassName="pb-32"
                columnWrapperClassName="flex gap-5 px-5"
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    loading ? (
                        <ActivityIndicator size={"large"} className="text-[#C67C4E] mt-7" />
                    ) : null
                }
                ListHeaderComponent={
                    <View className="px-5">
                        {/* start top user info and bell */}
                        <View className="flex flex-row items-center justify-between mt-5">
                            <TouchableOpacity onPress={() => router.back()} className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                                <Image source={Icons.backArrow} className="size-6" />
                            </TouchableOpacity>
                            <Text className=" text-base text-center mr-2 font-rubik-medium text-black-300">Search for your Ideal Home</Text>
                            <Image source={Icons.bell} className="size-6" />
                        </View>
                        {/* end top user info and bell */}

                        {/* start search bar */}
                        <Search />
                        {/* end search bar */}

                        {/* start filter */}

                        <View className="mt-5">
                        <Filters />
                        <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                            Found {EstatesList?.length} Properties
                        </Text>
                        </View>
                        {/* end filter */}
                    </View>
                }
            />
        </SafeAreaView>
    );
}

export default Explore