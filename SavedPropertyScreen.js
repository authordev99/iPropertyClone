import React, { Fragment } from "react";
import { StyleSheet, StatusBar, Text, TouchableOpacity, View} from "react-native";

export default function SavedPropertyScreen() {
    return (
        <Fragment>
            <StatusBar barStyle='dark-content' />
            <View style={styles.container}>
                <Text>Saved Properties</Text>
                <Text>You mush be logged in to save properties</Text>
                <TouchableOpacity style={styles.sendButton} onPress={()=>alert('Login')}>
                    <Text style={styles.sendButtonText}>LOG IN</Text>
                </TouchableOpacity>
            </View>
        </Fragment>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sendButton: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingStart:32,
        paddingEnd:32,
        borderRadius: 4,
        justifyContent: 'center',
        marginTop: 16,
        backgroundColor: '#0181C7',
        overflow: 'hidden'
    },
    sendButtonText: {
        color: 'white',
        textAlign: 'center',
    },
})