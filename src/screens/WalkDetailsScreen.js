import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Modal } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import * as Location from "expo-location";
import MapWithPolyLines from "../components/MapWithPolyLines";
import globalStyles from "../styles/globalStyles";
import MetricView from "../components/MetricView";
import CustomButton from "../components/buttons/CustomButton";
import DeleteButton from "../components/buttons/DeleteButton";
import ConfirmAction from "../components/ConfirmAction";
import { deleteWalk } from "../api";
import { fetchWalks } from "../store/slices/walksSlice"
import { capitaliseFirstLetter } from "../utils/helpers";

const WalkDetailsScreen = ({ navigation, route }) => {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [startAddress, setStartAddress] = useState(null);
    const { walk } = route.params;
    const user = useSelector((state) => state.auth.user);
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();

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

    const handleConfirmDelete = async () => {
        setConfirmDelete(false);
        await deleteWalk(walk.walk_id);
        dispatch(fetchWalks());
        navigation.goBack();
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
                    {walk.difficulty &&
                        <View style={styles.center}>
                        <MetricView
                            iconName="speedometer"
                            value={`Difficulty: ${capitaliseFirstLetter(
                                walk.difficulty
                            )}`}
                        />
                    </View>}
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
                {user.user_id === walk.creator_id && (
                    <View style={styles.deleteContainer}>
                        <DeleteButton walkId={walk.walk_id} setConfirmDelete={setConfirmDelete} />
                    </View>
                )}
                </View>
                <Modal
                    visible={confirmDelete}
                    transparent={false}
                    animationType="slide"
                    onRequestClose={() => setConfirmDelete(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <ConfirmAction
                                actionTitle="Delete walk"
                                actionText="Are you sure you want to delete this walk?"
                                confirmPress={handleConfirmDelete}
                                cancelPress={() => setConfirmDelete(false)}
                                confirmButtonText="Delete"
                                cancelButtonText="Cancel"
                            />
                        </View>
                    </View>
                </Modal>
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
        position: 'relative'
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
    deleteContainer:{
        position: "absolute",
        bottom: 0,
        left: 12,
        margin: 8,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        height: "60%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default WalkDetailsScreen;
