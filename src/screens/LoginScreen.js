import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import CustomTextInput from "../components/form-components/CustomTextInput";
import AppName from "../components/AppName";

function LoginScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.container}>
                <AppName />
                <View>
                    <Text style={styles.title}>Log in</Text>
                    <Text style={styles.subtitle}>to continue</Text>
                </View>
                <CustomTextInput placeholder='Enter username' label='Username' secureTextEntry={false}  />
                <CustomTextInput placeholder='Enter password' label='Password' secureTextEntry={true}  />
                <Button title="Log in" onPress={() => {}} />
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

export default LoginScreen;
