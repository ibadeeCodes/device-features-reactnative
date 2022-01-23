import React, { useState, useCallback } from "react"
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useDispatch } from "react-redux"

import Colors from "../constants/Colors"
import * as placesActions from "../store/places-actions"
import ImagePicker from "../components/ImagePicker"
import LocationPicker from "../components/LocationPicker"

const NewPlaceScreen = (props) => {
  const [titleValue, setTitleValue] = useState("")
  const [selectedImage, setSelectedImage] = useState()
  const [selectedLocation, setSelectedLocation] = useState()

  const dispatch = useDispatch()

  const titleChangeHandler = (text) => {
    // you could add validation
    setTitleValue(text)
  }

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath)
  }

  const locationPickedHandler = useCallback((location) => {
    setSelectedLocation(location)
  }, [])

  const savePlaceHandler = () => {
    dispatch(
      placesActions.addPlace(titleValue, selectedImage, selectedLocation)
    )
    props.navigation.goBack()
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={props.navigation}
          route={props.route}
          onLocationPicked={locationPickedHandler}
        />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  )
}

export const screenOptions = (navData) => {
  return {
    headerTitle: "Add Place",
  }
}

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  appButtonContainer: {
    elevation: 2,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  LocSelectionBtnContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginHorizontal: 5,
  },
})

export default NewPlaceScreen
