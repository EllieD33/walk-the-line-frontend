import { useState, useEffect, useRef } from "react";
import { SafeAreaView, Text, StyleSheet, View, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import haversine from "haversine-distance";
import MapWithPolyLines from "../components/MapWithPolyLines";
import NavButton from "../components/buttons/NavButton";
import globalStyles from "../styles/globalStyles";

const RecordWalkScreen = () => {
    const [region, setRegion] = useState(null);
    const [userLocationHistory, setUserLocationHistory] = useState([]);
    const [totalDistance, setTotalDistance] = useState(0);
    const [totalAscent, setTotalAscent] = useState(0);
    const [isTracking, setIsTracking] = useState(false);
    const locationSubscription = useRef(null);

    useEffect(() => {
        const initialiseLocation = async () => {
            try {
                let location = await Location.getCurrentPositionAsync({});
                const initialRegion = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                    altitude: location.coords.altitude || 0,
                };
                setRegion(initialRegion);
            } catch (error) {
                console.error('Error fetching initial location:', error);
            }
        };
        initialiseLocation();
    }, []);

    const startLocationTracking = async () => {
        try {
            let location = await Location.getCurrentPositionAsync({});
            const initialLocation = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                altitude: location.coords.altitude.toFixed(2),
            };
            setUserLocationHistory([initialLocation]);

            locationSubscription.current = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.BestForNavigation,
                    distanceInterval: 10,
                    timeInterval: 10000,
                },
                (location) => {
                    const newLocation = {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        altitude: location.coords.altitude.toFixed(2),
                    };

                    setUserLocationHistory((prev) => {
                        const lastLocation = prev[prev.length - 1];
                        const distanceMoved = haversine(lastLocation, newLocation);

                        let ascent = 0;
                        const altitudeChange = newLocation.altitude - lastLocation.altitude;
                        const isRealisticChange = Math.abs(altitudeChange) < 3;
                        const minElevationChange = 0.3;

                        if (altitudeChange > minElevationChange && isRealisticChange) {
                            ascent = altitudeChange;
                        }

                        if (distanceMoved > 0.0001) {
                            setTotalDistance((previousDistance) => previousDistance + distanceMoved / 1000);
                            setTotalAscent((previousAscent) => previousAscent + ascent);
                            return [...prev, newLocation];
                        } else {
                            return prev;
                        }
                    });
                }
            );
        } catch (error) {
            console.error('Error in location tracking:', error);
        }
    };

    const handleStart = () => {
        startLocationTracking();
        setIsTracking(true);
    }

    const handleStop = () => {
        if (locationSubscription.current) {
            locationSubscription.current.remove();
        }
        setIsTracking(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mapContainer}>
                {region && (
                <MapWithPolyLines 
                    walkId={null} 
                    customRegion={region}
                    liveLocationPoints={userLocationHistory}
                />
                )}
            </View>
            <View style={styles.info}>
                <View style={styles.metric}>
                    <MaterialCommunityIcons name="walk" size={30} color={'#4AC483'}/>
                    <Text style={[globalStyles.textDarkLarge, {marginLeft: 4}]} >{totalDistance.toFixed(2)} km</Text>
                </View>
                <View style={styles.metric}>
                    <MaterialCommunityIcons name="slope-uphill" size={30} color={'#4AC483'} />
                    <Text style={[globalStyles.textDarkLarge, {marginLeft: 6}]} >{totalAscent.toFixed(2)} m</Text>
                </View>
            </View>
            <View style={styles.buttonContainer} >
                <NavButton text={isTracking ? "Stop Tracking" : "Start Tracking"} onPress={isTracking ? handleStop : handleStart} isOutline={false} buttonWidth={200} color={'primary'} />
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D4EADF'
    },
    mapContainer: {
        flex: 3,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 10,
    },
    metric: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        paddingBottom: 8,
    }
});

export default RecordWalkScreen;