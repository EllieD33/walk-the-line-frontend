import { useState } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { Controller, useForm } from "react-hook-form";
import Picker from "react-native-picker-select";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import CustomButton from "./buttons/CustomButton";
import CustomTextInput from "./form-components/CustomTextInput";
import ConfirmAction from "./ConfirmAction";
import { uploadWalk } from "../api";
import { fetchWalks } from '../store/slices/walksSlice';
import globalStyles from "../styles/globalStyles";

const schema = yup.object().shape({
    title: yup.string().min(5, 'Title must be at least 5 characters').max(50, 'Title cannot be more than 50 characters').required('Walk title is required'),
    description: yup.string().min(10, 'Description must be at least 10 characters').max(255, 'Description cannot be more than 255 characters').required('Walk description is required')
});

const UploadModal = ({ 
    modalVisible, 
    setModalVisible, 
    userLocationHistory, 
    totalDistance, 
    totalAscent, 
    setUserLocationHistory, 
    setTotalDistance, 
    setTotalAscent 
}) => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const [difficulty, setDifficulty] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [uploadedWalk, setUploadedWalk] = useState(null);
    const [confirmDiscard, setConfirmDiscard] = useState(false);
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const onSubmit = async (data) => {
        setIsUploading(true);
        
        const walkObject = {
            walk: {
                creator_id: user.user_id,
                title: data.title,
                description: data.description,
                distance_km: totalDistance,
                ascent: totalAscent,
                difficulty: difficulty.toLowerCase(),
                start_latitude: userLocationHistory[0].latitude,
                start_longitude: userLocationHistory[0].longitude,
                start_altitude: userLocationHistory[0].altitude,
            },
            locations: userLocationHistory,
        };
        
        try {
            const response = await uploadWalk(walkObject);
            setUploadedWalk(response.walk);
            setUserLocationHistory([]);
            setTotalDistance(0);
            setTotalAscent(0);
            dispatch(fetchWalks());
        } catch (error) {
            console.log("Error uploading walk:", error);
            setUploadError("Unable to upload walk, please try again");
        } finally {
            setIsUploading(false);
        }        
    };

    const handleDiscardPress = () => {
        setConfirmDiscard(true);
    };

    const handleDiscardConfirm = () => {
        reset();
        setUserLocationHistory([]);
        setTotalDistance(0);
        setTotalAscent(0);
        setModalVisible(false);
        setUploadError(null);
    }

    const confirmDiscardText = "Are you sure you want to discard this walk? The walk data will be deleted."

    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
            transparent={true}
        >
            <View style={styles.modal}>
                {uploadedWalk ? (
                    <View style={styles.successContainer}>
                        <Text style={globalStyles.h1}>Success!</Text>
                        <Text style={[globalStyles.textDark, styles.centeredText]}>
                            Your walk "{uploadedWalk.title}" has been uploaded.
                        </Text>
                        <CustomButton
                            text="Close"
                            onPress={() => setModalVisible(false)}
                            variant='filledLight'
                        />
                    </View>
                ) : (
                    confirmDiscard ? (
                        <View>
                            <ConfirmAction 
                                actionTitle="Discard walk"
                                actionText={confirmDiscardText} 
                                confirmPress={handleDiscardConfirm}
                                cancelPress={() => setConfirmDiscard(false)}
                                confirmButtonText="Discard"
                                cancelButtonText="Cancel"
                            />
                        </View>
                    ) : (
                        <>
                        <View >
                            <Text style={[globalStyles.h1, styles.centeredText]}>
                                Upload your walk
                            </Text>
                            <Text style={[globalStyles.textDark, styles.centeredText]}>
                                Let others follow in your footsteps...upload your walk to share it with the world!
                            </Text>
                        </View>
                        <Controller 
                            control={control}
                            name="title"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <CustomTextInput 
                                    placeholder="Enter walk title"
                                    label="Title"
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    error={errors.title?.message}
                                    accessibilityLabel="Walk title"
                                    accessibilityHint="Input field for walk title"
                                    darkText={true}
                                />
                            )}
                        />
                        <Controller 
                            control={control}
                            name="description"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <CustomTextInput 
                                    placeholder="Enter walk description"
                                    label="Description"
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    error={errors.description?.message}
                                    accessibilityLabel="Walk description"
                                    accessibilityHint="Input field for walk description"
                                    darkText={true}
                                />
                            )}
                        />
                        <Text style={[globalStyles.labelDark, {marginTop: 10}]}>Difficulty</Text>
                        <Picker 
                        style={{marginTop: 8}}
                            items={[
                                { label: 'Easy', value: 'Easy' },
                                { label: 'Moderate', value: 'Moderate' },
                                { label: 'Challenging', value: 'Challenging' }
                            ]}
                            value={difficulty}
                            onValueChange={(value) => setDifficulty(value)}
                        />
                        {uploadError && (
                            <Text style={globalStyles.errorText}>{uploadError}</Text>
                        )}
                        <View style={styles.buttonContainer}>
                            <CustomButton 
                                text="Upload"
                                loading={isUploading}
                                loadingText="Uploading..."
                                onPress={handleSubmit(onSubmit)}
                                variant='filledPrimary'
                            />
                            <CustomButton 
                                text="Discard"
                                onPress={handleDiscardPress}
                                variant='filledLight'
                            />
                        </View>
                    </>
                    ) 
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
        padding: 20,
        margin: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    successContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    centeredText: {
        textAlign: "center",
        marginVertical: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    }
});

export default UploadModal;
