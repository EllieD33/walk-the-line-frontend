import { StyleSheet } from "react-native";
import { FONT_SIZES, COLORS } from './variables';

const globalStyles = StyleSheet.create({
    h1: {
        fontFamily: 'montserrat-regular',
        fontSize: FONT_SIZES.xl,
        marginVertical: 10,
    },
    textDark: {
        fontFamily: 'montserrat-regular',
        fontSize: FONT_SIZES.medium,
        color: COLORS.dark
    },
    textBoldDark: {
        fontFamily: 'montserrat-bold',
        fontSize: FONT_SIZES.medium,
        color: COLORS.darkAlt
    },
    textWhite: {
        fontFamily: 'montserrat-regular',
        fontSize: FONT_SIZES.medium,
        color: '#fff'
    },
    label: {
        fontFamily: 'montserrat-regular',
        fontSize: 14,
        color: '#fff'
    },
    errorText: {
        fontFamily: 'montserrat-regular',
        fontSize: 14,
        color: 'red'
    }
});

export default globalStyles;