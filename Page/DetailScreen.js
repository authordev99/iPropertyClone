import React, { Component, Fragment } from "react";
import { StatusBar, SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, View, FlatList, Button } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import ListItemProperty from "../Component/ListItemProperty";
import { ScrollView } from "react-native-gesture-handler";
import { openCall, shareLink, openWhatsapp, openSmsUrl } from "../Utils/Utils";
class DetailScreen extends Component {

    onBackPressed = () => {
        this.props.navigation.goBack()
    }

    render() {
        let property = this.props.route.params.item
        let contactProperty = checkingContact(property.listers, property.organisations)
        let phoneNumber = checkingPhoneNumber(property.listers, property.organisations)

        return (
            <Fragment>
                <StatusBar barStyle='dark-content' />
                <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} >
                    <View style={styles.container}>

                        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                            <View>
                                <View style={styles.headerBarContainer}>
                                    <HeaderWithIcon onClickBack={this.onBackPressed} shareLink={property.shareLink} />
                                </View>
                                <ListItemProperty property={property} isDetailPage={true} />
                                <MortageCalculator />
                                <AddressAndDescription title={property.title} />
                                <PropertyDetails attributes={property.attributes} />
                                <PropertyListers listers={property.listers != null ? property.listers[0] : null} organisations={property.organisations[0]} />
                            </View>
                        </ScrollView>

                        <View style={styles.contactContainer}>
                            <TouchableOpacity style={styles.contactButton} onPress={() => this.props.navigation.navigate('Contact', { contact: contactProperty , title: property.title, number:phoneNumber})}>
                                <Text style={styles.contactText}>Contact</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.whatsappButton} onPress={() => openWhatsapp('Hi', phoneNumber)}>
                                <View style={styles.whatsappButtonContent}>
                                    <Icon name="whatsapp" size={18} color="#075e54" />
                                    <Text style={{ marginStart: 4 }}>Whatsapp</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                </SafeAreaView>
            </Fragment>
        );
    }
}

const HeaderWithIcon = (props) => {
    return (

        <View style={styles.headerSearchBarContainer}>
            <View style={{ marginStart: 16 }}>
                <TouchableOpacity onPress={props.onClickBack}>
                    <Icon name="arrow-left" size={18} styles={{ marginEnd: 16 }} />
                </TouchableOpacity>
            </View>
            <View style={styles.headerTitle}></View>
            <TouchableOpacity onPress={() => shareLink('Hello', props.shareLink)}>
                <View style={{ marginStart: 12, marginEnd: 16 }}>
                    <Icon name="share" size={18} />
                </View>
            </TouchableOpacity>
            <View style={{ marginStart: 12, marginEnd: 16 }}><Icon name="star" size={18} /></View>
        </View>

    )
}

const MortageCalculator = (props) => {
    return (

        <View style={styles.mortageContainer}>
            <Icon name="calculator" size={18} styles={{ marginEnd: 16 }} />
            <View flex={1} marginStart={16}>
                <Text style={styles.mortageTitleText}>Mortage Calculator</Text>
                <Text style={styles.mortageValueText}>RM 15,147 per month</Text>
            </View>
            <Icon name="chevron-right" size={18} styles={{ marginEnd: 16 }} />
        </View>
    )
}

