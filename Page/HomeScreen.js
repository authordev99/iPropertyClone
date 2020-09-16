/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Fragment, Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { openUrl } from '../Utils/Utils';

class HomeScreen extends Component {

    state = {
        newsList: [],
        newsHeadline: '',
        newsHomeList:[],
        lifestyleList: [],
        lifestyleHeadline: '',
        lifestyleHomeList:[],
        loadingNews: true,
        loadingLifestyle: true
    }

    getNewsList() {
        fetch("http://demo6036197.mockable.io/news/list")
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status);
                }
                return res.json();
            })
            .then(response => {
                const newsDataList = JSON.parse(JSON.stringify(response.items))
                const newsHomeList = newsDataList.slice(0)
                newsHomeList.splice(0, 1)
                const firstData = newsDataList[0]
                {/* delete first data*/ }
              
               
                this.setState({
                    newsHeadline: firstData,
                    newsList: newsDataList,
                    newsHomeList : newsHomeList,
                    loadingNews: false
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    getLifestyleList() {
        fetch("http://demo4741066.mockable.io/lifestyle/list")
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status);
                }
                return res.json();
            })
            .then(response => {
                const lifestyleDataList = JSON.parse(JSON.stringify(response.items))
                const lifestyleHomeList = lifestyleDataList.slice(0)
                lifestyleHomeList.splice(0, 1)
                const firstData = lifestyleDataList[0]
                {/* delete first data*/ }
               

                this.setState({
                    lifestyleHeadline: firstData,
                    lifestyleList: lifestyleDataList,
                    lifestyleHomeList:lifestyleHomeList,
                    loadingLifestyle: false
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    more = (title, list) => {
        this.props.navigation.navigate('NewsLifestyleList', toolbarTitle = title, items = list)
    }

    async componentDidMount() {
        this.getNewsList()
        this.getLifestyleList()
    }

    render() {
        return (
            <Fragment>
                <StatusBar backgroundColor='#0181C7' barStyle='light-content' />
                <SafeAreaView style={{ flex: 0, backgroundColor: '#0181C7' }} />
                <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f6f9' }}>

                    <ScrollView style={{ paddingBottom: 16 }}>
                        <View backgroundColor={'#f5f6f9'}>
                            <Banner navigation={this.props.navigation} />

                            {this.state.loadingNews ?
                                (
                                    <View style={{ marginTop: 16 }}>
                                        <ActivityIndicator color='#0181C7' size='large' />
                                    </View>)
                                :
                                <View>
                                    <HeaderList
                                        name="News"
                                        onMoreClicked={() => this.more('News',this.state.newsList)} />
                                    <ListItemImage
                                        imageContainer={styles.imageContainer}
                                        itemChannel={this.state.newsHeadline}
                                        imageStyle={styles.image} />
                                    <FlatList
                                        data={this.state.newsHomeList}
                                        horizontal={true}
                                        contentContainerStyle={styles.listContainer}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={
                                            ({ item }) => <TouchableOpacity><ListItemImage imageContainer={styles.imageContainerList} itemChannel={item} imageStyle={styles.imageList} /></TouchableOpacity>
                                        }
                                        keyExtractor={(item) => item.title}
                                    />
                                </View>}

                            {this.state.loadingLifestyle ?
                                (
                                    <View style={{ marginTop: 16 }}>
                                        <ActivityIndicator color='#0181C7' size='large' />
                                    </View>)
                                :
                                <View>
                                    <HeaderList name="Lifestyle" onMoreClicked={() => this.more('Lifestyle',this.state.lifestyleList)} />
                                    <ListItemImage
                                        imageContainer={styles.imageContainer}
                                        itemChannel={this.state.lifestyleHeadline}
                                        imageStyle={styles.image} />
                                    <FlatList
                                        data={this.state.lifestyleHomeList}
                                        horizontal={true}
                                        contentContainerStyle={styles.listContainer}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={
                                            ({ item }) => <TouchableOpacity><ListItemImage imageContainer={styles.imageContainerList} itemChannel={item} imageStyle={styles.imageList} /></TouchableOpacity>
                                        }
                                        keyExtractor={(item) => item.title}
                                    />
                                </View>}




                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Fragment>


        );
    }

};


const ListItemImage = ({ itemChannel, imageStyle, imageContainer }) => {
    return (
        <TouchableOpacity onPress={() => openUrl(itemChannel.link)}>
            <View style={imageContainer}>
                <Image source={{ uri: itemChannel.image }} style={imageStyle} />
                <Text numberOfLines={3} style={styles.titleImage}>{itemChannel.title}</Text>
            </View>
        </TouchableOpacity>
    )
}



const HeaderList = (props) => {
    return (
        <View style={styles.headerList}>
            <Text style={styles.headerTitle}>{props.name}</Text>
            <TouchableOpacity onPress={props.onMoreClicked}>
                <Text style={styles.headerMore}>More</Text>
            </TouchableOpacity>
        </View>
    )
}

class Banner extends Component {
    state = {
        channelBuySelected: true
    }

    updateChannel(boolean) {
        this.setState({
            channelBuySelected: boolean
        })
    }

    render() {
        return (
            <View style={styles.homeBanner}>
                <Text style={styles.bannerTitle}>iProperty.com.my</Text>
                <View style={styles.cardContainer}>
                    <View style={styles.channelContainer}>
                        <TouchableOpacity style={this.state.channelBuySelected ? styles.textChannelActiveContainer : styles.textChannelInactiveContainer} onPress={() => this.updateChannel(true)}>
                            <Text style={this.state.channelBuySelected ? styles.textChannelActive : styles.textChannelInactive}>BUY</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={this.state.channelBuySelected ? styles.textChannelInactiveContainer : styles.textChannelActiveContainer} onPress={() => this.updateChannel(false)}>
                            <Text style={this.state.channelBuySelected ? styles.textChannelInactive : styles.textChannelActive}>RENT</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.searchContainer}>
                        <Icon name="search" size={18} />
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Filter',{isBuyFilter : this.state.channelBuySelected})}><Text style={{ marginStart: 8 }}>Search for properties</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

}

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
