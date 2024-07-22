import { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Polyline, UrlTile } from "react-native-maps";
import { getWalkLocationPoints } from "../api";

const MapWithPolyLines = ({ walkId }) => {
    const [region, setRegion] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [locationPoints, setLocationPoints] = useState([]);

    useEffect(() => {
        const fetchLocationPoints = async () => {
            try {
                const points = await getWalkLocationPoints(walkId);
                setLocationPoints(points);
                if (points.length > 0) {
                    const latitudes = points.map(point => point.latitude);
                    const longitudes = points.map(point => point.longitude);
                    const minLat = Math.min(...latitudes);
                    const maxLat = Math.max(...latitudes);
                    const minLong = Math.min(...longitudes);
                    const maxLong = Math.max(...longitudes);

                    setRegion({
                        latitude: (minLat + maxLat) / 2,
                        longitude: (minLong + maxLong) / 2,
                        latitudeDelta: (maxLat - minLat) * 1.2,
                        longitudeDelta: (maxLong - minLong) * 1.2,
                    });
                }
            } catch (error) {
                console.error("Error retrieving location points:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLocationPoints();
    }, [walkId]);

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
                    mapType='none'
                >
                    <UrlTile
                        urlTemplate={tileUrl}
                        maximumZ={19}
                        flipY={false}
                        tileSize={256}
                    />
                    {locationPoints.length > 0 && (
                        <Polyline
                            coordinates={locationPoints.map(point => ({
                                latitude: point.latitude,
                                longitude: point.longitude,
                            }))}
                            strokeColor="#6750A4"
                            strokeWidth={3}
                        />
                    )}
                </MapView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MapWithPolyLines;
