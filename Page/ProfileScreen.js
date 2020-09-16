import React, { Fragment } from "react";
import { StyleSheet, SafeAreaView, TouchableOpacity,StatusBar, Text, Image, FlatList, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { showToast, FocusAwareStatusBar } from "../Utils/Utils";

const menuList = [{
    image:'https://img.icons8.com/bubbles/2x/calculator.png',
    title: 'Mortage Calculator',
    description:'Calculate monthly repayments for any property'
  },
  {
    image:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSJqWr9p8OyOwavSpAcqSQBAlPDxKJI87lAAg&usqp=CAU',
    title: 'Help & Feedback',
    description:'Suggest a feature, report an issue, or send feedback'
  },
  {
    image:'data:image/png;base64,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',
    title: 'Rate Us',
    description:'Rate & Review the app on the Google PLay Store'
  },
  {
    image:'https://toppng.com/uploads/preview/circle-icons-settings-round-icon-control-panel-11553442193skn9x2nb7k.png',
    title: 'Settings',
    description:'App and privacy settings'
  }];

export default function ProfileScreen() {
    return (
        <Fragment>
          <FocusAwareStatusBar backgroundColor='white' barStyle='dark-content' />
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
        <TouchableOpacity onPress={ ()=>showToast(item.title)}>
        <View style={styles.containerRow}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.containerAlignCenter}>
                <Text style={{fontSize:16,marginBottom:4}}>{item.title}</Text>
                <Text style={{color:'#b5bbc1'}}>{item.description}</Text>
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