
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {  useAuth} from '@clerk/clerk-expo'

export default function AppLayout(){
    const { isLoaded, isSignedIn } = useAuth();

    if(!isLoaded){
        return (
            <SafeAreaView className="bg-white h-full justify-center items-center">
                <ActivityIndicator className="text-blue-500" size = "large" />
            </SafeAreaView>
        )
    }

    if (!isSignedIn) return <Redirect href={"/sign-in"} />

    return <Slot/>
}