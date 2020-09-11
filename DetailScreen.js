import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
class DetailScreen extends React.Component {
    static defaultNavigationOptions = {
        title: "Detailss",
    
        headerStyle: {
            backgroundColor: "#fff"
        }
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>Details Screen</Text>
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate("Home")}
                />
                <Text style={styles.headerText}> Go Back </Text>
                <Button
                    title="Go Back"
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    headerText: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontWeight: "bold"
    }
});
export default DetailScreen;