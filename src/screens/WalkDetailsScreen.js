import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import * as Location from "expo-location";
import MapWithPolyLines from "../components/MapWithPolyLines";
import globalStyles from "../styles/globalStyles";
import MetricView from "../components/MetricView";
import CustomButton from "../components/buttons/CustomButton";
import { capitaliseFirstLetter } from "../utils/helpers";

const WalkDetailsScreen = ({ navigation, route }) => {
    const [startAddress, setStartAddress] = useState(null);
    const { walk } = route.params;
    const insets = useSafeAreaInsets();

    useEffect(() => {
        const getAddressFromCoords = async (latitude, longitude) => {
            try {
                let addressResponse = await Location.reverseGeocodeAsync({
                    latitude,
                    longitude,
                });
                if (addressResponse.length > 0) {
                    return addressResponse[0].formattedAddress;
                } else {
                    throw new Error("Address not found");
                }
            } catch (error) {
                console.error("Error fetching address:", error);
                throw error;
            }
        };

        const fetchStartAddress = async () => {
            try {
                const address = await getAddressFromCoords(
                    walk.start_latitude,
                    walk.start_longitude
                );
                setStartAddress(address);
            } catch (error) {
                console.error("Error fetching start address:", error);
                setStartAddress(null);
            }
        };

        fetchStartAddress();
    }, []);

    const handleFollowPress = () => {
        navigation.navigate("FollowRoute", { walk });
    };

    return (
        <SafeAreaView
            style={[
                styles.screen,
                { paddingTop: insets.top, paddingBottom: insets.bottom },
            ]}
        >
            <MapWithPolyLines walkId={walk.walk_id} />
            <View style={styles.container}>
                <Text style={[globalStyles.h1, { textAlign: "center" }]}>
                    {walk.title}
                </Text>
                <Text style={[globalStyles.textDark, { textAlign: "center" }]}>
                    {walk.description}
                </Text>
                <View style={styles.metricContainer}>
                    <MetricView
                        iconName={"walk"}
                        value={`Distance: ${walk.distance_km} km`}
                    />
                    <MetricView
                        iconName="slope-uphill"
                        value={`Total Ascent: ${walk.ascent} m`}
                    />
                </View>
                <View style={styles.center}>
                    <MetricView
                        iconName="speedometer"
                        value={`Difficulty: ${capitaliseFirstLetter(
                            walk.difficulty
                        )}`}
                    />
                </View>
                <View style={styles.center}>
                    <MetricView iconName="map-marker" value={`Start at:`} />
                    <Text
                        style={[globalStyles.textDark, { textAlign: "center" }]}
                    >
                        {startAddress}
                    </Text>
                </View>
                <View
                    style={{
                        marginTop: 8,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                >
                    <CustomButton
                        text="Follow route"
                        onPress={handleFollowPress}
                        variant="filledLight"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 10,
        justifyContent: "flex-start",
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
    metricContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 4,
    },
});

export default WalkDetailsScreen;
