import React, {PureComponent} from 'react'
import {View, TextInput, StyleSheet, Text} from 'react-native'
import {login} from "../../api";
import {WebScene} from "../../widget/WebScene"
import DeviceStorage from "../../common/DeviceStorage"
import {color, Button, NavigationItem, SpacingView, Separator} from '../../widget'


class SelectScene extends PureComponent {

    static navigationOptions = ({navigation}: any) => ({
        title: '选择区域',
        headerRight: (
            <NavigationItem
                title='确定'
                onPress={() => {
                    navigation.goBack();
                }}
            />
        ),
    })

    constructor(props) {
        super(props);
        this.state = {name: '', password: ''};
    }


    render() {
        return (
            <View>
                <View style={{padding: 10, flexDirection: 'row',backgroundColor:'white'}}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                        <Text>当前定位：</Text>
                        <Text>江宁区</Text>
                    </View>
                    <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
                        <Text style={{fontSize: 20, textAlign: 'center'}}>重新定位</Text>
                    </View>

                </View>

                <Separator/>
                <View style={{padding: 10, flexDirection: 'row'}}>
                    <Text>热门区域：</Text>
                </View>

                <View style={{padding: 10, flexDirection: 'row',flexWrap:'wrap'}}>
                    <Button title="建邺区" style={styles.buyButton}/>
                    <Button title="雨花区" style={styles.buyButton}/>
                    <Button title="江宁区" style={styles.buyButton}/>
                    <Button title="玄武区" style={styles.buyButton}/>
                    <Button title="栖霞区" style={styles.buyButton}/>
                    <Button title="白下区" style={styles.buyButton}/>
                    <Button title="秦淮区" style={styles.buyButton}/>
                    <Button title="浦口区" style={styles.buyButton}/>
                    <Button title="六合区" style={styles.buyButton}/>
                    <Button title="高淳区" style={styles.buyButton}/>
                    <Button title="溧水区" style={styles.buyButton}/>

                </View>


            </View>

        );
    }


}

const styles = StyleSheet.create({
    buyButton: {
        backgroundColor: 'white',
        width: 80,
        height: 36,
        borderRadius: 2,
        margin: 3
    }
})


export default SelectScene