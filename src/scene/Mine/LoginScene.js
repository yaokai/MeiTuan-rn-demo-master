import React, {PureComponent} from 'react'
import {View, TextInput, StyleSheet} from 'react-native'
import Button from "../../widget/Button"
import {login} from "../../api";
import {WebScene} from "../../widget/WebScene"
import DeviceStorage from "../../common/DeviceStorage"

class LoginScene extends PureComponent {



    constructor(props) {
        super(props);
        this.state = {name: '', password: ''};
    }

    requestRecommend = async () => {
        try {

            let response = await fetch(login(this.state.name, this.state.password));
            let json = await response.json();

            console.log(JSON.stringify(json));

            if (json.code == 1) {
                alert(json.message)
                this.props.navigation.goBack();
            } else {
                alert(json.message)
                this.props.navigation.goBack();

            }

            this.setState({
                // data: dataList,
                // refreshState: RefreshState.NoMoreData,
            })
        } catch (error) {
            this.setState({
                // refreshState: RefreshState.Failure,
            })
        }
    }

    render() {
        return (
            <View style={{padding: 10}}>
                <TextInput
                    style={{height: 40}}
                    placeholder="用户名"
                    onChangeText={(name) => this.setState({name})}
                />
                <TextInput
                    style={{height: 40}}
                    placeholder="用户名"
                    onChangeText={(password) => this.setState({password})}
                />

                <View style={{flexDirection:'row'}}>

                    <Button
                        title='登录'
                        titleStyle={{color: 'white', fontSize: 18}}
                        style={styles.buyButton}
                        onPress={() => {
                            alert('用户名为：' + this.state.name + ' 密码：' + this.state.password);
                            this.requestRecommend();

                        }}
                    />

                    <Button
                        title={this.props.name}
                        titleStyle={{color: 'white', fontSize: 18}}
                        style={styles.buyButton}
                        onPress={this.loginAfter}
                    />

                    <Button
                        title='读取数据'
                        titleStyle={{color: 'white', fontSize: 18}}
                        style={styles.buyButton}
                        onPress={() => {

                            console.log('暂时不能导航');


                            DeviceStorage.get('username').then((tags) => {
                                alert('读取到的数据为：' + tags);
                            });

                        }}
                    />

                </View>


            </View>
        );
    }


    loginAfter=()=>{
        if (DeviceStorage.save('username', 'kk不是老司机')) {
            // alert('保存成功');
            this.props.afterLogin();
        } else {
            alert('保存失败');
        }
    }


}

const styles = StyleSheet.create({
    buyButton: {
        backgroundColor: '#fc9e28',
        width: 94,
        height: 36,
        borderRadius: 7,
        margin: 10
    }
})


export default LoginScene