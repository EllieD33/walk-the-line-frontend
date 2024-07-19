import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "../screens/SignUpScreen";

const AuthStack = createStackNavigator();

function AuthNavigator() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="SignUp" component={SignUpScreen} />
        </AuthStack.Navigator>
    );
}

export default AuthNavigator;
