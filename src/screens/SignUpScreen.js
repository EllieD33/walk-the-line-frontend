import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomTextInput from "../components/form-components/CustomTextInput";
import CustomButton from '../components/buttons/CustomButton';
import AuthStackLayout from "../layouts/AuthStackLayout";
import globalStyles from "../styles/globalStyles";
import { signUp, getUsernames } from '../api'
import { Ionicons } from '@expo/vector-icons';

const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').max(15, 'Password cannot be more than 15 characters').required('Password is required'),
    passwordConfirm: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required'),
});

const SignUpScreen = ({ navigation }) => {
    const [usernames, setUsernames] = useState([]);
    const [usernameTaken, setUsernameTaken] = useState(false);
    const [typingStarted, setTypingStarted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [signUpFailed, setSignUpFailed] = useState('');
    const [apiError, setApiError] = useState('');
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
    });
    
    useEffect(() => {
        const fetchUsernames = async () => {
            try {
                const usernameList = await getUsernames();
                setUsernames(usernameList);
            } catch (error) {
                console.error("Failed to fetch usernames:", error);
            }
        };
        fetchUsernames();
    }, [])

    const usernameValue = useWatch({
        control,
        name: 'username',
    });

    useEffect(() => {
        if (usernameValue) {
            setTypingStarted(true);
            setUsernameTaken(usernames.includes(usernameValue));
        } else {
            setTypingStarted(false);
        }
    }, [usernameValue]);

    const onSubmit = async (data) => {
        setLoading(true);
        setSignUpFailed('');
        setApiError('');
        try {
            const response = await signUp(data)
            if (response.success) {
                reset();
                navigation.navigate('Login');
            } else {
                setSignUpFailed('Sign up failed');
            }
        } catch (error) {
            setApiError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthStackLayout style={styles.screen}>
                <View>
                    <Text style={[globalStyles.h1, styles.title]}>Sign up</Text>
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
                                isSecure={false}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                error={errors.username?.message}
                                accessibilityLabel="Username"
                                accessibilityHint="Input field for your username"
                            />
                        )}
                    />
                    {typingStarted && (
                        <View style={styles.flexRow}>
                            <Ionicons name={usernameTaken ? 'close-circle' : 'checkmark-circle'} size={24} color="white" />
                            <Text style={globalStyles.label}>
                                {usernameTaken ? ' Username not available' : ' Username available'}
                            </Text>
                        </View>
                    )}
                    <Controller
                        control={control}
                        name="email"
                        rules={{ required: "Email is required" }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <CustomTextInput
                                placeholder="Enter email address"
                                label="Email address"
                                secureTextEntry={false}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                error={errors.email?.message}
                                accessibilityLabel="Email address"
                                accessibilityHint="Input field for your email address"
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
                    <Controller
                        control={control}
                        name="passwordConfirm"
                        rules={{ required: "Password is required" }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <CustomTextInput
                                placeholder="Confirm password"
                                label="Confirm password"
                                isSecure={true}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                error={errors.passwordConfirm?.message}
                                accessibilityLabel="Confirm password"
                                accessibilityHint="Input field for confirming your password"
                            />
                        )}
                    />
                    <Text style={[globalStyles.errorText, styles.centredText]}>
                    {signUpFailed || apiError || ''}
                </Text>
                    <CustomButton
                        text="Sign up"
                        loading={loading}
                        loadingText="Signing up..."
                        onPress={handleSubmit(onSubmit)}
                        accessibilityLabel="Sign up button"
                        variant='filledLight'
                    />
                </View>
                <View style={[styles.center, { marginTop: 8 }]} >
                    <Text style={[globalStyles.textWhite, styles.centredText]}>
                        Already have an account?{' '}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={[globalStyles.textBoldDark, styles.link]}>Log in</Text>
                    </TouchableOpacity>
                </View>
        </AuthStackLayout>
    );
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
    },
    flexRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default SignUpScreen;
