import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";

const AuthStack = createStackNavigator();

function AuthNavigator() {
    return (
        <AuthStack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        >
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="SignUp" component={SignUpScreen} />
        </AuthStack.Navigator>
    );
}

export default AuthNavigator;
