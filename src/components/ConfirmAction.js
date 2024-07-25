import { Text, View, StyleSheet } from "react-native"
import NavButton from "./buttons/NavButton"
import globalStyles from "../styles/globalStyles";

const ConfirmAction = ({ actionTitle, actionText, confirmPress, cancelPress, confirmButtonText, cancelButtonText }) => {
    return (
        <View>
            <Text style={[globalStyles.h1, {textAlign: 'center'}]} >{actionTitle}</Text>
            <Text style={[globalStyles.textDark, {textAlign: 'center'}]} >{actionText}</Text>
            <View style={styles.buttonContainer} >
                <NavButton
                    text={confirmButtonText}
                    onPress={confirmPress}
                    isOutline={true}
                />
                <NavButton
                    text={cancelButtonText}
                    onPress={cancelPress}
                    isOutline={false}
                    color='primary'
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})

export default ConfirmAction;