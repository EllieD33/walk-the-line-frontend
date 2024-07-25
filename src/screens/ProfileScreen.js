import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets, } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../components/buttons/IconButton";
import { logout } from "../store/slices/authSlice";
import UserAvatar from "../components/UserImage";
import globalStyles from "../styles/globalStyles";
import ListView from "../components/ListView";

const ProfileScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const handleLogOut = () => {
        dispatch(logout());
        navigation.reset({
            index: 0,
            routes: [{ name: "Auth" }],
        });
    };

    return (
        <SafeAreaView
            style={[
                styles.screen,
                { paddingTop: insets.top, paddingBottom: insets.bottom },
            ]}
        >
            <View style={styles.headerContainer} >
                <Text style={globalStyles.h1} >Profile</Text>
                <IconButton icon="logout" onPress={handleLogOut} />
            </View>
            <UserAvatar username={user.username} />
            {user && <Text style={globalStyles.textDark} >Logged in as: {user.username}</Text>}
            <View style={styles.walksContainer} >
                <Text style={globalStyles.textDarkLarge} >Your Walks</Text>
                <ListView navigation={navigation} userId={user.user_id} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#D4EADF",
        alignItems: "center",
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    walksContainer: {
        flex: 1,
        marginVertical: 20,
        alignItems: 'center',
    }
});

export default ProfileScreen;
