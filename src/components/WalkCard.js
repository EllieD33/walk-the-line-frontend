import { View, StyleSheet, Text } from "react-native";
import MetricView from "./MetricView";

const WalkCard = (walk) => {
    return (
        <View style={styles.card} >
            <Text>{walk.title}</Text>
            <Text>{walk.description}</Text>
            <View style={styles.metricsContainer} >
                <MetricView iconName='walk' value={walk.distance} />
                <MetricView iconName='slope-uphill' value={walk.ascent} />
                <MetricView iconName='speedometer' value={walk.difficulty} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        margin: 8,
        backgroundColor: "white",
        borderRadius: 8,
    },
    metricsContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row'
    }
})

export default WalkCard;