import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const NavButton = ({ text, onPress, isOutline }) => {
    return (
        <View>
            <Pressable onPress={onPress} style={[styles.button, isOutline ? styles.buttonOutline : styles.buttonFilled]} >
                <Text style={[styles.buttonText, isOutline ? styles.buttonTextOutline : styles.buttonTextFilled]}>{text}</Text>
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
    button: {
        borderRadius: 10,
        margin: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: 100,
    },
    buttonOutline: {
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#D4EADF',
    },
    buttonFilled: {
        backgroundColor: '#D4EADF',
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'Arial',
        fontSize: 16,
    },
    buttonTextOutline: {
        color: 'white',
    },
    buttonTextFilled: {
        color: '#232323', 
    },
});

export default NavButton;
