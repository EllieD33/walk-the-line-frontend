import { View, StyleSheet, Text } from "react-native";

const UserAvatar = ({ username }) => {
    const letter = username.charAt(0).toUpperCase();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{letter}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 100,
        backgroundColor: "#fff",
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
    },
    text: {
        fontFamily: "montserrat-medium",
        fontSize: 50,
        color: "#4AC483",
    },
});

export default UserAvatar;
