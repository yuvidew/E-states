import { View, Text, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native'
import React, { useRef } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icons from '@/constants/Icons'
import Swiper from "react-native-swiper";
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { Id } from '@/convex/_generated/dataModel'
import { facilities } from '@/constants/data'

type FacilityKey = keyof typeof facilities;

const Properties = () => {
    const { id } = useLocalSearchParams();
    const swiperRef = useRef<Swiper>(null);
    const Estates = useQuery(api.estates.getEstatesById, { id: id as Id<"estates"> });

    if (!Estates) {
        return (
            <SafeAreaView className='flex flex-row items-center justify-center'>
                <ActivityIndicator className=' text-blue-500 size-6' />
            </SafeAreaView>
        )
    }


    //   const isLastSlide = activeIndex === onboarding.length - 1;
    return (
        <ScrollView className='flex h-full bg-white'>
            {/* start back button , heart , and send button */}
            <View className='flex flex-row items-center justify-between z-30 absolute w-full p-4 px-6'>
                <TouchableOpacity onPress={() => router.back()} className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                    <Image source={Icons.backArrow} className="size-6" tintColor={"#0061FF"} />
                </TouchableOpacity>
                <View className='flex flex-row items-center justify-end gap-4'>
                    <TouchableOpacity onPress={() => router.back()} className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                        <Image source={Icons.heart} className='size-7' tintColor={"#0061FF"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.back()} className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                        <Image source={Icons.send} className="size-6" tintColor={"#0061FF"} />
                    </TouchableOpacity>
                </View>
            </View>
            {/* end back button , heart , and send button */}

            {/* start properties images */}
            <View className='h-[30rem] '>
                <Swiper
                    ref={swiperRef}
                    loop
                    dot={
                        <View className="w-[6px] h-[6px] mx-1 bg-[#E2E8F0] rounded-full" />
                    }
                    activeDot={
                        <View className="w-[32px] h-[6px] mx-1 bg-[#0286FF] rounded-full" />
                    }
                >
                    {Estates?.gallery.map((img, i) => (
                        <View
                            key={i}
                            className="flex items-center justify-center"
                        >

                            <Image
                                source={{
                                    uri: img
                                }}
                                className='w-full h-full'
                                resizeMode="cover"
                            />
                        </View>
                    ))}
                </Swiper>
            </View>
            {/* end properties images */}

            {/* start properties details */}
            <View className='p-5 gap-8'>
                {/* start properties name , and details */}
                <View className='flex gap-6'>
                    <Text className='text-3xl font-rubik-bold text-black-300'>
                        {Estates.name}
                    </Text>
                    <View className='flex flex-row items-center gap-2'>
                        <TouchableOpacity className='bg-primary-100 py-1 px-4 rounded-full'>
                            <Text className='text-sm text-primary-300'>
                                {Estates.type}
                            </Text>
                        </TouchableOpacity>
                        <View className=' items-center flex-row gap-1'>
                            <Image source={Icons.star} className='size-5' />
                            <Text className='text-sm text-black-300'>
                                {Estates.rating}
                            </Text>
                        </View>
                    </View>

                    <View className='flex-row items-center gap-5'>
                        <View className='flex-row items-center gap-2'>
                            <TouchableOpacity onPress={() => router.back()} className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                                <Image source={Icons.bed} className="size-5" tintColor={"#0061FF"} />
                            </TouchableOpacity>
                            <Text className='text-sm font-rubik-medium text-black-300'>
                                {Estates.bedrooms} {" "}
                                beds
                            </Text>
                        </View>
                        <View className='flex-row items-center gap-2'>
                            <TouchableOpacity onPress={() => router.back()} className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                                <Image source={Icons.bath} className="size-5" tintColor={"#0061FF"} />
                            </TouchableOpacity>
                            <Text className='text-sm font-rubik-medium text-black-300'>
                                {Estates.bathrooms} {" "}
                                baths
                            </Text>
                        </View>
                        <View className='flex-row items-center gap-2'>
                            <TouchableOpacity onPress={() => router.back()} className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                                <Image source={Icons.area} className="size-5" tintColor={"#0061FF"} />
                            </TouchableOpacity>
                            <Text className='text-sm font-rubik-medium text-black-300'>
                                {Estates.area} {" "}
                                sqft
                            </Text>
                        </View>
                    </View>
                </View>
                {/* end properties name */}

                {/* start agent details  */}
                <View className='gap-5 '>
                    <Text className='text-2xl font-rubik-semibold text-black-300'>
                        Agent
                    </Text>
                    <View className='flex-row items-center w-full gap-4'>
                        <Image
                            source={{
                                uri: Estates.agent
                            }}
                            className='size-16 rounded-full'
                            resizeMode="cover"
                        />
                        <View className='flex-row items-center justify-between'>
                            <View className='gap-1 w-[50%]'>
                                <Text className='text-lg font-rubik-medium'>
                                    Natasya  Wilodra
                                </Text>
                                <Text className='text-sm text-black-200'>Owner</Text>
                            </View>
                            <View className='flex-row gap-4  w-[32%] items-center justify-end'>
                                <Image source={Icons.chat} className='size-7' />
                                <Image source={Icons.phone} className='size-7' />
                            </View>
                        </View>
                    </View>

                </View>
                {/* end agent details */}

                {/* start overview */}
                <View className='gap-5'>
                    <Text className='text-2xl font-rubik-semibold text-black-300'>
                        Overview
                    </Text>
                    <Text className='text-lg font-rubik text-black-200'>
                        {Estates.description}
                    </Text>
                </View>
                {/* end overview */}

                {/* start facilities */}
                <View className='gap-6'>
                    <Text className='text-2xl font-rubik-semibold text-black-300'>
                        Facilities
                    </Text>
                    <View className="flex flex-row flex-wrap gap-5  ">
                        {Estates.facilities.map((item, i) => (
                            <View key={i} className="w-[21.6%] items-center justify-start gap-2">
                                <TouchableOpacity onPress={() => router.back()} className="bg-primary-200 rounded-full size-12 items-center justify-center">
                                    <Image source={facilities[item.trim() as FacilityKey ]} className="size-5" tintColor="#0061FF" />
                                </TouchableOpacity>
                                <Text className='text-sm font-rubik-medium text-center text-black-200'>
                                    {item}
                                </Text>
                            </View>
                        ))}

                    </View>

                </View>
                {/* end facilities */}

                {/* start gallery */}
                <View className='gap-6'>
                    <Text className='text-2xl font-rubik-semibold text-black-300'>
                        Gallery
                    </Text>
                    <View className='flex flex-row flex-wrap gap-5'>
                        {Estates.gallery.map((item , i) => (
                            <Image
                                key={i}
                                source={{
                                    uri : item
                                }}

                                className=' w-[118px] h-[118px] rounded-lg'
                                resizeMode="cover"
                            />
                        ))}
                    </View>
                </View>
                {/* end gallery */}

                {/* start price and booking button*/}
                <View className='w-full bg-white py-5 flex-row justify-between fixed bottom-0 right-0 left-0' >
                    <View className='gap-2 w-[30%]'>
                        <Text className='text-lg font-rubik-medium text-black-300'>
                            Price
                        </Text>
                        <Text className='text-2xl font-rubik-medium text-primary-300' >
                            ${Estates.price}
                        </Text>
                    </View>
                    <TouchableOpacity className='p-4 bg-primary-300 w-[60%] rounded-full'>
                        <Text className='text-white text-xl text-center mt-1 font-rubik-medium'>
                            Booking Now
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* end price and booking button*/}
            </View>
            {/* end properties details */}
        </ScrollView>
    )
}

export default Properties