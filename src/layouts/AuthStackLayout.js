import { View, StyleSheet, SafeAreaView } from 'react-native';
import AppName from '../components/AppName';

const AuthStackLayout = ({ children }) => {
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.appNameContainer}>
                    <AppName />
                </View>
                <View style={styles.content}>
                    {children}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#4AC483',
    },
    container: {
        flex: 1,
        position: 'relative',
    },
    appNameContainer: {
        position: 'absolute',
        top: 100,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    content: {
        flex: 1,
        marginTop: 250, 
        padding: 16,
    },
});

export default AuthStackLayout;