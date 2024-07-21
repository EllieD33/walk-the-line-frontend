import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomTextInput from "../components/form-components/CustomTextInput";
import FormButton from "../components/form-components/FormButton";
import AuthStackLayout from "../layouts/AuthStackLayout";
import globalStyles from "../styles/globalStyles";
import { signUp } from '../api'

const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').max(15, 'Password cannot be more than 15 characters').required('Password is required'),
    passwordConfirm: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required'),
});

const SignUpScreen = ({ navigation }) => {
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
                    <FormButton
                        role={"submit"}
                        text="Sign up"
                        loading={loading}
                        loadingText="Signing up..."
                        onPress={handleSubmit(onSubmit)}
                        accessibilityLabel="Sign up button"
                        accessibilityHint="Double tap to sign up" />
                </View>
                <View style={styles.center} >
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
    }
})

export default SignUpScreen;
