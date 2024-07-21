import { View, StyleSheet, SafeAreaView } from "react-native";
import AppName from "../components/AppName";
import NavButton from "../components/nav-components/NavButton";

const WelcomeScreen = ({ navigation }) => {

    const handleLoginPress = () => {
        navigation.navigate('Login');
    }

    const handleSignupPress = () => {
        navigation.navigate('SignUp');
    }


    return (
        <SafeAreaView style={styles.screen} >
            <View style={styles.container} >
                <AppName />
                <View style={styles.buttonContainer} >
                    <NavButton text='Log in' onPress={handleLoginPress} isOutline={true} />
                    <NavButton text='Sign up' onPress={handleSignupPress} isOutline={false} />
                </View>
            </View>
        </SafeAreaView>
    )
};

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
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    }
})

export default WelcomeScreen;