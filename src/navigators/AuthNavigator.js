import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "../screens/SignUpScreen";

const AuthStack = createStackNavigator();

function AuthNavigator() {
    return (
        <AuthStack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        >
            <AuthStack.Screen name="SignUp" component={SignUpScreen} />
        </AuthStack.Navigator>
    );
}

export default AuthNavigator;
