import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import globalStyles from '../../styles/globalStyles';

const NavButton = ({ text, onPress, isOutline, buttonWidth }) => {
    return (
        <View>
            <Pressable onPress={onPress} style={[globalStyles.button, isOutline ? globalStyles.buttonOutline : globalStyles.buttonFilled, { width: buttonWidth || 'auto'}]} >
                <Text style={[globalStyles.textDark, styles.centredText, isOutline ? globalStyles.buttonTextOutline : globalStyles.buttonTextFilled]}>{text}</Text>
            </Pressable>
        </View>
    );
};

NavButton.propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    isOutline: PropTypes.bool,
};

const styles = StyleSheet.create({
    centredText: {
        textAlign: 'center',
    },
});

export default NavButton;
