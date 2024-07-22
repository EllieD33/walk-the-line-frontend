import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import FullMapView from "../components/FullMapView";
import ListView from "../components/ListView";
import SegmentedButton from "../components/buttons/SegmentedButton";
import { fetchWalks, getWalksStatus } from "../store/slices/walksSlice";

const HomeScreen = ({ navigation }) => {
    const [selectedView, setSelectedView] = useState(0);
    const dispatch = useDispatch();
    const status = useSelector(getWalksStatus);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchWalks());
        }
    }, [dispatch, status]);

    if (status === 'loading') {
        return <ActivityIndicator style={styles.center} size="large" />;
    }

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
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default HomeScreen;
