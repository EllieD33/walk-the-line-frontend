import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import globalStyles from '../../styles/globalStyles';

const FormButton = ({ text, loading, loadingText, onPress, accessibilityLabel, accessibilityHint }) => {
    return (
        <View>
            <Pressable disabled={loading ? true : false} onPress={onPress} style={styles.button} accessibilityLabel={accessibilityLabel} accessibilityHint={accessibilityHint} >
                <Text style={[globalStyles.textDark, styles.buttonText]}>{loading ? loadingText : text}</Text>
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
