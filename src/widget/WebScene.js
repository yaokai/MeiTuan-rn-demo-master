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
                    source={{uri:this.props.navigation.state.params.info}}
                    onLoadEnd={(e) => this.onLoadEnd(e)}
                    scalesPageToFit
                    //防止错误提示
                    nativeConfig={
                        {
                            props: {
                                backgroundColor: '#ffffff',
                                flex: 1,
                            }
                        }
                    }
                    renderError={this._renderError}
                />
            </View>
        )
    }


    _renderError = ()=>{
        return <View style={{width: 0, height: 0}}/>
    };
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
