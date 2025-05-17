import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import Images from "@/constants/Images";
import Icons from "@/constants/Icons";

interface FeaturedCardsProps {
    onPress?: () => void;
    rating: number;
    name: string;
    address: string;
    price: number;
    image: string;
}

interface CardsProps {
    onPress?: () => void;
    rating: number;
    name: string;
    address: string;
    price: number;
    image: string;
}

export const FeaturedCards = ({
    onPress,
    name,
    address,
    rating,
    image,
    price,
}: FeaturedCardsProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex flex-col items-start w-60 h-80 relative"
        >
            <Image source={{
                uri : image
            }} className="size-full rounded-2xl" />
            <Image
                source={Images.cardGradient}
                className="size-full rounded-2xl absolute bottom-0"
            />

            <View className="flex flex-row items-center bg-white/95 px-3 py-1.5 rounded-full absolute top-5 right-5">
                <Image source={Icons.star} className="size-3.5" />
                <Text className="text-xs font-bold text-stone-900 ml-1">{rating}</Text>
            </View>

            <View className="flex flex-col text-start absolute bottom-5 inset-x-5">
                <Text className="text-xl font-extrabold text-white" numberOfLines={1}>
                    {" "}
                    {name}
                </Text>
                <Text className="text-base text-white">{address},</Text>

                <View className="flex flex-row items-center justify-between w-full">
                    <Text className="text-xl font-extrabold text-white">${price}</Text>
                    <Image source={Icons.heart} className="size-5" />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export const Cards = ({
    onPress,
    name,
    address,
    rating,
    image,
    price,
}: CardsProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex-1 w-full mt-4 px-3 py-4 bg-white rounded-lg shadow-lg shadow-black-100/70 relative "
        >
            <View className="flex flex-row items-center bg-white/95 px-3 p-1 rounded-full z-50 absolute top-5 right-5">
                <Image source={Icons.star} className="size-3.5" />
                <Text className="text-xs font-bold text-stone-900 ml-05">{rating}</Text>
            </View>

            <Image
                source={{
                    uri: image,
                }}
                className="w-full h-40 rounded-lg"
            />

            <View className="flex flex-col mt-2">
                <Text className="text-base font-bold text-stone-800">{name}</Text>
                <Text className="text-xs text-stone-700">{address}</Text>

                <View className="flex flex-row items-center justify-between mt-2">
                    <Text className="text-base font-bold text-blue-400">${price}</Text>
                    <Image
                        source={Icons.heart}
                        className="w-5 h-5 mr-2"
                        tintColor={"#191d31"}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};
