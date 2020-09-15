import React, { Component } from "react";
import {StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { SliderBox } from "react-native-image-slider-box";

export default class ListItemProperty extends Component {
    state = {
        propertyObject: '',
        imagePosition: 1
    };

    componentWillMount() {
        this.setState({
            propertyObject: this.props.property,
            isDetails: this.props.isDetailPage
        })
    }


    showingPrice(price) {
        var priceText = this.numberFormat(price.min)
        if (price.min == price.max) {
            priceText = this.numberFormat(price.min)
        } else if (price.min < price.max) {
            priceText = "From " + this.numberFormat(price.min) + " - " + this.numberFormat(price.max)
        }
        return priceText
    }

    getImageList(property) {
        var imageList = []
        const thumbnailUrl = property.medias.map((media) =>
            media.thumbnailUrl
        )
        imageList = thumbnailUrl;
        return imageList

    }

    numberFormat = (value) =>
        new Intl.NumberFormat('ms-MY', {
            style: 'currency',
            currency: 'MYR',
            minimumFractionDigits: 0,
        }).format(value);


    render() {
        let property = this.state.propertyObject
        let imageList = this.getImageList(property, this.state)
        return (
            <View style={styles.propertyContainer}>
                <View style={{ position: 'relative' }}>
                    <SliderBox
                        dotColor='transparent'
                        inactiveDotColor='transparent'
                        sliderBoxHeight={300}
                        images={imageList}
                        currentImageEmitter={index =>
                            this.setState({ imagePosition: index + 1 })
                        } />

                    {imageList.length > 1 ? (
                        <View style={{ position: 'absolute', bottom: 0, right: 0, borderRadius: 16, backgroundColor: 'rgba(52, 52, 52, 0.5)', margin: 16, paddingTop: 4, paddingBottom: 4, paddingStart: 8, paddingEnd: 8 }}>
                            <Text style={{ fontSize: 12, color: 'white' }}>{this.state.imagePosition}/{imageList.length}</Text>
                        </View>
                    ) : null}
                </View>

                <View style={styles.propertyInfoContainer}>
                    <Text style={styles.priceText}>{this.showingPrice(property.prices[0])}</Text>
                    <Text style={styles.propertyNameText}>{property.title}</Text>
                    {
                        property.address != null ? (
                            <Text >{property.address.formattedAddress}</Text>
                        ) : null
                    }

                    <Text style={styles.propertyTypeText}>{property.propertyType}</Text>
                    <Text>Built up size : {property.attributes.builtUp} sq. ft</Text>
                    <Text>Funishing : {property.attributes.furnishing}</Text>
                    <View style={styles.iconContainer}>
                        <IconValueProperty iconName="hotel" value={property.attributes.bedroom} />
                        <IconValueProperty iconName="shower" value={property.attributes.bathroom} />
                        <IconValueProperty iconName="car" value={property.attributes.carPark} />
                    </View>

                    {
                        this.state.isDetails ? (
                            <Text>Published on : {property.publishedAt}</Text>
                        ) : null
                    }
                </View>
            </View>
        );
    }
}

const IconProperty = (props) => {
    return (
        <View style={styles.iconCircleBackground}>
            <Icon name={props.name} size={14} color="#b5bbc1" />
        </View>
    )
}

const IconValueProperty = (props) => {
    return (
        <View flexDirection='row' justifyContent='center' alignItems='center'>
            <IconProperty name={props.iconName} />
            <Text style={{ marginStart: 8, marginEnd: 16 }}>{props.value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    propertyContainer: {
        backgroundColor: "#fff",
        marginTop: 16
    },
    propertyInfoContainer: {
        padding: 16
    },
    propertyImage: {
        height: 300
    },
    priceText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8
    },
    propertyNameText: {
        fontSize: 16,
        fontWeight: "bold"
    },
    propertyTypeText: {
        marginTop: 8
    },
    propertyText: {
        marginBottom: 8
    },
    iconContainer: {
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: 16
    },
    iconCircleBackground: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#f5f6f9'
    },

});