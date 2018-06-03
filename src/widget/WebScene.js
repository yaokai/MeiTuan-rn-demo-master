/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan  
 * @flow
 */


import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, WebView, InteractionManager} from 'react-native'

type Props = {
    navigation: any,
}

type State = {
    source: Object,
}


class WebScene extends PureComponent<Props, State> {

    static navigationOptions = ({navigation}: any) => ({
        headerStyle: {backgroundColor: 'white'},
        title: '网页',
    })

    constructor(props: Props) {
        super(props)
        this.state = {
            source: "http://www.baidu.com"
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigation.setParams({title: '加载中'})
            this.setState({source: {uri: this.props.navigation.state.params.url}})
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <WebView
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{uri:'http://192.168.2.101:8080/baidumap/index2.html'}}
                    onLoadEnd={(e) => this.onLoadEnd(e)}
                    scalesPageToFit
                />
            </View>
        )
    }

    onLoadEnd(e: any) {
        if (e.nativeEvent.title.length > 0) {
            this.props.navigation.setParams({title: e.nativeEvent.title})
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
    },
    webView: {
        flex: 1,
        backgroundColor: 'white',
    }
})


export default WebScene
