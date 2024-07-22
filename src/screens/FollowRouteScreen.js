import { SafeAreaView, View, StyleSheet } from "react-native";
import MapWithPolyLines from "../components/MapWithPolyLines";
import MetricView from "../components/MetricView";
import globalStyles from "../styles/globalStyles";

const FollowRouteScreen = ({ navigation, route }) => {
    const { walk } = route.params;
    const zoomedRegion = {
        latitude: walk.start_latitude,
        longitude: walk.start_longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
    }

    return (
        <SafeAreaView style={styles.screen}>
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
        paddingTop: 40,
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