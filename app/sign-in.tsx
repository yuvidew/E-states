import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useEffect } from 'react'

import { useSSO } from '@clerk/clerk-expo';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from '@/constants/Icons';

const useWarmUpBrowser = () => {
    useEffect(() => {
        void WebBrowser.warmUpAsync()
        return () => {
            void WebBrowser.coolDownAsync()
        }
    }, [])
}

const SignIn = () => {
    useWarmUpBrowser();
    const { startSSOFlow} = useSSO();
    const onPress = useCallback(async () => {
        try {
            const { createdSessionId, setActive } = await startSSOFlow({
                strategy: 'oauth_google',
                redirectUrl: AuthSession.makeRedirectUri(),
            })

            if (createdSessionId) {
                await setActive!({ session: createdSessionId })
                router.push("/(root)/(tabs)");
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
        }
    }, [startSSOFlow]);
    return (
        <SafeAreaView className='bg-white h-full' >
            <ScrollView contentContainerClassName='h-full'>
                <Image
                    source={require("@/assets/images/onboarding.png")}
                    className="w-full h-4/6"
                    resizeMode="contain"
                />

                <View className='px-10'
                >
                    <Text className="text-base text-center uppercase font-rubik text-black-200">
                        Welcome To Real Scout
                    </Text>

                    <Text className="text-3xl font-bold text-stone-600 text-center mt-2">
                        Let&apos;s Get You Closer To {"\n"}
                        <Text className="text-blue-400">Your Ideal Home</Text>
                    </Text>

                    <TouchableOpacity 
                    onPress={onPress}
                        className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
                    >
                        <View className="flex flex-row items-center justify-center">
                            <Image
                                source={Icons.google}
                                className="w-5 h-5"
                                resizeMode="contain"
                            />
                            <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                                Continue with Google
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {/* https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/67bdd1df0031ec35c01c */}
        </SafeAreaView>
    )
}

export default SignIn