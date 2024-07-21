import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import FullMapView from '../components/FullMapView';

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <FullMapView />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default HomeScreen;
