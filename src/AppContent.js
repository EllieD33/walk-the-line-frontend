import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from 'expo-font';
import { setFontsLoaded } from '../src/store/slices/themeSlice';
import ErrorBoundary from './components/ErrorBoundary';
import AuthNavigator from './navigators/AuthNavigator';
import MainNavigator from './navigators/MainNavigator';


const AppContent = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const fontsLoadedState = useSelector(state => state.theme.fontsLoaded);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadFonts = async () => {
                await Font.loadAsync({
                    'satisfy-regular': require('../assets/fonts/Satisfy-Regular.ttf'),
                    'montserrat-regular': require('../assets/fonts/Montserrat-Regular.ttf'),
                    'montserrat-bold': require('../assets/fonts/Montserrat-Bold.ttf'),
                    'montserrat-medium': require('../assets/fonts/Montserrat-Medium.ttf'),
                });

                dispatch(setFontsLoaded({ fontName: 'satisfy', loaded: true }));
                dispatch(setFontsLoaded({ fontName: 'montserrat', loaded: true }));
                dispatch(setFontsLoaded({ fontName: 'montserratBold', loaded: true }));
                dispatch(setFontsLoaded({ fontName: 'montserratMedium', loaded: true }));
        };

        loadFonts();
    }, [dispatch]);

    const fontsAreLoaded = fontsLoadedState.satisfy && fontsLoadedState.montserrat && fontsLoadedState.montserratBold;

    if (!fontsAreLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ErrorBoundary>
            <NavigationContainer>
                {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
            </NavigationContainer>
        </ErrorBoundary>
    );
};

export default AppContent;
