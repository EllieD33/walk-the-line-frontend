import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import globalStyles from '../../styles/globalStyles';

const CustomTextInput = ({ label, isSecure, onChangeText, onBlur, value, error, accessibilityLabel, accessibilityHint, darkText }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={[darkText ?  globalStyles.labelDark : globalStyles.label, styles.label]}>
                    {label}
                </Text>
            <TextInput
                style={[
                    styles.input,
                    darkText ? styles.inputDark : styles.inputLight,
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
            {<View style={darkText ? styles.lineDark : styles.line} />}
            {error && <Text style={[globalStyles.errorText, styles.errorText]}>{error}</Text>}
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
        marginTop: 5,
    },
    input: {
        paddingVertical: 10,
        borderColor: 'transparent',
        borderRadius: 30,
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
    },
    inputLight: {
        color: 'white',
        backgroundColor: 'transparent'
    },
    inputDark: {
        color: '#232323',
        backgroundColor: 'D4EADF',
    },
    line: {
        height: 1,
        backgroundColor: 'white',
        width: '90%',
        alignSelf: 'center'
    },
    lineDark: {
        height: 1,
        backgroundColor: '#232323',
        width: '99%',
        alignSelf: 'center'
    },
    errorBorder: {
        borderBottomColor: 'red',
    },
    errorText: {
        marginLeft: 20,
        marginTop: 5,
    },
});

export default CustomTextInput;
