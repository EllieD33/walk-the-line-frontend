import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RecordWalkScreen from "../screens/RecordWalkScreen";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'map-sharp';
                    } else if (route.name === 'Record') {
                        iconName = 'record-circle-outline';
                    } else if (route.name === 'Profile') {
                        iconName = 'person';
                    }

                    return route.name === 'Record' ? <MaterialCommunityIcons name={iconName} size={size} color={color} /> : <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#fff',
                tabBarActiveBackgroundColor: '#4AC483',
                tabBarInactiveBackgroundColor: '#D4EADF',
                tabBarInactiveTintColor: '#73CE9F',
                tabBarStyle: {
                    backgroundColor: '#D4EADF'
                },
                tabBarIconStyle: {
                    marginTop: 10,
                },
                tabBarLabel: '',
                tabBarAccessibilityLabel: route.name,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Record" component={RecordWalkScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
}

export default MainNavigator;