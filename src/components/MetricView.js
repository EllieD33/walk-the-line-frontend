import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import globalStyles from "../styles/globalStyles";

const MetricView = ({ iconName, value }) => {
    const [identifier, ...rest] = value.split(':');
    const restValue = rest.join(':'); 

    return (
        <View style={styles.metric}>
            <MaterialCommunityIcons name={iconName} size={18} color={'#4AC483'} />
            <Text style={[globalStyles.textDark, { marginLeft: 5 }]}>
                {rest.length ? (
                    <>
                        <Text style={globalStyles.textBoldDark}>{identifier}:</Text>
                        {restValue}
                    </>
                ) : (
                    <Text style={globalStyles.textDark}>{identifier}</Text>
                )}
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    metric: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 8,
        marginHorizontal: 4
    },
});

export default MetricView;