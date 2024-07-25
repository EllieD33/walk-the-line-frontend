import { View, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const IconButton = ({ icon, onPress }) => {
    return (
        <View>
            <Pressable onPress={onPress} style={styles.button} >
                <MaterialCommunityIcons name={icon} size={28} color={'white'} />
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4AC483',
        width: 40,
        height: 40,
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center'
    },
})

export default IconButton;