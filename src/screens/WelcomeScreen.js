import { View, StyleSheet, SafeAreaView } from "react-native";
import AppName from "../components/AppName";
import CustomButton from "../components/buttons/CustomButton";

const WelcomeScreen = ({ navigation }) => {
    const handleLoginPress = () => {
        navigation.navigate("Login");
    };

    const handleSignupPress = () => {
        navigation.navigate("SignUp");
    };

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.container}>
                <AppName />
                <View style={styles.buttonContainer}>
                    <CustomButton
                        text="Log in"
                        onPress={handleLoginPress}
                        variant="outline"
                        textColor="white"
                    />
                    <CustomButton
                        text="Sign up"
                        onPress={handleSignupPress}
                        variant="filledLight"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#4AC483",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
    },
    title: {
        fontSize: 24,
        color: "#fff",
        textAlign: "center",
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },
});

export default WelcomeScreen;
