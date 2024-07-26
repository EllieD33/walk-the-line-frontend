import { View, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const IconButton = ({ icon, onPress, disabled, variant, accessibilityLabel }) => {
    const buttonColor = {
        backgroundColor: variant === 'delete' ? '#D70040' : '#4AC483',
    }
    
    return (
        <View>
            <Pressable onPress={onPress} style={[styles.button, buttonColor]} disabled={disabled} accessibilityLabel={accessibilityLabel} >
                <MaterialCommunityIcons name={icon} size={28} color={'white'} />
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    button: {
        width: 40,
        height: 40,
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center'
    },
})

export default IconButton;