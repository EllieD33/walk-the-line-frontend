import React, { useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setFontLoaded } from '../store/slices/themeSlice';

const AppName = () => {
    const dispatch = useDispatch();
    const fontLoaded = useSelector(state => state.theme.fontLoaded);

    useEffect(() => {
        const loadFont = async () => {
            await Font.loadAsync({
                'satisfy-regular' : require('../../assets/fonts/Satisfy-Regular.ttf')
            })
            dispatch(setFontLoaded(true));
        };
        loadFont();
    }, [dispatch]);

    return (
        <View style={styles.container} >
            <Ionicons name="footsteps" size={44} color="white" />
            <Text style={styles.title} >WanderWays</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'satisfy-regular',
        fontSize: 40,
        color: 'white'
    },
});

export default AppName;