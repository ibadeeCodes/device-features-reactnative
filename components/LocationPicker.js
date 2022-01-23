import React, { useState, useEffect } from "react"
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native"
import * as Location from "expo-location"

import Colors from "../constants/Colors"
import MapPreview from "./MapPreview"
import { Ionicons } from "@expo/vector-icons"

const LocationPicker = (props) => {
  const [isFetching, setIsFetching] = useState(false)
  const [pickedLocation, setPickedLocation] = useState()

  // console.log(props.navigation)
  // console.log(props.route)

  const { onLocationPicked } = props

  useEffect(() => {
    if (props.route.params?.pickedLocation) {
      setPickedLocation(props.route.params?.pickedLocation)
      onLocationPicked(props.route.params?.pickedLocation)
    }
  }, [props.route.params?.pickedLocation, onLocationPicked])

  const verifyPermissions = async () => {
    let result = await Location.requestForegroundPermissionsAsync()
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app.",
        [{ text: "Okay" }]
      )
      return false
    }
    return true
  }

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions()
    if (!hasPermission) {
      return
    }

    try {
      setIsFetching(true)
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      })
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      })
      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      })
    } catch (err) {
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or pick a location on the map.",
        [{ text: "Okay" }]
      )
    }
    setIsFetching(false)
  }

  const pickOnMapHandler = () => {
    props.navigation.navigate("Map")
  }

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <View style={styles.fallbackContainer}>
            <Ionicons name={"location-outline"} size={38} color={"#677483"} />

            <Text>No location chosen yet!</Text>
          </View>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  fallbackContainer: {
    display: "flex",
    alignItems: "center",
  },
})

export default LocationPicker
