import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import * as Location from 'expo-location';
import MapView, { Callout, Marker, UrlTile } from "react-native-maps";
import { fetchWalks, selectAllWalks, getWalksStatus  } from "../store/slices/walksSlice";

const FullMapView = () => {
    const dispatch = useDispatch();
    const walks = useSelector(selectAllWalks);
    const status = useSelector(getWalksStatus);
    
    const [region, setRegion] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initialiseMap = async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.error('Permission to access location was denied');
                    setIsLoading(false);
                    return;
                }
                let location = await Location.getCurrentPositionAsync({});
                setRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                    altitude: location.coords.altitude || 0,
                });
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        initialiseMap();
    }, []);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchWalks());
        }
    }, [dispatch, status]);

    const tileUrl = "https://tile.openstreetmap.de/{z}/{x}/{y}.png";

    if (isLoading) {
        return <ActivityIndicator style={styles.center} size="large" />;
    }

    return (
        <View style={styles.container}>
            {region && (
                <MapView
                    style={styles.map}
                    initialRegion={region}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    mapType="none"
                >
                    <UrlTile
                        urlTemplate={tileUrl}
                        maximumZ={19}
                        flipY={false}
                        tileSize={256}
                    />
                    {walks && walks.map((walk) => (
                        <Marker
                            key={walk.walk_id}
                            coordinate={{
                                latitude: walk.start_latitude,
                                longitude: walk.start_longitude,
                            }}
                            title={walk.title}
                            description={walk.description}
                        >
                            <Callout>
                                <View style={styles.calloutContainer}>
                                    <Text style={styles.calloutTitle}>{walk.title}</Text>
                                    <Text style={styles.calloutDescription}>{walk.description}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    ))}
                </MapView>
            )}
        </View>
    );
};

export default FullMapView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    calloutContainer: {
        width: 200,
        padding: 10,
        backgroundColor: "white",
    },
    calloutTitle: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: "center",
    },
    calloutDescription: {
        fontSize: 14,
        marginBottom: 5,
        color: "#888",
        textAlign: "center",
    },
});
