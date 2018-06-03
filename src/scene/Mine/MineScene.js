/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */


import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView, RefreshControl} from 'react-native'

import {Heading2, Heading3, Paragraph} from '../../widget/Text'
import {screen, system} from '../../common'
import {color, DetailCell, NavigationItem, SpacingView} from '../../widget'

import {turn2MapApp} from '../../common/tool'
import LoginScene from "./LoginScene";
import DeviceStorage from "../../common/DeviceStorage"


type Props = {}

type State = {
    isRefreshing: boolean,
    loginSatus: boolean,
    username: String,
}

class MineScene extends PureComponent<Props, State> {


    static navigationOptions = ({navigation}: any) => ({
        headerRight: (
            <View style={{flexDirection: 'row'}}>
                <NavigationItem
                    icon={require('../../img/mine/icon_navigation_item_set_white.png')}
                    onPress={() => {
                        navigation.navigate('Login')

                    }}
                />
                <NavigationItem
                    icon={require('../../img/mine/icon_navigation_item_message_white.png')}
                    onPress={() => {

                    }}
                />
            </View>
        ),
        headerStyle: {
            backgroundColor: color.primary,
            elevation: 0,
            borderBottomWidth: 0,
        },
    })

    state: {
        isRefreshing: boolean,
        loginSatus: boolean,
        username: String,

    }

    constructor(props: Object) {
        super(props)

        this.state = {
            isRefreshing: false,
            loginSatus: false,
            username: "未登录"
        }
    }

    onHeaderRefresh() {
        this.setState({isRefreshing: true})

        setTimeout(() => {
            this.setState({isRefreshing: false})
        }, 2000)
    }

    renderCells() {
        let cells = []
        let dataList = this.getDataList()
        for (let i = 0; i < dataList.length; i++) {
            let sublist = dataList[i]
            for (let j = 0; j < sublist.length; j++) {
                let data = sublist[j]
                let cell = <DetailCell image={data.image} title={data.title} subtitle={data.subtitle} key={data.title}/>
                cells.push(cell)
            }
            cells.push(<SpacingView key={i}/>)
        }

        return (
            <View style={{flex: 1}}>
                {cells}
            </View>
        )
    }

    _loginAfter = () => {
        this.setState({loginSatus: true})
    }

    renderHeader() {
        DeviceStorage.get('username').then((tags) => {

            this.setState({username: tags});
        });
        return (

            <View style={styles.header}>
                <Image style={styles.avatar} source={require('../../img/mine/avatar.png')}/>
                <View>
                    <View style={{flexDirection: 'row', alignItems: 'center',}}>
                        <Heading2 style={{color: 'white'}}>{this.state.username}</Heading2>
                        <Image style={{marginLeft: 4}} source={require('../../img/mine/beauty_technician_v15.png')}/>
                    </View>
                    <Paragraph
                        onPress={() => {

                            turn2MapApp(118.803804, 32.050571, 'baidu', '总统府1');

                            this.props.navigation.navigate('Web')
                            // this.props.navigation.navigate('Login')

                        }}
                        style={{color: 'white', marginTop: 4}}>个人信息 ></Paragraph>
                </View>
            </View>
        )
    }

    render() {

        if (!this.state.loginSatus) {

            return (
                <LoginScene afterLogin={this._loginAfter} name="kk"/>
            )

        } else {
            return (
                <View style={{flex: 1, backgroundColor: color.paper}}>
                    <View style={{
                        position: 'absolute',
                        width: screen.width,
                        height: screen.height / 2,
                        backgroundColor: color.primary
                    }}/>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={() => this.onHeaderRefresh()}
                                tintColor='gray'
                            />
                        }>
                        {this.renderHeader()}
                        <SpacingView/>
                        {this.renderCells()}
                    </ScrollView>
                </View>
            )
        }
    }

    getDataList() {
        return (
            [
                [
                    {title: '我的钱包', subtitle: '办信用卡', image: require('../../img/mine/icon_mine_wallet.png')},
                    {title: '余额', subtitle: '￥95872385', image: require('../../img/mine/icon_mine_balance.png')},
                    {title: '抵用券', subtitle: '63', image: require('../../img/mine/icon_mine_voucher.png')},
                    {title: '会员卡', subtitle: '2', image: require('../../img/mine/icon_mine_membercard.png')}
                ],
                [
                    {title: '好友去哪', image: require('../../img/mine/icon_mine_friends.png')},
                    {title: '我的评价', image: require('../../img/mine/icon_mine_comment.png')},
                    {title: '我的收藏', image: require('../../img/mine/icon_mine_collection.png')},
                    {title: '会员中心', subtitle: 'v15', image: require('../../img/mine/icon_mine_membercenter.png')},
                    {title: '积分商城', subtitle: '好礼已上线', image: require('../../img/mine/icon_mine_member.png')}
                ],
                [
                    {title: '客服中心', image: require('../../img/mine/icon_mine_customerService.png')},
                    {title: '关于美团', subtitle: '我要合作', image: require('../../img/mine/icon_mine_aboutmeituan.png')}
                ]
            ]
        )
    }


}


const styles = StyleSheet.create({
    icon: {
        width: 27,
        height: 27,
    },
    header: {
        backgroundColor: color.primary,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#51D3C6'
    }
})


export default MineScene
