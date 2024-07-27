import { Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
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

ConfirmAction.propTypes = {
    actionTitle: PropTypes.string.isRequired,
    actionText: PropTypes.string.isRequired,
    confirmPress: PropTypes.func.isRequired,
    cancelPress: PropTypes.func.isRequired,
    confirmButtonText: PropTypes.string.isRequired,
    cancelButtonText: PropTypes.string.isRequired
}

export default ConfirmAction;
