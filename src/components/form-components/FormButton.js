import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import globalStyles from '../../styles/globalStyles';

const FormButton = ({ variant, textColor, borderColor, buttonWidth, text, loading, loadingText, onPress, accessibilityLabel, accessibilityHint }) => {
    const buttonStyle = [
        globalStyles.button,
        variant === 'outline' && borderColor === 'dark' ? globalStyles.buttonOutlineDark :
        variant === 'outline' ? globalStyles.buttonOutlineLight :
        variant === 'filledLight' ? globalStyles.buttonFilledLight :
        globalStyles.buttonFilledPrimary,
        { width: buttonWidth || 'auto' }
    ];
    const textStyle = [
        variant === 'outline' ? (textColor === 'white' ? globalStyles.buttonOutlineTextWhite : globalStyles.buttonOutlineTextDark) :
        variant === 'filledLight' ? globalStyles.buttonFilledLightText :
        globalStyles.buttonFilledPrimaryText,
        styles.buttonText,
    ];
    
    return (
        <View>
            <Pressable disabled={loading} onPress={onPress} style={buttonStyle} accessibilityLabel={accessibilityLabel} accessibilityHint={accessibilityHint} >
                <Text style={textStyle}>{loading ? loadingText : text}</Text>
            </Pressable>
        </View>
    );
};

FormButton.propTypes = {
    variant: PropTypes.oneOf(['outline', 'filledLight', 'filledPrimary']).isRequired,
    textColor: PropTypes.oneOf(['dark', 'white']),
    borderColor: PropTypes.oneOf(['light', 'dark']),
    buttonWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    loadingText: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    accessibilityLabel: PropTypes.string.isRequired,
    accessibilityHint: PropTypes.string,
};

FormButton.defaultProps = {
    loading: false,
    loadingText: 'Loading...',
    textColor: 'dark',
    borderColor: 'light',
    buttonWidth: 'auto',
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#D4EADF',
        borderRadius: 10,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        textAlign: 'center',
    },
});

export default FormButton;
