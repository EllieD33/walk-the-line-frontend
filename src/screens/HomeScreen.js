import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import FullMapView from "../components/FullMapView";
import SegmentedButton from "../components/buttons/SegmentedButton";

const HomeScreen = () => {
    const onSelect = () => {};

    return (
        <SafeAreaView style={styles.container}>
            <SegmentedButton
                options={["Map view", "List view"]}
                onSelect={onSelect}
            />
            <FullMapView />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: "#D4EADF",
    },
});

export default HomeScreen;
