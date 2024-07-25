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
    textDarkLarge: {
        fontFamily: 'montserrat-regular',
        fontSize: FONT_SIZES.large,
        color: COLORS.dark
    },
    label: {
        fontFamily: 'montserrat-regular',
        fontSize: 14,
        color: '#fff'
    },
    labelDark: {
        fontFamily: 'montserrat-regular',
        fontSize: 14,
        color: COLORS.dark
    },
    errorText: {
        fontFamily: 'montserrat-medium',
        fontSize: 14,
        color: '#BD0000'
    },
    button: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        marginTop: 10,
        marginHorizontal: 10,
        minWidth: 120,
    },
    buttonOutlineLight: {
        borderColor: COLORS.light,
        backgroundColor: 'transparent',
    },
    buttonOutlineDark: {
        borderColor: COLORS.dark,
        backgroundColor: 'transparent',
    },
    buttonOutlineTextDark: {
        color: COLORS.dark,
    },
    buttonOutlineTextWhite: {
        color: '#fff',
    },
    buttonFilledLight: {
        backgroundColor: COLORS.light,
        borderColor: COLORS.light,
    },
    buttonFilledLightText: {
        color: COLORS.dark,
    },
    buttonFilledPrimary: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.light,
    },
    buttonFilledPrimaryText: {
        color: '#fff',
    },
});

export default globalStyles;