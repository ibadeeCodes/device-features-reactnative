import React from "react"
import { TouchableOpacity, Image, StyleSheet } from "react-native"

import ENV from "../.env"

const MapPreview = (props) => {
  let imagePreviewUrl

  if (props.location) {
    // imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${ENV.googleApiKey}`
    imagePreviewUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:${props.location.lng},${props.location.lat}&zoom=14&apiKey=${ENV.googleApiKey}`
  }

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.mapPreview, ...props.style }}
    >
      {props.location ? (
        <Image
          style={styles.mapImage}
          source={{
            uri: imagePreviewUrl, // When using google static api.
            // uri: "https://developer.here.com/documentation/maps/3.1.30.7/dev_guide/graphics/markers-svg.png",
          }}
        />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
})

export default MapPreview
