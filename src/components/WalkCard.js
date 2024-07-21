import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MetricView = ({ iconName, value }) => (
    <View style={styles.metricContainer}>
        <MaterialCommunityIcons name={iconName} size={16} color={'white'} />
        <Text style={{ marginLeft: 5 }}>{value}</Text>
    </View>
);

const WalkCard = (walk) => {
    return (
        <View>
            <Text>{walk.title}</Text>
            <Text>{walk.description}</Text>
            <View>
                <MetricView iconName='walk' value={walk.distance} />
                <MetricView iconName='slope-uphill' value={walk.ascent} />
                <MetricView iconName='speedometer' value={walk.difficulty} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    metricContainer: {
        lexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 5
    }
})

export default WalkCard;