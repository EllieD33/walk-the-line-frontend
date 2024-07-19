import { View, Text, Button, TextInput } from "react-native";

function SignUpScreen({ navigation }) {
    return (
        <View>
            <Text>Sign Up</Text>
            <TextInput placeholder="Email" />
            <TextInput placeholder="Password" secureTextEntry />
            <Button
                title="Sign Up"
                onPress={() => {}}
            />
        </View>
    );
}

export default SignUpScreen;
