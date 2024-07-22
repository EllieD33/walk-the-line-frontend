import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import FullMapView from "../components/FullMapView";
import ListView from "../components/ListView";
import SegmentedButton from "../components/buttons/SegmentedButton";

const HomeScreen = ({ navigation }) => {
    const [selectedView, setSelectedView] = useState(0);

    return (
        <SafeAreaView style={styles.container}>
            <SegmentedButton
                options={["Map view", "List view"]}
                selectedIndex={selectedView}
                onSelect={setSelectedView}
            />
            {selectedView === 0 ? <FullMapView /> : <ListView navigation={navigation} />}
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
