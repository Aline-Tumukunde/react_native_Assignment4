import React from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';

const SignInScreen = () => {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: '145648073412-ugm0f2pn51d8u4a2ee2edl38m6sirhha.apps.googleusercontent.com',
    });

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;

            console.log('Received ID token:', id_token);
            authenticateWithBackend(id_token);
        }
    }, [response]);

    const authenticateWithBackend = async (idToken) => {
        try {
            const response = await fetch('145648073412-ugm0f2pn51d8u4a2ee2edl38m6sirhha.apps.googleusercontent.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_token: idToken }),
            });
            if (response.ok) {
                console.log('User authenticated with backend');
            } else {
                console.error('Failed to authenticate user with backend');
            }
        } catch (error) {
            console.error('Error authenticating with backend:', error.message);
        }
    };

    return (
        <SafeAreaView>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Sign in with</Text>
                <Text>Your text content here</Text>
                <Button
                    title="Sign in with Google"
                    onPress={() => {
                        promptAsync();
                    }}
                />
                <Button
                    title="Sign up with Google"
                    onPress={() => {
                        promptAsync();
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

export default SignInScreen;
