import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import globalStyles from "../../styles/globalStyles";
import PropTypes from "prop-types";

const SegmentedButton = ({ options, selectedIndex, onSelect}) => {
    return (
        <View style={styles.container}>
            {options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.button,
                        index === 0 && styles.firstButton,
                        index === options.length - 1 && styles.lastButton,
                        selectedIndex === index && styles.selectedButton,
                    ]}
                    onPress={() => onSelect(index)}
                >
                    <Text
                        style={[
                            globalStyles.textDark,
                            selectedIndex === index &&
                                styles.selectedButtonText,
                        ]}
                    >
                        {option}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

SegmentedButton.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedIndex: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderRadius: 30,
        overflow: "hidden",
        backgroundColor: "#D4EADF",
        borderWidth: 1,
        borderColor: "#4AC483",
        marginHorizontal: 20,
        marginVertical: 5,
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRightWidth: 1,
        borderColor: "#4AC483",
    },
    firstButton: {
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
    },
    lastButton: {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        borderRightWidth: 0,
    },
    selectedButton: {
        backgroundColor: "#4AC483",
    },
    selectedButtonText: {
        color: "#fff",
    },
});

export default SegmentedButton;