const AddressAndDescription = (props) => {
    return (

        <View style={styles.cardColumnContainer}>
            <Text style={styles.addressText}>{props.title}</Text>
            <Text numberOfLines={3} style={styles.descriptionText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, </Text>
            <Text style={styles.readMore}>Read More</Text>
        </View>
    )
}

const PropertyDetails = (props) => {
    var propertyDetails = props.attributes;
    return (
        <View style={styles.cardColumnContainer}>
            <Text style={styles.addressText}>Property Details</Text>
            <PropertyAttributes title="Land Title" description={propertyDetails.landTitleType} />
            <PropertyAttributes title="Tenure" description={propertyDetails.tenure} />
            <PropertyAttributes title="Furnishing" description={propertyDetails.furnishing} />
            <PropertyAttributes title="Unit Type" description={propertyDetails.unitType} />
        </View>
    )
}

const PropertyAttributes = (props) => {

    return (
        <View style={{ flexDirection: 'row', marginTop: 6, marginBottom: 6 }}>
            <Text style={{ flex: 1 }}>{props.title}</Text>
            <Text style={{ flex: 1 }}>{props.description}</Text>
        </View>
    )
}

class PropertyListers extends Component {


    checkingProfilePicture(listers, organisations) {
        if (listers != null && listers.image != null) {
            return listers.image.thumbnailUrl
        } else if (organisations.logo != null) {
            return organisations.logo.thumbnailUrl
        } else {
            return "https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
        }
    }

    render() {
        let listers = this.props.listers
        let organisations = this.props.organisations
        let phoneNumber = checkingPhoneNumber(listers, organisations)
        let profilePicture = this.checkingProfilePicture(listers, organisations)
        return (
            <View style={[styles.cardColumnContainer, { flexDirection: 'row', alignItems: 'center' }]}>
                {
                    profilePicture != null ? (
                        <Image source={{ uri: profilePicture }} style={styles.imageProfile} />) : null
                }

                <View style={{ flex: 1 }}>
                    <Text>{listers != null ? listers.name : organisations.name}</Text>
                    {listers != null ? (<Text style={{ fontSize: 12 }}>{organisations.name}</Text>) : null}
                </View>
                {
                    phoneNumber != null ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => openSmsUrl(phoneNumber)}>
                                <View style={{ marginStart: 8, marginEnd: 8 }}>
                                    <Icon name="comment" size={24} color="#075e54" />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => openCall(phoneNumber)}>
                                <View style={{ marginStart: 8, marginEnd: 8 }}>
                                    <Icon name="phone" size={24} color="#075e54" />
                                </View>
                            </TouchableOpacity>
                        </View>) : null
                }
            </View>
        )
    }
}

export function checkingPhoneNumber(listers, organisations) {
    if (listers != null && listers.contact != null) {
        return listers.contact.phones[0].number
    } else if (organisations != null && organisations.contact != null) {
        return organisations.contact.phones[0].number
    } else {
        return null
    }
}
export function  checkingContact(listers, organisations) {
    if (listers != null && listers[0].contact != null) {
        return listers[0]
    } else if (organisations != null && organisations[0].contact != null) {
        return organisations[0]
    } else {
        return null
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f6f9"
    },
    headerText: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontWeight: "bold"
    },
    headerBarContainer: {
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: '#fff',
        shadowColor: '#b5bbc1',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 2
    },
    headerSearchBarContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: "center",
    },
    searchBarContainer: {
        flex: 1,
        flexDirection: 'row',
        marginStart: 16,
        marginEnd: 16,
        backgroundColor: '#fff',
        borderColor: '#b5bbc1',
        alignItems: "center",
        padding: 8,
        borderRadius: 4,
        borderWidth: 1
    },
    headerTitle: {
        flex: 1,
        marginStart: 16
    },
    mortageContainer: {
        padding: 16,
        marginTop: 8,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    mortageTitleText: {
        fontSize: 12,
    },
    mortageValueText: {
        fontSize: 18
    },
    addressText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8
    },
    descriptionText: {
        fontSize: 14,
        marginBottom: 4
    },
    readMore: {
        fontSize: 12,
        marginBottom: 4,
        color: '#0181C7',
        textTransform: 'uppercase'
    },
    cardColumnContainer: {
        flex: 1,
        padding: 16,
        marginTop: 8,
        backgroundColor: '#fff',
    },
    contactContainer: {
        flex: 1,
        borderColor: '#b5bbc1',
        borderWidth: 1,
        flexDirection: 'row',
        padding: 12,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0
    },
    contactButton: {
        padding: 8,
        borderRadius: 8,
        justifyContent: 'center',

        marginEnd: 8,
        flex: 1,

        backgroundColor: '#0181C7',
        overflow: 'hidden'
    },
    contactText: {
        color: 'white',
        textAlign: 'center',
    },
    whatsappButton: {
        padding: 8,
        borderRadius: 8,
        marginEnd: 8,
        flex: 1,
        borderWidth: 1,
        borderColor: '#b5bbc1',

    },
    whatsappButtonContent: {
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',
    },
    imageProfile: {
        width: 44,
        height: 44,
        borderRadius: 44 / 2,
        marginEnd: 16,
        backgroundColor: "#f02",
        overflow: 'hidden'
    },


});
export default DetailScreen;