import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const FormButton = ({ text, onPress, accessibilityLabel, accessibilityHint }) => {
    return (
        <View>
            <Pressable onPress={onPress} style={styles.button} accessibilityLabel={accessibilityLabel} accessibilityHint={accessibilityHint} >
                <Text style={styles.buttonText}>{text}</Text>
            </Pressable>
        </View>
    );
};

FormButton.propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    accessibilityLabel: PropTypes.string.isRequired,
    accessibilityHint: PropTypes.string.isRequired,
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
        color: '#232323',
        textAlign: 'center',
        fontFamily: 'Arial',
        fontSize: 16,
    },
});

export default FormButton;
