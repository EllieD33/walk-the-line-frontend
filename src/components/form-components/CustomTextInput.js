import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const CustomTextInput = ({ placeholder, label, isSecure }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            {isFocused && (
                <Text style={styles.label}>
                    {label}
                </Text>
            )}
            <TextInput
                style={[
                    styles.input,
                    isFocused && styles.inputFocused
                ]}
                placeholder={isFocused ? '' : placeholder}
                secureTextEntry={isSecure}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholderTextColor="white"
            />
            {!isFocused && <View style={styles.line} />}
        </View>
    );
};

CustomTextInput.propTypes = {
    placeholder: PropTypes.string,
    label: PropTypes.string,
    isSecure: PropTypes.bool
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: '80%',
        alignSelf: 'center', 
    },
    label: {
        fontSize: 14,
        color: 'white',
        marginTop: 5,
        paddingLeft: 20,
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal:20,
        borderColor: 'transparent',
        borderRadius: 30,
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent', 
    },
    inputFocused: {
        borderBottomColor: 'white',
        backgroundColor: '#D4EADF',
        color: 'black'
    },
    line: {
        height: 1,
        backgroundColor: 'white',
        width: '90%',
        alignSelf: 'center'
    }
});

export default CustomTextInput;
