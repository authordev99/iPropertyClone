import React, { Component, Fragment } from "react";
import { Platform, SafeAreaView, StyleSheet, StatusBar, Text, Image, TouchableOpacity, View, FlatList, Button, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableHighlight } from "react-native-gesture-handler";
import ListItemProperty from "./ListItemProperty";

var initialElements = ['Hello', 'Hi', '00', 'Helo', 'Hi', '00', 'Hello', 'Hi', '00']

class PropertyListScreen extends React.Component {
    back = () => {
        this.props.navigation.goBack()
    }
    state = {
        propertyList: [],
        loading: true
    }

    async componentDidMount() {
        fetch("http://demo5943175.mockable.io/property/list")
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status);
                }
                return res.json();
            })
            .then(response => {
                const propertDataList = JSON.parse(JSON.stringify(response.items))
                this.setState({
                    propertyList: propertDataList,
                    loading: false
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <Fragment>
                <StatusBar barStyle='dark-content' />
                <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
                <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f6f9' }}>
                    <View style={styles.container}>
                        <View style={styles.headerBarContainer}>
                            <HeaderBarSearch onClickBack={this.back} />
                            <View style={styles.lineStyleHorizontal} />
                            <FilterAndSorting />
                        </View>
                        {this.state.loading ?
                            (
                                <View style={styles.activityIndicator}><ActivityIndicator /></View>)
                            :
                            <FlatList
                                data={this.state.propertyList}
                                renderItem ={
                                    ({ item }) =>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', {
                                            item
                                        })}>
                                            <ListItemProperty property={item} />
                                        </TouchableOpacity>
                                }
                                keyExtractor={(item, index) => index.toString()} />}

                    </View>
                </SafeAreaView>
            </Fragment>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f6f9"
    },
    headerBarContainer: {
        paddingTop: 16,
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
        marginTop: 8,
    },
    lineStyleVertical: {
        height: 20,
        borderWidth: 0.5,
        borderColor: '#b5bbc1',
    },
    activityIndicator: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }

});
export default PropertyListScreen;