import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import globalStyles from '../../styles/globalStyles';

const NavButton = ({ text, onPress, isOutline, buttonWidth, color }) => {
    const buttonStyle = [
        globalStyles.button,
        isOutline ? globalStyles.buttonOutline : (color === 'primary' ? globalStyles.buttonFilledPrimary : globalStyles.buttonFilled),
        { width: buttonWidth || 'auto' }
    ];

    const textStyle = [
        styles.centredText,
        isOutline ? globalStyles.buttonTextOutline : (color === 'primary' ? globalStyles.textWhite : globalStyles.buttonTextFilled)
    ];

    return (
        <View>
            <Pressable onPress={onPress} style={buttonStyle} >
                <Text style={[globalStyles.textDark, textStyle]}>{text}</Text>
            </Pressable>
        </View>
    );
};

NavButton.propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    isOutline: PropTypes.bool,
    color: PropTypes.oneOf(['primary', ''])
};

const styles = StyleSheet.create({
    centredText: {
        textAlign: 'center',
    },
});

export default NavButton;
