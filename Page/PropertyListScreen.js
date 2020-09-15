import React, { Component, Fragment, useRef, useState } from "react";
import { TextInput, SafeAreaView, StyleSheet, StatusBar, Text, TouchableOpacity, View, FlatList, Button, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import ListItemProperty from "../Component/ListItemProperty";
import RBSheet from "react-native-raw-bottom-sheet";

class PropertyListScreen extends Component {

    back = () => {
        this.props.navigation.goBack()
    }
    filter = () => {
        this.props.navigation.navigate('Filter')
    }
    state = {
        propertyList: [],
        loading: true
    }

    onSearchChange(text) {
        const filterResultList = this.state.filterList.filter(
            property => {
                return property.title.indexOf(text) > -1
            }
        )

        console.log(filterResultList)
        this.setState({
            propertyList: filterResultList,
        })
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
                    filterList: propertDataList,
                    loading: false
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    headerRender = () => {

        return (
            <View style={styles.headerBarContainer}>
                <View style={styles.headerSearchBarContainer}>
                    <View style={{ marginStart: 16 }}>
                        <TouchableOpacity onPress={this.back}>
                            <Icon name="arrow-left" size={18} styles={{ marginEnd: 16 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.searchBarContainer}>
                        <View style={{ marginEnd: 8 }}>
                            <Icon name="search" size={18} />
                        </View>
                        <TextInput
                            placeholder='property name'
                            styles={{ marginEnd: 8 }}
                            onChangeText={(text) =>

                                this.onSearchChange(text)
                            } />
                    </View>
                </View>
                <View style={styles.lineStyleHorizontal} />
                <FilterAndSorting onPress={this.filter} />
            </View>


        )
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', {
                item
            })}>
                <ListItemProperty property={item} />
            </TouchableOpacity>
        )
    }

    render() {

        return (
            <Fragment>
                <StatusBar barStyle='dark-content' />
                <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
                <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f6f9' }}>
                    <View style={styles.container}>

                        {this.state.loading ?
                            (
                                <View style={styles.activityIndicator}>
                                    <ActivityIndicator color='#0181C7' size='large' />
                                </View>)
                            :
                            <FlatList
                                data={this.state.propertyList}
                                renderItem={this.renderItem}
                                keyExtractor={item => item.id}
                                ListHeaderComponent={this.headerRender} />}



                    </View>
                </SafeAreaView>
            </Fragment>
        );
    }
}



const FilterAndSorting = (props) => {
    const refRBSheet = useRef();
    const sortOption = ['Default', 'Recent', 'Lowest Price', 'Highest Price', 'Built-up Size (large to small)', 'Built-up Size (small to large)']
    const [state, setState] = useState({
        sortSelectedOption: 'Default'
    })
    function selectSortOption(selected) {
        setState(state => ({ ...state, sortSelectedOption: selected }))
    }

    const shortItemRender = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                refRBSheet.current.close()
                selectSortOption(item)
                }
            }>
                <Text style={state.sortSelectedOption != item ? { fontSize: 16, padding: 16 } : { fontSize: 16, padding: 16, color: '#0181C7' }}>{item}</Text>
            </TouchableOpacity>
        )
    }
    const shortHeaderRender = () => {
        return (
            <Text style={{ padding: 16, color: '#b5bbc1' }}>Sort By</Text>
        )
    }

    return (
        <View style={styles.headerSearchBarContainer}>
            <TouchableOpacity style={styles.filterSortingContainer} onPress={props.onPress}>
                <Icon name="filter" size={18} />
                <Text style={{ marginStart: 8 }}>FILTER</Text>
            </TouchableOpacity>
            <View style={styles.lineStyleVertical} />
            <TouchableOpacity style={styles.filterSortingContainer} onPress={() => refRBSheet.current.open()} >
                <Icon name="sort" size={18} />
                <Text style={{ marginStart: 8 }}>SORT</Text>
            </TouchableOpacity>

            <RBSheet
                ref={refRBSheet}
                height={414}
                openDuration={250}
                customStyles={{
                    container: {
                        justifyContent: "center",

                    }
                }}>
                <FlatList
                    data={sortOption}
                    renderItem={shortItemRender}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={shortHeaderRender} />
            </RBSheet>
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