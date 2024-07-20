import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import CustomTextInput from "../components/form-components/CustomTextInput";
import FormButton from "../components/form-components/FormButton";
import AuthStackLayout from "../layouts/AuthStackLayout";
import globalStyles from "../styles/globalStyles";

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
