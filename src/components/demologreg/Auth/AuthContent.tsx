import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import FlatButton from '../ui/FlatButton';
import AuthForm from './AuthForm';
import { Colors } from '../styles.js';
import { useNavigation } from '@react-navigation/native';

type CredentialProp = {
    email: string
    confirmEmail: string
    password: string
    confirmPassword: string
}

type IsCredentialsProp = {
    email: boolean, confirmEmail: boolean, password: boolean, confirmPassword: boolean
}

type onAuthProp = { email: string, password: string }

type AuthProp = { isLogin: boolean, onAuthenticate?: ({ email, password }: onAuthProp) => any }

function AuthContent({ isLogin, onAuthenticate = () => { } }: AuthProp) {
    const navigation:any = useNavigation();
    const [credentialsInvalid, setCredentialsInvalid] = useState<IsCredentialsProp>({
        email: false,
        password: false,
        confirmEmail: false,
        confirmPassword: false,
    });

    function switchAuthModeHandler() {
        if(isLogin){
            navigation.navigate("Signup");
        }else{
            navigation.navigate("Login");
        }
    }

    function submitHandler(credentials: CredentialProp) {
        let { email, confirmEmail, password, confirmPassword } = credentials;

        email = email.trim();
        password = password.trim();

        const emailIsValid = email.includes('@');
        const passwordIsValid = password.length > 6;
        const emailsAreEqual = email === confirmEmail;
        const passwordsAreEqual = password === confirmPassword;

        if (
            !emailIsValid ||
            !passwordIsValid ||
            (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
        ) {
            Alert.alert('Invalid input', 'Please check your entered credentials.');
            setCredentialsInvalid({
                email: !emailIsValid,
                confirmEmail: !emailIsValid || !emailsAreEqual,
                password: !passwordIsValid,
                confirmPassword: !passwordIsValid || !passwordsAreEqual,
            });
            return;
        }
        onAuthenticate({ email, password });
    }

    return (
        <View style={styles.authContent}>
            <AuthForm
                isLogin={isLogin}
                onSubmit={submitHandler}
                credentialsInvalid={credentialsInvalid}
            />
            <View style={styles.buttons}>
                <FlatButton onPress={switchAuthModeHandler}>
                    {isLogin ? 'Create a new user' : 'Log in instead'}
                </FlatButton>
            </View>
        </View>
    );
}

export default AuthContent;

const styles = StyleSheet.create({
    authContent: {
        marginTop: 64,
        marginHorizontal: 32,
        padding: 16,
        borderRadius: 8,
        backgroundColor: Colors.primary800,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
    },
    buttons: {
        marginTop: 8,
    },
});