/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Fragment } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    ToastAndroid,
    TouchableOpacity,
    Image,
    TouchableHighlight,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Toast from 'react-native-simple-toast';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const showToast = () => {
    Toast.show('This is a long toast.', Toast.LONG);
};

const ListItem = (props) => {
    return (

        <View style={styles.sectionContainer}>
            <TouchableHighlight
                style={[styles.circle, { borderColor: 'white', borderWidth: 1 }]}>
                <Image source={{ uri: "https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png" }} style={styles.circle} />
            </TouchableHighlight>
            <View style={styles.profileContainer}>
                <Text style={styles.sectionTitle}>{props.name}</Text>
                <Text style={styles.sectionDescription}>
                    Edit <Text style={styles.highlight}>App.js</Text> to change this
                    screen and then come back to see your edits.
                </Text>
            </View>

            <TouchableOpacity onPress={() => showToast()}><Text style={styles.detailIcon}>Edit</Text></TouchableOpacity>

        </View>
    )
}

const ListItemImage = (props) => {
    return (

        <View style={props.imageContainer}>
            <Image source={{ uri: "https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png" }} style={props.imageStyle} />
            <Text numberOfLines={3} style={styles.titleImage}>{props.title}</Text>
        </View>
    )
}



const HeaderList = (props) => {
    return (
        <View style={styles.headerList}>
            <Text style={styles.headerTitle}>{props.name}</Text>
            <Text style={styles.headerMore}>More</Text>
        </View>
    )
}

const Banner = ({ navigation }) => {
    return (
        <View style={styles.homeBanner}>
            <Text style={styles.bannerTitle}>iProperty.com.my</Text>
            <View style={styles.cardContainer}>
                <View style={styles.channelContainer}>
                    <Text style={styles.textChannelContainer}>BUY</Text>
                    <Text style={styles.textChannelContainer}>RENT</Text>
                </View>
                <View style={styles.lineStyleHorizontal} />
                <View style={styles.searchContainer}>
                    <Icon name="search" size={18} />
                    <TouchableOpacity onPress={() => navigation.navigate('ListScreen')}><Text style={{ marginStart: 8 }}>Search for properties</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

var initialElements = ['HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello', 'Hi', '00', 'Helo', 'Hi', '00', 'Hello', 'Hi', '00']


function HomeScreen({ navigation }) {

    return (
        <Fragment>
            <StatusBar barStyle='light-content'/>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#0181C7' }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f6f9' }}>

                <ScrollView style={{ paddingBottom: 16 }}>
                    <View backgroundColor={'#f5f6f9'}>
                        <Banner navigation={navigation} />
                        <View>
                            <HeaderList name="News" />
                            <ListItemImage imageContainer={styles.imageContainer} title="HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello" imageStyle={styles.image} />
                            <FlatList
                                data={initialElements}
                                horizontal={true}
                                contentContainerStyle={styles.listContainer}
                                showsHorizontalScrollIndicator={false}
                                renderItem={
                                    ({ item }) => <TouchableOpacity onPress={() => navigation.navigate('Details')}><ListItemImage imageContainer={styles.imageContainerList} title={item} imageStyle={styles.imageList} /></TouchableOpacity>
                                }
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>

                        <View>
                            <HeaderList name="Lifestyle" />
                            <ListItemImage imageContainer={styles.imageContainer} title="HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello" imageStyle={styles.image} />
                            <FlatList
                                data={initialElements}
                                horizontal={true}
                                contentContainerStyle={styles.listContainer}
                                showsHorizontalScrollIndicator={false}
                                renderItem={
                                    ({ item }) => <TouchableOpacity onPress={() => navigation.navigate('Details')}><ListItemImage imageContainer={styles.imageContainerList} title={item} imageStyle={styles.imageList} /></TouchableOpacity>
                                }
                                keyExtractor={(item, index) => index.toString()} />
                        </View>



                    </View>
                </ScrollView>
            </SafeAreaView>
        </Fragment>


    );


};

const styles = StyleSheet.create({
    homeBanner: {
        backgroundColor: '#0181C7',
        padding: 16,
    },
    bannerTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 16
    },
    channelContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 16
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 4,
        padding: 16
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 4,
        overflow: 'hidden'
    },
    lineStyleHorizontal: {
        borderWidth: 0.5,
        borderColor: '#b5bbc1'
    },
    textChannelContainer: {
        flex: 1,
        color: '#000',
        textAlign: 'center'
    },
    headerList: {
        flexDirection: 'row',
        padding: 16
    },
    headerTitle: {
        flex: 1,
        fontWeight: '700',
        fontSize: 16
    },
    headerMore: {
        color: '#0181C7',
        textTransform: 'uppercase'
    },
    imageContainer: {
        height: 200,
        backgroundColor: '#fff',
        marginStart: 16,
        marginEnd: 16,
        borderRadius: 4,
        borderColor: '#b5bbc1',
        borderWidth: 0.5
    },
    imageContainerList: {
        width: 250,
        height: 200,
        backgroundColor: '#fff',
        marginStart: 16,
        marginEnd: 16,
        borderRadius: 4,
        borderColor: '#b5bbc1',
        borderWidth: 0.5
    },
    imageList: {
        height: 120,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4

    },
    image: {
        height: 120,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4

    },
    titleImage: {
        fontSize: 16,
        fontWeight: '600',
        padding: 12,
    },



    scrollView: {
        backgroundColor: Colors.lighter,
    },
    sectionContainer: {
        flexDirection: 'row',
        marginTop: 16,
        marginStart: 16,
        marginEnd: 16,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    profileContainer: {
        flex: 1,
    },
    detailIcon: {
        marginStart: 10,
        marginEnd: 10
    },
    circle: {
        width: 44,
        height: 44,
        borderRadius: 44 / 2,
        marginEnd: 16,
        backgroundColor: "#f02",
        overflow: 'hidden'
    },

    listContainer: {
        marginTop: 16
    }
});

export default HomeScreen;
