import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";

const ImageAvatar = React.memo(function ImageAvatar({ imageUri }: { imageUri?: string | null }) {
  const uri = imageUri === null ? undefined : imageUri;
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Avatar.Image size={40} source={{ uri }} />
    </View>
  );
});

export default ImageAvatar;
