import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MetricView = ({ iconName, value }) => {
    return (
        <View style={styles.metric}>
            <MaterialCommunityIcons name={iconName} size={16} color={'black'} />
            <Text style={{ marginLeft: 5 }}>{value}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    metric: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 5
    },
});

export default MetricView;