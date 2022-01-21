import React, { useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useSelector, useDispatch } from "react-redux"

// import HeaderButton from "../components/HeaderButton"
import PlaceItem from "../components/PlaceItem"
import * as placesActions from "../store/places-actions"

const PlacesListScreen = (props) => {
  const places = useSelector((state) => state.places.places)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(placesActions.loadPlaces())
  }, [dispatch])

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={itemData.item.address}
          onSelect={() => {
            props.navigation.navigate("PlaceDetail", {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            })
          }}
        />
      )}
    />
  )
}

export const screenOptions = (navData) => {
  return {
    headerTitle: "Places",
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          navData.navigation.push("NewPlace")
        }}
      >
        <Ionicons name={"add-outline"} size={28} color={"#fff"} />
      </TouchableOpacity>
    ),
  }
}

const styles = StyleSheet.create({})

export default PlacesListScreen
