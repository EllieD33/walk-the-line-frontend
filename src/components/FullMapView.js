import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import * as Location from 'expo-location';
import MapView, { Callout, Marker, UrlTile } from "react-native-maps";
import { selectAllWalks  } from "../store/slices/walksSlice";
import globalStyles from "../styles/globalStyles";
import PropTypes from "prop-types";

const FullMapView = ({ navigation }) => {
    const walks = useSelector(selectAllWalks);    
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
                            <Callout onPress={() => navigation.navigate('WalkDetails', { walk })} >
                                <View style={styles.calloutContainer}>
                                    <Text style={[globalStyles.textBoldDark, styles.centerText]}>{walk.title}</Text>
                                    <Text style={[globalStyles.textDark, styles.centerText]}>{walk.description}</Text>
                                </View>
                                <Text style={[globalStyles.labelDark, styles.centerText, { marginBottom: 8 }]}>Tap to view walk</Text>
                            </Callout>
                        </Marker>
                    ))}
                </MapView>
            )}
        </View>
    );
};

FullMapView.propTypes = {
    navigation: PropTypes.object.isRequired,
};

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
        overflow: 'hidden',
    },
    centerText: {
        textAlign: 'center'
    }
});

export default FullMapView;