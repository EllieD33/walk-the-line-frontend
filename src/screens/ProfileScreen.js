import { Text, StyleSheet } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux'; 
import IconButton from "../components/buttons/IconButton";
import { logout } from "../store/slices/authSlice";

const ProfileScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch(); 
    const user = useSelector(state => state.auth.user);

    const handleLogOut = () => {
        dispatch(logout());
        navigation.reset({
            index: 0,
            routes: [{ name: 'Auth' }]
        });
    };

    return (
        <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]} >
            <Text>PROFILE SCREEN</Text>
            <IconButton icon='logout' onPress={handleLogOut} />
            {user && <Text>Logged in as: {user.username}</Text>}
            <Text>Your Walks</Text>
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