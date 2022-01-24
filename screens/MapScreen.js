import React, { useState, useCallback, useLayoutEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native"
import MapView, { Marker } from "react-native-maps"
import Colors from "../constants/Colors"

const MapScreen = (props) => {
  const initialLocation = props.route.params?.initialLocation
  const readOnly = props.route.params?.readonly

  const [selectedLocation, setSelectedLocation] = useState(initialLocation)

  const mapRegion = {
    latitude: initialLocation ? initialLocation?.lat : 37.78,
    longitude: initialLocation ? initialLocation?.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const selectLocationHandler = (event) => {
    if (readOnly) {
      return
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    })
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      // could show an alert!
      Alert.alert(
        "Tap Location",
        "Please select a location by tapping on it.",
        [
          {
            text: "Okay",
          },
        ]
      )
      return
    }
    props.navigation.navigate("NewPlace", { pickedLocation: selectedLocation })
  }, [selectedLocation])

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        if (readOnly) {
          return null
        } else {
          return (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={savePickedLocationHandler}
            >
              <Text style={styles.headerButtonText}>Save</Text>
            </TouchableOpacity>
          )
        }
      },
    })
  }, [savePickedLocationHandler])

  let markerCoordinates

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    }
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates} />
      )}
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary,
  },
})

export default MapScreen
