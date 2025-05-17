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
import { Cards, FeaturedCards } from "@/components/Cards";
import Search from "@/components/Search";
import Icons from "@/constants/Icons";
import { useUser } from "@clerk/clerk-expo";
import Filters from "@/components/Filters";

const Home = () => {
    const { user } = useUser();
    const [loading, setIsLoading] = useState(true);
    const params = useLocalSearchParams<{ query?: string; filter?: string }>();
    const EstatesList = useQuery(api.estates.getEstates, params);
    const EstateFeaturedList = useQuery(api.estates.getEstates , {})

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
                            <View className="flex flex-row items-center">
                                <Image
                                    source={{ uri: user?.imageUrl }}
                                    className="size-12 rounded-full"
                                />
                                <View className="flex flex-col items-start ml-2 justify-center">
                                    <Text className="text-xs text-stone-500">Good Morning</Text>
                                    <Text className=" text-base font-medium text-stone-700">
                                        {user?.fullName}
                                    </Text>
                                </View>
                            </View>
                            <Image source={Icons.bell} className="size-6" />
                        </View>
                        {/* end top user info and bell */}

                        {/* start search bar */}
                        <Search />
                        {/* end search bar */}

                        {/* start featured card */}
                        <View className="my-5">
                            <View className="flex flex-row items-center justify-between">
                                <Text className="text-xl font-bold text-stone-700">
                                    Featured
                                </Text>
                                <TouchableOpacity>
                                    <Text className="text-base font-bold text-blue-400">
                                        See All
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <FlatList
                            data={EstateFeaturedList}
                            renderItem={({ item }) => (
                                <FeaturedCards
                                    name={item.name}
                                    address={item.address}
                                    price={item.price}
                                    rating={item.rating}
                                    image={item.image}
                                />
                            )}
                            keyExtractor={(item) => item._id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            bounces={false}
                            contentContainerClassName="flex gap-5 mt-5"
                        />

                        {/* end featured card */}

                        {/* start filter */}

                        <View className="my-5">
                            <View className="flex flex-row items-center justify-between">
                                <Text className="text-xl font-bold text-stone-700">
                                    Our Recommendation
                                </Text>
                                <TouchableOpacity>
                                    <Text className="text-base font-bold text-blue-400">
                                        See All
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Filters />
                        {/* end filter */}
                    </View>
                }
            />
        </SafeAreaView>
    );
};

export default Home;
