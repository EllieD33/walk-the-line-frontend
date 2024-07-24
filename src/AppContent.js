import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import * as Font from 'expo-font';
import { setFontsLoaded } from '../src/store/slices/themeSlice';
import { loggedInUser } from '../src/store/slices/authSlice';
import ErrorBoundary from './components/ErrorBoundary';
import AppNavigator from './navigators/AppNavigator';

const AppContent = () => {
    const [userLoading, setUserLoading] = useState(true);
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

        const checkLoggedInUser = async () => {
            try {
                const user = await SecureStore.getItemAsync('user');
                if (user) {
                    dispatch(loggedInUser(JSON.parse(user)));
                }
            } catch (error) {
                console.error('Failed to load the user from storage', error);
            } finally {
                setUserLoading(false);
            }
        };

        loadFonts();
        checkLoggedInUser();
    }, [dispatch]);

    const fontsAreLoaded = fontsLoadedState.satisfy && fontsLoadedState.montserrat && fontsLoadedState.montserratBold;

    if (!fontsAreLoaded || userLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ErrorBoundary>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </ErrorBoundary>
    );
};

export default AppContent;
