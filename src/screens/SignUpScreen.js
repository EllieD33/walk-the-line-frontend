import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import CustomTextInput from "../components/form-components/CustomTextInput";
import AppName from "../components/AppName";
import FormButton from "../components/form-components/FormButton";
import AuthStackLayout from "../layouts/AuthStackLayout";

function SignUpScreen({ navigation }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
    });

    const onSubmit = (data) => {
        console.log(data);
        //Add logic
    };

    return (
        <AuthStackLayout style={styles.screen}>
                <View>
                    <Text style={styles.title}>Sign up</Text>
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
                                secureTextEntry={true}
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
                                secureTextEntry={true}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                error={errors.passwordConfirm?.message}
                                accessibilityLabel="Confirm password"
                                accessibilityHint="Input field for confirming your password"
                            />
                        )}
                    />
                    <FormButton
                        role={"submit"}
                        text="Sign up"
                        onPress={handleSubmit(onSubmit)}
                        accessibilityLabel="Sign up button"
                        accessibilityHint="Double tap to sign up" />
                </View>
                <View style={styles.center} >
                    <Text style={styles.text}>
                        Already have an account?{' '}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.link}>Log in</Text>
                    </TouchableOpacity>
                </View>
        </AuthStackLayout>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 8,
    },
    text: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
    link: {
        fontWeight: 'bold',
        color: '#1c4d31',
        fontSize: 16,
        marginTop: 4,
    },
    center: {
        alignItems: 'center'
    }
})

export default SignUpScreen;
