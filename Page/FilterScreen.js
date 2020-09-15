import React, { Fragment, Component, useContext, useState, useEffect } from 'react';
import { Text, Button, StatusBar, SafeAreaView, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SegmentedControls } from 'react-native-radio-buttons'
import GlobalState from '../Utils/GlobalState';
import { ScrollView } from 'react-native-gesture-handler';

export default function FilterScreen({ navigation }) {

    const initialChannel = {
        isBuyChannel: true
    }


    const initialBuyChannelState = {
        showProperty: 'All',
        type: 'All Residential',
        priceMin: 'Min',
        priceMax: 'Max',
        sizeMin: 'Min',
        sizeMax: 'Max',
        furnishing: 'Any',
        tenureType: 'Any',
        bedrooms: 'Any',
        bathrooms: 'Any',
        carparks: 'Any'
    };


    const initialRentChannelState = {
        type: 'All Residential',
        rentMin: 'Min',
        rentMax: 'Max',
        sizeMin: 'Min',
        sizeMax: 'Max',
        furnishing: 'Any',
        tenureType: 'Any',
        bedrooms: 'Any',
        bathrooms: 'Any',
        carparks: 'Any'
    };


    const [buyRentState, setBuyRentState] = useState(initialChannel);
    const [buyState, setBuyState] = useState(initialBuyChannelState);
    const [rentState, setRentState] = useState(initialRentChannelState);

    const resetBuyState = (state) => {
        setBuyState({ ...state });
    };
    const resetRentState = (state) => {
        setRentState({ ...state });
    };


    function updateChannel(selected) {
        setBuyRentState(buyRentState => ({ ...buyRentState, isBuyChannel: selected }))
    }

    return (
        <GlobalState.Provider value={{
            controlState: [buyRentState, setBuyRentState],
            buy: [buyState, setBuyState],
            rent: [rentState, setRentState]
        }}>
            <Fragment>
                <StatusBar barStyle='dark-content' />
                <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
                <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={styles.container}>
                        <View style={styles.toolbarContainer}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Icon name="close" size={24} color='black' />
                            </TouchableOpacity>
                            <Text style={styles.toolbarTitle}>Filter</Text>
                            <TouchableOpacity onPress={() => buyRentState.isBuyChannel ? resetBuyState(initialBuyChannelState) : resetRentState(initialRentChannelState)}>
                                <Text>Reset</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.channelContainer}>
                            <TouchableOpacity style={buyRentState.isBuyChannel ? styles.textChannelActiveContainer : styles.textChannelInactiveContainer} onPress={() => updateChannel(true)}>
                                <Text style={buyRentState.isBuyChannel ? styles.textChannelActive : styles.textChannelInactive}>BUY</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={buyRentState.isBuyChannel ? styles.textChannelInactiveContainer : styles.textChannelActiveContainer} onPress={() => updateChannel(false)}>
                                <Text style={buyRentState.isBuyChannel ? styles.textChannelInactive : styles.textChannelActive}>RENT</Text>
                            </TouchableOpacity>
                        </View>
                        <BuyChannelFilter isBuyChannel={buyRentState.isBuyChannel} />
                    </View>


                    <View style={styles.searchButton}>
                        <Button title='SEARCH' color='white' />
                    </View>

                </SafeAreaView>
            </Fragment>
        </GlobalState.Provider>
    )

}

