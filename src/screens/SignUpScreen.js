import { View, Text, Button, TextInput, StyleSheet, SafeAreaView } from "react-native";
import CustomTextInput from "../components/form-components/CustomTextInput";
import AppName from "../components/AppName";

function SignUpScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.container}>
                <AppName />
                <View>
                    <Text style={styles.title}>Sign up</Text>
                    <Text style={styles.subtitle}>to continue</Text>
                </View>
                <CustomTextInput placeholder='Enter username' label='Username' secureTextEntry={false}  />
                <CustomTextInput placeholder='Enter email address' label='Email' secureTextEntry={false}  />
                <CustomTextInput placeholder='Enter password' label='Password' secureTextEntry={true}  />
                <CustomTextInput placeholder='Re-enter password' label='Re-enter password' secureTextEntry={true}  />
                <Button title="Sign Up" onPress={() => {}} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#4AC483',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
})

export default SignUpScreen;
