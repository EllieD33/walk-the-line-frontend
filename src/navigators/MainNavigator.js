import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import HomeStackNavigator from "./main-stack-navigators/HomeStackNavigator";
import RecordWalkStackNavigator from "./main-stack-navigators/RecordStackNavigator";
import ProfileStackNavigator from "./main-stack-navigators/ProfileStackNavigator";

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'HomeTab') {
                        iconName = 'map-sharp';
                    } else if (route.name === 'RecordTab') {
                        iconName = 'record-circle-outline';
                    } else if (route.name === 'ProfileTab') {
                        iconName = 'person';
                    }

                    return route.name === 'RecordTab' ? <MaterialCommunityIcons name={iconName} size={size} color={color} /> : <Ionicons name={iconName} size={size} color={color} />;
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
            <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
            <Tab.Screen name="RecordTab" component={RecordWalkStackNavigator} />
            <Tab.Screen name="ProfileTab" component={ProfileStackNavigator} />
        </Tab.Navigator>
    )
}

export default MainNavigator;