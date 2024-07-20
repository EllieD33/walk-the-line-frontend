import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from 'react-redux';  // 
import CustomTextInput from "../components/form-components/CustomTextInput";
import FormButton from "../components/form-components/FormButton";
import AuthStackLayout from '../layouts/AuthStackLayout'; 
import globalStyles from "../styles/globalStyles";
import { logIn } from '../api';
import { loggedInUser } from '../slices/authSlice'; 

function LoginScreen({ navigation }) {
    const dispatch = useDispatch(); 
    const [loading, setLoading] = useState(false);
    const [logInFailed, setLogInFailed] = useState('');
    const [apiError, setApiError] = useState('');
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        setLoading(true);
        setLogInFailed('');
        setApiError('');
        try {
            const response = await logIn(data)
            if (response.success) {
                reset();
                dispatch(loggedInUser(response.user)); 
                // Will navigate to HomeScreen
                console.log('Login successful', response);
            } else {
                setLogInFailed(response.message  || 'Invalid credentials');
            }
        } catch (error) {
            setApiError(error.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthStackLayout>
            <View>
                <Text style={[globalStyles.h1, styles.title]}>Log in</Text>
            </View>
            <View>
                <Controller
                    control={control}
                    name="username"
                    rules={{ required: "Username is required" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextInput
                            placeholder="Enter username"
                            label="Username"
                            secureTextEntry={false}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            error={errors.username?.message}
                            accessibilityLabel="Username"
                            accessibilityHint="Input field for your username"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    rules={{ required: "Password is required" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextInput
                            placeholder="Enter password"
                            label="Password"
                            isSecure={true}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            error={errors.password?.message}
                            accessibilityLabel="Password"
                            accessibilityHint="Input field for your password"
                        />
                    )}
                />
                <Text style={[globalStyles.errorText,styles.centredText]}>
                    {logInFailed || apiError || ''}
                </Text>
                <FormButton
                    role={"submit"}
                    text="Log in"
                    loading={loading}
                    loadingText="Logging in..."
                    onPress={handleSubmit(onSubmit)}
                    accessibilityLabel="Log in button"
                    accessibilityHint="Double tap to log in"
                />
            </View>
            <View style={styles.center} >
                <Text style={[globalStyles.textWhite, styles.centredText]}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={[globalStyles.textBoldDark, styles.link]}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </AuthStackLayout>
    )
}

const styles = StyleSheet.create({
    title: {
        color: '#fff',
        textAlign: 'center',
    },
    centredText: {
        textAlign: 'center',
    },
    link: {
        marginTop: 4,
    },
    center: {
        alignItems: 'center'
    }
});

export default LoginScreen;
