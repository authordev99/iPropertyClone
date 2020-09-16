import React, { Fragment, Component, useContext, useState, useEffect } from 'react';
import { Text, FlatList, StatusBar, SafeAreaView, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { openUrl, FocusAwareStatusBar } from '../Utils/Utils';

export default function NewsLifestyleList({ navigation }) {

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => openUrl(item.link)}>
                <View style={styles.containerRow}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <View style={styles.containerAlignCenter}>
                        <Text numberOfLines={2} style={{ fontSize: 16,marginBottom:8 }}>{item.title}</Text>
                        <Text numberOfLines={3} style={{ color: '#b5bbc1' }}>{item.description}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <Fragment>
            <FocusAwareStatusBar backgroundColor='white' barStyle='dark-content' />
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.container}>
                    <View style={styles.toolbarContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="close" size={24} color='black' />
                        </TouchableOpacity>
                        <Text style={styles.toolbarTitle}>{toolbarTitle}</Text>
                    </View>
                    <FlatList
                        data={items}
                        renderItem={renderItem}
                        keyExtractor={item => item.id} />
                </View>
            </SafeAreaView>
        </Fragment>
    )

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
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
    containerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16
    },
    containerAlignCenter: {
        flex: 1,
        justifyContent: 'center',
        marginStart:16
    },
    image:{
        width:100,
        height:100,
        borderRadius:8
    }
})