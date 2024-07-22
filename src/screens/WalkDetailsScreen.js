import { useEffect, useState } from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapWithPolyLines from "../components/MapWithPolyLines";
import globalStyles from "../styles/globalStyles";
import MetricView from "../components/MetricView";

const WalkDetailsScreen = ({ navigation, route }) => {
    const [startAddress, setStartAddress] = useState(null);
    const { walk } = route.params;

    useEffect(() => {
        const getAddressFromCoords = async (latitude, longitude) => {
            try {
                let addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude });
                if (addressResponse.length > 0) {
                    return addressResponse[0].formattedAddress;
                } else {
                    throw new Error('Address not found');
                }
            } catch (error) {
                console.error('Error fetching address:', error);
                throw error;
            }
        };

        const fetchStartAddress = async () => {
            try {
                const address = await getAddressFromCoords(walk.start_latitude, walk.start_longitude);
                setStartAddress(address);
            } catch (error) {
                console.error("Error fetching start address:", error);
                setStartAddress(null);
            }
        };

        fetchStartAddress();
    }, []);

    return (
        <SafeAreaView style={styles.screen}>
            <MapWithPolyLines walkId={walk.walk_id} />
            <View style={styles.container}>
                <Text style={[globalStyles.h1, {textAlign: 'center'}]} >{walk.title}</Text>
                <Text style={[globalStyles.textDark, {textAlign: 'center'}]}>{walk.description}</Text>
                <View style={styles.metricContainer}>
                    <MetricView iconName={'walk'} value={`Distance: ${walk.distance_km} km`} />
                    <MetricView iconName='slope-uphill' value={`Total Ascent: ${walk.ascent} m`} />
                </View>
                <View style={styles.center} >
                    <MetricView iconName='speedometer' value={`Difficulty: ${walk.difficulty}/10`}/>
                    <MetricView iconName='map-marker' value={`Start at: ${startAddress}`}/>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 40,
    },
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'flex-start',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    metricContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
    }
});

export default WalkDetailsScreen;
