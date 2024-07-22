import { useEffect, useState } from "react";
import { SafeAreaView, Text, ActivityIndicator, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapWithPolyLines from "../components/MapWithPolyLines";

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
        <SafeAreaView style={styles.container}>
            <MapWithPolyLines walkId={walk.walk_id} />
            <Text>{walk.title}</Text>
            <Text>{walk.description}</Text>
            <Text>{`${walk.distance_km} km`}</Text>
            <Text>{`${walk.ascent} m`}</Text>
            <Text>{`${walk.difficulty}/10`}</Text>
            <Text>Start at: {startAddress}</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default WalkDetailsScreen;
