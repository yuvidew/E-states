import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icons from "@/constants/Icons";
import { settings } from "@/constants/data";
import { useClerk, useUser } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";

interface SettingProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingProps) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between py-3"
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6" />
      <Text className={`text-lg font-medium  ${textStyle}`}>{title}</Text>
    </View>

    {showArrow && <Image source={Icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);

const Profile = () => {
  const { signOut } = useClerk();
  const {isLoaded ,  user } = useUser();
  if (!isLoaded) {
    return (
      <SafeAreaView className="bg-white h-full justify-center items-center">
        <ActivityIndicator className="text-blue-500" size="large" />
      </SafeAreaView>
    );
  }
  const onLogout = async () => {
    try {
      await signOut();
      Linking.openURL(Linking.createURL("/sign-in"));
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        {/* start top bell */}
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-bold">Profile</Text>
          <Image source={Icons.bell} className="size-5" />
        </View>
        {/* end top bell */}

        {/* start avatar and name  */}
        <View className="flex-row justify-center flex mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={{ uri:  user?.imageUrl}}
              className="size-44 relative rounded-full"
            />
            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={Icons.edit} className="size-9" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold mt-2">{user?.fullName}</Text>
          </View>
        </View>
        {/* start avatar and name  */}

        {/* start setting items */}
        <View className="flex flex-col mt-10">
          <SettingItem icon={Icons.calendar} title="My Bookings" />
          <SettingItem icon={Icons.calendar} title="Payment" />
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-blue-200">
          {settings.slice(2).map((item, index) => (
            <SettingItem key={index} {...item} />
          ))}
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-blue-200">
          <SettingItem
            icon={Icons.logout}
            title="Logout"
            textStyle="text-danger"
            showArrow={false}
            onPress={onLogout}
          />
        </View>
        {/* end setting items */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
