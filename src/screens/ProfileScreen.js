import { Text, StyleSheet } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import IconButton from "../components/buttons/IconButton";

const ProfileScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();

    const handleLogOut = () => {

    }
    return (
        <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]} >
            <Text>PROFILE SCREEN</Text>
            <IconButton icon='logout' onPress={handleLogOut} />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D4EADF",
        alignItems: 'center'
    },
});

export default ProfileScreen;