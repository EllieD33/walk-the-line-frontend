import { Text, View, StyleSheet } from "react-native";
import CustomButton from "./buttons/CustomButton";
import globalStyles from "../styles/globalStyles";

const ConfirmAction = ({
    actionTitle,
    actionText,
    confirmPress,
    cancelPress,
    confirmButtonText,
    cancelButtonText,
}) => {
    return (
        <View>
            <Text style={[globalStyles.h1, { textAlign: "center" }]}>
                {actionTitle}
            </Text>
            <Text style={[globalStyles.textDark, { textAlign: "center" }]}>
                {actionText}
            </Text>
            <View style={styles.buttonContainer}>
                <CustomButton
                    text={confirmButtonText}
                    onPress={confirmPress}
                    variant='outline'
                />
                <CustomButton
                    text={cancelButtonText}
                    onPress={cancelPress}
                    isOutline={false}
                    variant='filledLight'
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
});

export default ConfirmAction;
