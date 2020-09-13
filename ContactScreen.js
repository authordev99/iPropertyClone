import React, { Component, Fragment } from "react";
import { Linking, TextInput, Platform, StatusBar, SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, View, FlatList, Button } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { openCall, openWhatsapp, openSmsUrl } from "./Utils";

export default class ContactScreen extends Component {
    state = {
        contact: this.props.navigation.state.params.contact,
        title: this.props.navigation.state.params.title,
        number: this.props.navigation.state.params.number
    }

    call = () => {
        openCall(this.state.number)
    }
    message = () => {
        openSmsUrl(this.state.number)
    }
    whatsapp = () => {
        openWhatsapp(this.state.number)
    }


    render() {
        let propertyContact = this.state.contact
        let defaultMessage = `Hi, i am interested in more information about ${this.state.title} . Please contact me. Thanks you.`
        return (
            <Fragment>
                <StatusBar barStyle='dark-content' />
                <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
                <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Icon name="close" size={24} color='black' />
                        </TouchableOpacity>
                        <View style={styles.contactContainer}>
                            <Image source={{ uri: propertyContact.image != null ? propertyContact.image.thumbnailUrl : (propertyContact.logo != null ? propertyContact.logo.thumbnailUrl : 'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg') }} style={styles.imageProfile} />
                            <Text>Contact {propertyContact.name}</Text>
                        </View>


                        <View style={{ flexDirection: 'row', marginTop: 16, justifyContent: 'center' }}>
                            <ContactButton iconName='phone' title='Call' action={this.call} />
                            <ContactButton iconName='comment' title='Message' action={this.message} />
                            <ContactButton iconName='whatsapp' title='Whatsapp' action={this.whatsapp} />


                        </View>


                        <CustomTextInput placeholder='Message' value={defaultMessage} />
                        <CustomTextInput placeholder='Name' />
                        <CustomTextInput placeholder='Email' />
                        <CustomTextInput placeholder='Phone' />

                    </View>
                    <View style={styles.agreementContainer}>
                        <Text>By sending, I agree to Your/iProperty.com Malaysia Sdn Bhd's Terms of Use and Privacy Policy including Your Collection., use, disclosure, processing, storage and handling of my personal information; and to receiving direct marketing communcations from You and/or Your Partners.</Text>
                        <TouchableOpacity style={styles.sendButton} onPress={() => this.props.navigation.goBack()}>
                            <Text style={styles.sendButtonText}>SEND TO DEVELOPER</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Fragment>
        )
    }

}

const CustomTextInput = (props) => {
    return (
        <TextInput
            placeholder={props.placeholder}
            multiline={true}
            style={styles.textInput}>
            {props.value}
        </TextInput>
    )
}

const ContactButton = (props) => {
    return (
        <TouchableOpacity style={styles.contactButton} onPress={props.action}>
            <View style={styles.contactButtonContent}>
                <Icon name={props.iconName} size={18} color="black" />
                <Text style={{ marginStart: 4 }}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "white"
    },
    contactContainer: {
        alignItems: 'center'
    },
    imageProfile: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        margin: 8
    },
    textInput: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#b5bbc1',
        paddingTop: 16,
        paddingStart: 8,
        paddingBottom: 16,
        paddingEnd: 8,
        marginTop: 16
    },
    agreementContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        marginStart: 14,
        marginEnd: 16,
        marginBottom: 16,
        bottom: 0
    },
    sendButton: {
        padding: 16,
        borderRadius: 4,
        justifyContent: 'center',
        marginTop: 16,
        flex: 1,
        backgroundColor: '#0181C7',
        overflow: 'hidden'
    },
    sendButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    contactButton: {
        padding: 8,
        borderRadius: 4,
        marginEnd: 8,
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#b5bbc1',

    },
    contactButtonContent: {
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',
    },


})