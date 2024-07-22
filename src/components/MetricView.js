import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import globalStyles from "../styles/globalStyles";

const MetricView = ({ iconName, value }) => {
    return (
        <View style={styles.metric}>
            <MaterialCommunityIcons name={iconName} size={18} color={'black'} />
            <Text style={[globalStyles.textDark,{ marginLeft: 5 }]}>{value}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    metric: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 8,
    },
});

export default MetricView;