function BuyChannelFilter({ isBuyChannel }) {
    const { buy, rent } = useContext(GlobalState);
    const [buyState, setBuyState] = buy;
    const [rentState, setRentState] = rent;

    function setShowProperty(selected) {
        setBuyState(buyState => ({ ...buyState, showProperty: selected }))
    }
    const showPropertyOption = [
        "All",
        "Subsale",
        "New Launch"
    ];

    function setBedrooms(selected) {
        if (isBuyChannel) {
            setBuyState(buyState => ({ ...buyState, bedrooms: selected }))
        } else {
            setRentState(rentState => ({ ...rentState, bedrooms: selected }))
        }
    }
    const bedroomsBathroomsCarparksOption = [
        "Any",
        "1+",
        "2+",
        "3+",
        "4+",
        "5+",
    ];


    function setBathrooms(selected) {
        if (isBuyChannel) {
            setBuyState(buyState => ({ ...buyState, bathrooms: selected }))
        } else {
            setRentState(rentState => ({ ...rentState, bathrooms: selected }))
        }

    }


    function setCarparks(selected) {

        if (isBuyChannel) {
            setBuyState(buyState => ({ ...buyState, carparks: selected }))
        } else {
            setRentState(rentState => ({ ...rentState, carparks: selected }))
        }
    }






    return (
        <GlobalState.Provider value={[buyState, setBuyState], [rentState, setRentState]}>
            <ScrollView>
                <View style={styles.filterOptionContainer}>
                    {isBuyChannel ?
                        <CustomSegmented
                            defaultValue={isBuyChannel ? buyState.showProperty : rentState.showProperty}
                            options={showPropertyOption}
                            title='Show Property'
                            selectFunction={setShowProperty} /> : null
                    }

                    <SelectOption
                        title='Type'
                        defaultValue={isBuyChannel ? buyState.type : rentState.type}
                    />

                    <View style={{ flexDirection: 'row'}}>
                        <SelectOption
                            title={isBuyChannel ?'Price (RM)' : 'Rent (RM)'}
                            defaultValue={isBuyChannel ? buyState.priceMin : rentState.rentMin}
                        />
                        <SelectOption
                            defaultValue={isBuyChannel ? buyState.priceMax : rentState.rentMax}
                        />
                    </View>
                    <View style={{ flexDirection: 'row'}}>
                        <SelectOption
                            title='Built-up Size(sq.ft)'
                            defaultValue={isBuyChannel ? buyState.sizeMin : rentState.sizeMin}
                        />
                        <SelectOption
                            defaultValue={isBuyChannel ? buyState.sizeMax : rentState.sizeMax}
                        />
                    </View>

                    <SelectOption
                        title='Furnishing'
                        defaultValue={isBuyChannel ? buyState.furnishing : rentState.furnishing}
                    />

                    <SelectOption
                        title='Tenure Type'
                        defaultValue={isBuyChannel ? buyState.tenureType : rentState.tenureType}
                    />

                    <CustomSegmented
                        defaultValue={isBuyChannel ? buyState.bedrooms : rentState.bedrooms}
                        options={bedroomsBathroomsCarparksOption}
                        title='Bedrooms'
                        selectFunction={setBedrooms} />

                    <CustomSegmented
                        defaultValue={isBuyChannel ? buyState.bathrooms : rentState.bathrooms}
                        options={bedroomsBathroomsCarparksOption}
                        title='Bathrooms'
                        selectFunction={setBathrooms} />
                    <CustomSegmented
                        defaultValue={isBuyChannel ? buyState.carparks : rentState.carparks}
                        options={bedroomsBathroomsCarparksOption}
                        title='Carparks'
                        selectFunction={setCarparks} />

                </View>
            </ScrollView>
        </GlobalState.Provider>
    )


}

function CustomSegmented({ options, title, selectFunction, defaultValue }) {

    return (
        <View style={{ marginBottom: 16 }}>
            <Text style={styles.textTitleOption}>{title}</Text>
            <SegmentedControls
                selectedTint={'white'}
                tint='#b5bbc1'
                containerBorderTint='#b5bbc1'
                selectedBackgroundColor='#0181C7'
                paddingTop={10}
                paddingBottom={10}
                separatorTint='#b5bbc1'
                options={options}
                onSelection={selected => selectFunction(selected)}
                selectedOption={defaultValue}
            />
        </View>
    )
}

function SelectOption({ title, defaultValue, selectFunction }) {
    return (
        <View style={{ marginBottom: 16, flex: 1, marginEnd: 16 }}>
            <Text style={styles.textTitleOption}>{title != null ? title : ' '}</Text>
            <View style={styles.selectOptionContainer}>
                <TouchableOpacity style={styles.textSelectOptionContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.textSelectOption}>{defaultValue}</Text>
                        <Icon name="chevron-down" size={16} color='#b5bbc1' />
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )
}

class RentChannelFilter extends Component {
    state = {
        showProperty: 'All'
    }
    showPropertyOption = [
        "All",
        "Subsale",
        "New Launch"
    ];

    setSelectedOption(showProperty) {
        this.setState({
            showProperty
        });
    }

    render() {
        return (
            <View style={styles.filterOptionContainer}>
                <View>
                    <SegmentedControls
                        selectedTint={'white'}
                        tint='#b5bbc1'
                        containerBorderTint='#b5bbc1'
                        selectedBackgroundColor='#0181C7'
                        paddingTop={10}
                        paddingBottom={10}
                        separatorTint='#b5bbc1'
                        options={this.showPropertyOption}
                        onSelection={this.setSelectedOption.bind(this)}
                        selectedOption={this.state.showProperty}
                    />
                </View>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    filterOptionContainer: {
        flex: 1,
        backgroundColor: "white",
        padding: 16
    },
    toolbarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    toolbarTitle: {
        flex: 1,
        marginStart: 32,
        fontSize: 16,
    },
    textChannelActiveContainer: {
        flex: 1,
        borderBottomWidth: 2,
        borderBottomColor: '#0181C7',
        padding: 16
    },
    textChannelInactiveContainer: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#b5bbc1',
        padding: 16
    },
    textChannelActive: {

        color: '#0181C7',
        textAlign: 'center',

    },
    textChannelInactive: {

        color: '#b5bbc1',
        textAlign: 'center',

    },
    textSelectOptionContainer: {
        flex: 1,
        borderBottomWidth: 1,
        paddingBottom: 8,
        borderBottomColor: '#b5bbc1',

    },
    textSelectOption: {
        flex: 1,
        color: '#b5bbc1',

    },
    channelContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',

    },
    selectOptionContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',

    },
    textTitleOption: {
        marginBottom: 8,
        fontSize: 16
    },
    searchButton: {
        borderRadius: 4,
        padding: 4,
        backgroundColor: '#0181C7',
        marginStart: 14,
        marginEnd: 16,
        bottom: 0
    }
})