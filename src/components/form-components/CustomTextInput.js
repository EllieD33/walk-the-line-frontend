import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const CustomTextInput = ({ label, isSecure, onChangeText, onBlur, value, error, accessibilityLabel, accessibilityHint }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                    {label}
                </Text>
            <TextInput
                style={[
                    styles.input,
                    isFocused && styles.inputFocused,
                    error && styles.errorBorder
                ]}
                secureTextEntry={isSecure}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {setIsFocused(false); onBlur();}}
                onChangeText={onChangeText}
                value={value}
                placeholderTextColor="white"
                accessibilityLabel={accessibilityLabel}
                accessibilityHint={accessibilityHint}
            />
            {<View style={styles.line} />}
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

CustomTextInput.propTypes = {
    placeholder: PropTypes.string,
    label: PropTypes.string,
    isSecure: PropTypes.bool,
    onChangeText: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    accessibilityLabel: PropTypes.string.isRequired,
    accessibilityHint: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: '100%',
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
    line: {
        height: 1,
        backgroundColor: 'white',
        width: '90%',
        alignSelf: 'center'
    },
    errorBorder: {
        borderBottomColor: 'red',
    },
    errorText: {
        color: 'red',
        marginLeft: 20,
        marginTop: 5,
    },
});

export default CustomTextInput;
