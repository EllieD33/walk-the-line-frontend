import { View, StyleSheet } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import MapWithPolyLines from "../components/MapWithPolyLines";
import MetricView from "../components/MetricView";

const FollowRouteScreen = ({ navigation, route }) => {
    const { walk } = route.params;
    const insets = useSafeAreaInsets();

    const zoomedRegion = {
        latitude: walk.start_latitude,
        longitude: walk.start_longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
    }

    return (
        <SafeAreaView style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <MapWithPolyLines walkId={walk.walk_id} customRegion={zoomedRegion} />
            <View style={styles.container} >
                <MetricView iconName='sign-direction' value={`Currently following route: ${walk.title}`}/>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {
        marginBottom: 8,
        alignSelf: 'center'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default FollowRouteScreen;