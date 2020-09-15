import React, { Fragment } from "react";
import { StyleSheet, SafeAreaView, TouchableOpacity,StatusBar, Text, Image, FlatList, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import { showToast } from "../Utils/Utils";

const menuList = ['Mortage Calculator', 'Help & Feedback','Rate Us','Setting']

export default function ProfileScreen() {
    return (
        <Fragment>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.container}>
                    <FlatList
                        data={menuList}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={renderHeader} />
                </View>
            </SafeAreaView>
        </Fragment>

    )
}

const renderItem = ({ item }) => {
    return (
        <TouchableOpacity onPress={ ()=>showToast(item)}>
        <View style={styles.containerRow}>
            <Image source={{ uri: 'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg' }} style={styles.image} />
            <View style={styles.containerAlignCenter}>
                <Text style={{fontSize:16}}>{item}</Text>
                <Text style={{color:'#b5bbc1'}}>Calculate monthly repayments for any property</Text>
            </View>
            <Icon name="chevron-right" size={18} color='#b5bbc1' />
        </View>
        </TouchableOpacity>
    )
}

const renderHeader = () => {
    return (
        <View style={styles.containerCenter}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.subtitle}>Log in or Sign Up</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containerCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerAlignCenter: {
        flex: 1,
        justifyContent: 'center',
        marginStart:16
    },
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    subtitle: {
        color: '#0181C7'
    },
    containerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        padding:16
    },
    image:{
        width:60,
        height:60,
        borderRadius:60/2
    }
   
})