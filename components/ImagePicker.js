import React, { useState } from "react"
import { View, Button, Image, Text, StyleSheet, Alert } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { Ionicons } from "@expo/vector-icons"
import Colors from "../constants/Colors"

const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState()

  const takeImageHandler = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setPickedImage(result.uri)
      props.onImageTaken(result.uri)
    } else {
      return
    }
  }

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <View style={styles.fallbackContainer}>
            <Ionicons name={"image-outline"} size={38} color={"#677483"} />
            <Text>No image picked yet.</Text>
          </View>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  fallbackContainer: {
    display: "flex",
    alignItems: "center",
  },
})

export default ImgPicker
