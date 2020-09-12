import React, { Component, Fragment } from "react";
import { Platform, StatusBar, SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, View, FlatList, Button } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import ListItemProperty from "./ListItemProperty";
import { ScrollView } from "react-native-gesture-handler";
class DetailScreen extends React.Component {

    back = () => {
        this.props.navigation.goBack()
    }
    state = {
        item: this.props.navigation.state.params.item,
    }

    render() {


        return (
            <Fragment>
                <StatusBar barStyle='dark-content' />
                <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} >
                    <View style={styles.container}>

                        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                            <View>
                                <View style={styles.headerBarContainer}>
                                    <HeaderWithIcon onClickBack={this.back} />
                                </View>
                                <ListItemProperty property={this.state.item} isDetailPage={true} />
                                <MortageCalculator />
                                <AddressAndDescription title={this.state.item.title} />
                                <PropertyDetails attributes={this.state.item.attributes} />
                                <PropertyListers listers={this.state.item.listers != null ? this.state.item.listers[0] : null} organisations={this.state.item.organisations[0]} />
                            </View>
                        </ScrollView>

                        <View style={styles.contactContainer}>
                            <Text style={styles.contactButton}>Contact</Text>
                            <View style={styles.whatsappButton}>
                                <Icon name="whatsapp" size={18} color="#075e54" />
                                <Text style={{ marginStart: 4 }}>Whatsapp</Text>
                            </View>

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
            <Text style={styles.headerTitle}>Arcoris Soho</Text>
            <View style={{ marginStart: 12, marginEnd: 16 }}><Icon name="share" size={18} /></View>
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

const PropertyListers = (props) => {
    var propertyListers = props.listers;
    var propertyOrganisations = props.organisations;
    return (
        <View style={[styles.cardColumnContainer, { flexDirection: 'row', alignItems: 'center' }]}>
            {
                (propertyListers != null && propertyListers.image != null) || propertyOrganisations.logo ? (<Image source={{ uri: propertyListers != null && propertyListers.image != null ? propertyListers.image.thumbnailUrl : (propertyOrganisations.logo != null ? propertyOrganisations.logo.thumbnailUrl : '') }} style={styles.imageProfile} />) : null
            }

            <View style={{ flex: 1 }}>
                <Text>{propertyListers != null ? propertyListers.name : propertyOrganisations.name}</Text>
                {propertyListers != null ? (<Text style={{ fontSize: 12 }}>{propertyOrganisations.name}</Text>) : null}
            </View>
            <View style={{ marginStart: 8, marginEnd: 8 }}><Icon name="comment" size={24} color="#075e54" /></View>
            <View style={{ marginStart: 8, marginEnd: 8 }}><Icon name="phone" size={24} color="#075e54" /></View>




        </View>
    )
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
        textAlign: 'center',
        marginEnd: 8,
        flex: 1,
        color: 'white',
        backgroundColor: '#0181C7',
        overflow: 'hidden'
    },
    whatsappButton: {
        flexDirection: 'row',
        padding: 8,
        borderRadius: 8,
        textAlign: 'center',
        justifyContent: 'center',
        marginEnd: 8,
        flex: 1,
        borderWidth: 1,
        borderColor: '#b5bbc1',

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