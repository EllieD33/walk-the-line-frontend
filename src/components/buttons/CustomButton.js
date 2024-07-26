import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import globalStyles from "../../styles/globalStyles";

const CustomButton = ({ 
    text, 
    loading = false, 
    loadingText = 'Loading...', 
    onPress, 
    accessibilityLabel, 
    accessibilityHint, 
    variant = 'filledPrimary', 
    textColor = 'dark', 
    borderColor = 'light', 
    buttonWidth = 'auto'  
}) => {
    const buttonStyle = [
        globalStyles.button,
        variant === 'outline' && borderColor === 'dark' ? globalStyles.buttonOutlineDark :
        variant === 'outline' ? globalStyles.buttonOutlineLight :
        variant === 'filledLight' ? globalStyles.buttonFilledLight :
        globalStyles.buttonFilledPrimary,
        { width: buttonWidth || 'auto' }
    ];

    const textStyle = [
        styles.centredText,
        variant === 'outline' ? (textColor === 'white' ? globalStyles.buttonOutlineTextWhite : globalStyles.buttonOutlineTextDark) :
        variant === 'filledLight' ? globalStyles.buttonFilledLightText :
        globalStyles.buttonFilledPrimaryText,
    ];

    return (
        <View>
            <Pressable onPress={onPress} style={buttonStyle} accessibilityLabel={accessibilityLabel} accessibilityHint={accessibilityHint} disabled={loading} >
                <Text style={[globalStyles.textDark, textStyle]}>{loading ? loadingText : text}</Text>
            </Pressable>
        </View>
    );
};

CustomButton.propTypes = {
    text: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    loadingText: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    accessibilityLabel: PropTypes.string.isRequired,
    accessibilityHint: PropTypes.string,
    variant: PropTypes.oneOf(['outline', 'filledLight', 'filledPrimary']).isRequired,
    textColor: PropTypes.oneOf(['dark', 'white']),
    borderColor: PropTypes.oneOf(['light', 'dark']),
    buttonWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const styles = StyleSheet.create({
    centredText: {
        textAlign: "center",
    },
});

export default CustomButton;
