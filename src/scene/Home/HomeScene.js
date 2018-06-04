/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */


import React, {PureComponent} from 'react'
import {
    View,
    TouchableWithoutFeedback,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ListView,
    Image,
    StatusBar,
    FlatList,
    Dimensions
} from 'react-native'

import {Heading2, Heading3, Paragraph} from '../../widget/Text'
import {color, Button, NavigationItem, SpacingView} from '../../widget'

import {screen, system} from '../../common'
import api from '../../api'


import HomeMenuView from './HomeMenuView'
import HomeGridView from './HomeGridView'
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell'
import Swiper from 'react-native-swiper'

const {width} = Dimensions.get('window');


type Props = {
    navigation: any,
}

type State = {
    discounts: Array<Object>,
    dataList: Array<Object>,
    refreshing: boolean,
}


class HomeScene extends PureComponent<Props, State> {

    static navigationOptions = ({navigation}: any) => ({
        headerTitle: (
            <View style={styles.searchBar}>
                <Image resizeMode='stretch' source={require('../../img/home/car.png')} style={styles.searchIcon}/>
                <Paragraph>养车第一站</Paragraph>
            </View>
        ),
        headerRight: (
            <NavigationItem
                icon={require('../../img/mine/icon_navigation_item_message_white.png')}
                onPress={() => {
                    this.props.navigation.navigate('Web', {info: 'http://www.laosiji.com/thread/308460.html'})

                }}
            />
        ),
        headerLeft: (
            <NavigationItem
                title='江宁区'
                titleStyle={{color: 'white'}}
                onPress={() => {
                    navigation.navigate('Select', {info: '江宁区'})

                }}
            />
        ),
        headerStyle: {backgroundColor: color.primary},
    })

    constructor(props: Props) {
        super(props)

        this.state = {
            discounts: [],
            dataList: [],
            refreshing: false,
        }
    }

    componentDidMount() {
        this.requestData()
    }

    requestData = () => {
        this.setState({refreshing: true})

        this.requestDiscount()
        this.requestRecommend()
    }

    requestRecommend = async () => {
        try {
            let response = await fetch(api.recommend)
            let json = await response.json()

            let dataList = json.data.map(
                (info) => {
                    return {
                        id: info.id,
                        imageUrl: info.squareimgurl,
                        title: info.mname,
                        subtitle: `[${info.range}]${info.title}`,
                        price: info.price
                    }
                }
            )

            this.setState({
                dataList: dataList,
                refreshing: false,
            })
        } catch (error) {
            this.setState({refreshing: false})
        }
    }

    requestDiscount = async () => {
        try {
            let response = await fetch(api.discount)
            let json = await response.json()
            this.setState({discounts: json.data})
        } catch (error) {
            alert(error)
        }
    }

    renderCell = (info: Object) => {
        return (
            <GroupPurchaseCell
                info={info.item}
                onPress={this.onCellSelected}
            />
        )
    }

    onCellSelected = (info: Object) => {
        StatusBar.setBarStyle('default', false)
        this.props.navigation.navigate('GroupPurchase', {info: info})
    }

    keyExtractor = (item: Object, index: number) => {
        return item.id
    }

    renderHeader = () => {
        return (
            <View>
                <Swiper style={styles.wrapper} showsButtons={false} autoplay={true}>

                    <TouchableWithoutFeedback onPress={() => {

                        this.props.navigation.navigate('Web', {info: 'http://www.laosiji.com/thread/308460.html'})

                    }}>
                        <View style={styles.slide1}>
                            <Image resizeMode='stretch' style={styles.image}
                                   source={require('../../img/home/ad1.jpeg')}/>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        this.props.navigation.navigate('Web', {info: 'http://www.laosiji.com/thread/309280.html'})


                    }}>
                        <View style={styles.slide2}>

                            <Image resizeMode='stretch' style={styles.image}
                                   source={require('../../img/home/ad2.jpeg')}/>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        this.props.navigation.navigate('Web', {info: 'http://www.laosiji.com/thread/309271.html'})

                    }}>
                        <View style={styles.slide3}>

                            <Image resizeMode='stretch' style={styles.image}
                                   source={require('../../img/home/ad3.jpeg')}/>
                        </View>
                    </TouchableWithoutFeedback>
                </Swiper>
                <HomeMenuView menuInfos={api.menuInfo} onMenuSelected={this.onMenuSelected}/>
                <SpacingView/>
                <HomeGridView infos={this.state.discounts} onGridSelected={(this.onGridSelected)}/>
                <View style={styles.recommendHeader}>
                    <Heading3>附近门店</Heading3>
                </View>
            </View>
        )
    }

    onGridSelected = (index: number) => {
        let discount = this.state.discounts[index]

        if (discount.type == 1) {
            StatusBar.setBarStyle('default', false)
            let location = discount.tplurl.indexOf('http')
            let url = discount.tplurl.slice(location)
            this.props.navigation.navigate('Web', {url: url})
        }
    }

    onMenuSelected = (index: number) => {
        alert(index)
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataList}
                    renderItem={this.renderCell}

                    keyExtractor={this.keyExtractor}
                    onRefresh={this.requestData}
                    refreshing={this.state.refreshing}

                    ListHeaderComponent={this.renderHeader}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({


    image: {
        height: 200,
        width: width
    },

    wrapper: {
        height: 200,
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },


    container: {
        flex: 1,
        backgroundColor: color.paper
    },
    recommendHeader: {
        height: 35,
        justifyContent: 'center',
        borderWidth: screen.onePixel,
        borderColor: color.border,
        paddingVertical: 8,
        paddingLeft: 20,
        backgroundColor: 'white'
    },
    searchBar: {
        width: screen.width * 0.7,
        height: 30,
        // borderRadius: 19,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'white',
        alignSelf: 'center',
    },
    searchIcon: {
        width: 20,
        height: 20,
        margin: 5,
    }
})


export default HomeScene
