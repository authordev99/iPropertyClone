import React, { Component } from "react";
import { Platform, StyleSheet, Text, Image, TouchableOpacity, View, FlatList, Button } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableHighlight } from "react-native-gesture-handler";

var initialElements = ['Hello', 'Hi', '00', 'Helo', 'Hi', '00', 'Hello', 'Hi', '00']

class PropertyListScreen extends React.Component {
    back = () => {
        this.props.navigation.goBack()
    }
    render() {
        
        return (
            <View style={styles.container}>
                <View style={styles.headerBarContainer}>
                    <HeaderBarSearch onClickBack={this.back}/>
                    <View style={styles.lineStyleHorizontal} />
                    <FilterAndSorting />
                </View>
                <FlatList
                    data={initialElements}
                    renderItem={
                        ({ item }) => <TouchableOpacity onPress={() => this.props.navigation.navigate('Details')}><ListItemProperty /></TouchableOpacity>
                    }
                    keyExtractor={(item, index) => index.toString()} />
            </View>
        );
    }
}

const HeaderBarSearch = (props) => {
    return (

        <View style={styles.headerSearchBarContainer}>
            <View style={{ marginStart: 16 }}>
                <TouchableOpacity onPress={props.onClickBack}>
                    <Icon name="arrow-left" size={18} styles={{ marginEnd: 16 }} />
                </TouchableOpacity>
            </View>
            <View style={styles.searchBarContainer}>
                <View style={{ marginEnd: 8 }}><Icon name="search" size={18} /></View>
                <Text>Arcoris Soho</Text>
            </View>

        </View>

    )
}

const FilterAndSorting = (props) => {
    return (

        <View style={styles.headerSearchBarContainer}>
            <View style={styles.filterSortingContainer}>
                <Icon name="filter" size={18} />
                <Text style={{ marginStart: 8 }}>FILTER</Text>
            </View>
            <View style={styles.lineStyleVertical} />
            <View style={styles.filterSortingContainer}>
                <Icon name="sort" size={18} />
                <Text style={{ marginStart: 8 }}>SORT</Text>
            </View>

        </View>

    )
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

const ListItemProperty = () => {
    return (
        <View style={styles.propertyContainer}>
            <Image source={{ uri: "https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png" }} style={styles.propertyImage} />
            <View style={styles.propertyInfoContainer}>
                <Text style={styles.priceText}>RM 1.500.000</Text>
                <Text style={styles.propertyNameText}>Arcoris Soho, Month Kiara</Text>
                <Text style={styles.propertyAddressText}>Jalan Kiara 4, Mont Kiara, 50840, Kuala Lumpur</Text>
                <Text>Serviced Residence</Text>
                <Text>Built up size : 708 sq. ft</Text>
                <Text>Funishing : Fully Furnished</Text>
                <View style={styles.iconContainer}>
                    <IconValueProperty iconName="hotel" value={1} />
                    <IconValueProperty iconName="shower" value={2} />
                    <IconValueProperty iconName="car" value={3} />
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f6f9"
    },
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
    propertyAddressText: {
        marginBottom: 8
    },
    propertyText: {
        marginBottom: 8
    },
    iconContainer: {
        flexDirection: 'row',
        marginTop: 16
    },
    iconCircleBackground: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#f5f6f9'
    },
    headerBarContainer: {
        paddingTop: 64,
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
    filterSortingContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        padding: 16
    },
    lineStyleHorizontal: {
        borderWidth: 0.5,
        borderColor: '#b5bbc1',
        marginTop:8,
    },
    lineStyleVertical: {
        height:20,
        borderWidth: 0.5,
        borderColor: '#b5bbc1',
    }

});
export default PropertyListScreen;