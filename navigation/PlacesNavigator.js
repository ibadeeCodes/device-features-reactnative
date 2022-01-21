import { Platform } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import PlacesListScreen, {
  screenOptions as ProductListScreenOptions,
} from "../screens/PlacesListScreen"
import PlaceDetailScreen from "../screens/PlaceDetailScreen"
import NewPlaceScreen, {
  screenOptions as NewPlaceScreenOptions,
} from "../screens/NewPlaceScreen"
import MapScreen from "../screens/MapScreen"
import Colors from "../constants/Colors"

const PlacesStackNavigator = createNativeStackNavigator()

const defaultHeaderOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
}

const PlacesNavigator = () => {
  return (
    <NavigationContainer>
      <PlacesStackNavigator.Navigator screenOptions={defaultHeaderOptions}>
        <PlacesStackNavigator.Screen
          name="Places"
          component={PlacesListScreen}
          options={ProductListScreenOptions}
        />
        <PlacesStackNavigator.Screen
          name="PlaceDetail"
          component={PlaceDetailScreen}
        />
        <PlacesStackNavigator.Screen
          name="NewPlace"
          component={NewPlaceScreen}
          options={NewPlaceScreenOptions}
        />
        <PlacesStackNavigator.Screen name="Map" component={MapScreen} />
      </PlacesStackNavigator.Navigator>
    </NavigationContainer>
  )
}

export default PlacesNavigator
