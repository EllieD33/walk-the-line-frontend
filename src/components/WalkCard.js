import { View, StyleSheet, Text } from "react-native";
import MetricView from "./MetricView";
import globalStyles from "../styles/globalStyles";

const WalkCard = ({ walk }) => {
    return (
        <View style={styles.card} >
            <Text style={globalStyles.textBoldDark} >{walk.title}</Text>
            <Text style={globalStyles.textDark} >{walk.description}</Text>
            <View style={styles.metricsContainer} >
                <MetricView iconName='walk' value={`${walk.distance_km} km`} />
                <MetricView iconName='slope-uphill' value={`${walk.ascent} m`} />
                <MetricView iconName='speedometer' value={`${walk.difficulty}/10`}/>
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
        minHeight: 120,
    },
    metricsContainer: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
})

export default WalkCard;