import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";

const MainStack = createStackNavigator();

const MainNavigator = () => {
    return (
        <MainStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <MainStack.Screen name="Home" component={HomeScreen} />
        </MainStack.Navigator>
    )
}

export default MainNavigator;