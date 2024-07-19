import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import ErrorBoundary from './components/ErrorBoundary';
import AuthNavigator from './navigators/AuthNavigator'


const AppContent = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <ErrorBoundary>
            <NavigationContainer>
                {isAuthenticated ? <Text>Will be main Nav</Text> : <AuthNavigator />}
            </NavigationContainer>
        </ErrorBoundary>
    );
};

export default AppContent;
