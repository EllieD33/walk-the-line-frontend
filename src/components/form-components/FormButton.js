import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import globalStyles from '../../styles/globalStyles';

const FormButton = ({ text, loading, loadingText, onPress, accessibilityLabel, accessibilityHint, color }) => {
    const buttonStyle = [
        styles.button,
        color === 'primary' && globalStyles.buttonFilledPrimary,
    ];
    const textStyle = [
        globalStyles.textDark,
        styles.buttonText,
        color === 'primary' && globalStyles.textWhite,
    ];
    
    return (
        <View>
            <Pressable disabled={loading ? true : false} onPress={onPress} style={buttonStyle} accessibilityLabel={accessibilityLabel} accessibilityHint={accessibilityHint} >
                <Text style={textStyle}>{loading ? loadingText : text}</Text>
            </Pressable>
        </View>
    );
};

FormButton.propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    accessibilityLabel: PropTypes.string.isRequired,
    accessibilityHint: PropTypes.string,
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
