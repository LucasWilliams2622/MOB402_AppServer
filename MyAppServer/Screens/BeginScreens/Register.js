import { View, Text, TextInput, SafeAreaView, Image, CheckBox, Dimensions, Button, Pressable, Touchable, TouchableOpacity, ToastAndroid, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, } from 'react-native'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { IP_CONFIG_LAPTOP } from '../../Component/index/index'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from '../Ultil/AxiosInstance';


GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});
import BouncyCheckbox from "react-native-bouncy-checkbox";
const windowHeight = Dimensions.get('window').height;
const windowWIdth = Dimensions.get('window').width;
const Login = (props) => {
    const { navigation } = props;
    const GoRegister = () => {
        navigation.navigate('Login');

    }
    const Register = async () => {
        if (isValidEmail && password != "") {
            try {
                const response = await AxiosInstance().post("/user/register",
                    { email: email, password: password ,name :name});//variable(mail password) chuyen len API
                console.log(response);
                if (response.result == true) {
                    ToastAndroid.show("Register Success", ToastAndroid.SHORT);
                    navigation.navigate('Login');
                } else {
                    ToastAndroid.show("Register Failed", ToastAndroid.SHORT);
                }
            } catch (e) {
                console.log(e)
            }
        } else {
            ToastAndroid.show("Please check email and password", ToastAndroid.SHORT);
        }
    }
    // const registerUser = async () => {
    //     console.log("IP_CONFIG_LAPTOP" + IP_CONFIG_LAPTOP)
    //     let data = { email, password, name }
    //     console.log("Client" + JSON.stringify(data))

    //     const fetchData = async (data) => {
    //         let url = 'http://192.168.0.104:3000/api/user/register';
    //         const response = await fetch(url, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(data)

    //         })

    //         const res = await response.json()
    //         if (res.result == true) {
    //             navigation.navigate("Login")
    //         }
    //         return res;
    //     }
    //     const res = await fetchData(data);
    //     console.log(res)

    // }
    const [getPasswordVisible, setPasswordVisible] = useState(false)
    const [email, setemail] = useState('');
    const [name, setname] = useState('')
    const [isValidEmail, setisValidEmail] = useState(true)
    const [password, setpassword] = useState('');
    // const { setisLogin, setinforUser, setPWUser } = useContext(AppContext);
    const [valid, setValid] = useState({});


    useEffect(() => {
        setValid({ ...valid, email: verifyEmail(email), password: password.length > 4 });

        return () => {
        }
    }, [email, password])


    const stylesValidator = (name) => {
        if (valid[name]) return {}
        else return {
            borderColor: 'red',
            backgroundColor: '#fff3f8'
        };
    }

    const verifyEmail = (email) => {
        let regex = new RegExp(/([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])/);
        if (email == "") return true
        if (regex.test(email)) {
            return true
        }
        return false

    }
    return (

        <SafeAreaView style={styles.main}>
            <View style={styles.container}>


                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ height: 130, width: 100 }} source={require('../../Assets/image/BagPagLogo.png')} />
                    <Text style={{ color: '#9c4125', fontSize: 16, fontWeight: 'bold' }}>Register for more !</Text>
                </View>
                {/* Input name */}
                <View style={[styles.textNormal,]}>
                    <Text style={styles.textNormal}>Email</Text>
                    <Text style={[styles.textNormal, { color: 'red' }]}>*</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput style={[styles.textInput, stylesValidator("email")]}
                        multiline={false}
                        value={email}
                        placeholder={"abc@gmail.com"}

                        onChangeText={(text) => {
                            setemail(text)
                            setisValidEmail(verifyEmail(text));
                        }} />
                    <Text style={[styles.text, { color: 'red', fontSize: 10, fontWeight: 'bold' }]}>{isValidEmail ? "" : " Email is invalid"}</Text>

                </View>
                <View style={[styles.textNormal,]}>
                    <Text style={styles.textNormal}>Username</Text>
                    <Text style={[styles.textNormal, { color: 'red' }]}>*</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput style={[styles.textInput,]}
                        multiline={false}
                        value={name}
                        placeholder={"abc@gmail.com"}

                        onChangeText={(text) => {
                            setname(text)

                        }} />
                    

                </View>
                {/* Input Password */}
                <View style={[styles.textNormal,]}>
                    <Text style={styles.textNormal}>Password</Text>
                    <Text style={[styles.textNormal, { color: 'red' }]}>*</Text>
                </View>
                <KeyboardAvoidingView
                    behavior="padding">

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput style={styles.textInput}
                            value={password}
                            multiline={false}
                            autoCapitalize={false}
                            autoCorrect={false}
                            placeholder={"••••••••"}
                            secureTextEntry={getPasswordVisible ? false : true}
                            onChangeText={setpassword} />
                        <TouchableOpacity style={styles.visible}
                            onPress={() => {
                                setPasswordVisible(!getPasswordVisible)
                            }}>
                            {
                                getPasswordVisible ?

                                    <Image resizeMode='contain' source={require('../../Assets/image/VisibleEye.png')}></Image>
                                    :
                                    <Image resizeMode='contain' source={require('../../Assets/image/InvisibleEye.png')}></Image>
                            }
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

                {/* Input Password */}
                <View style={[styles.textNormal, { marginTop: 10 }]}>
                    <Text style={styles.textNormal}>Repeat Password</Text>
                    <Text style={[styles.textNormal, { color: 'red' }]}>*</Text>
                </View>
                <KeyboardAvoidingView
                    behavior="padding">

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput style={styles.textInput}
                            value={password}

                            multiline={false}
                            autoCapitalize={false}
                            autoCorrect={false}
                            placeholder={"••••••••"}
                            secureTextEntry={getPasswordVisible ? false : true}
                            onChangeText={setpassword} />
                        <TouchableOpacity style={styles.visible}
                            onPress={() => {
                                setPasswordVisible(!getPasswordVisible)
                            }}>
                            {
                                getPasswordVisible ?

                                    <Image resizeMode='contain' source={require('../../Assets/image/VisibleEye.png')}></Image>
                                    :
                                    <Image resizeMode='contain' source={require('../../Assets/image/InvisibleEye.png')}></Image>
                            }
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                <View style={[styles.textNormal, { marginTop: 9, justifyContent: 'space-between' }]}>
                    <View style={styles.checkBox}>
                        <BouncyCheckbox
                            size={20}
                            unfillColor="#FFFFFF"
                            isChecked='false'
                            fillColor='#f7941e'
                            style={{ borderRadius: 0 }} />
                        <Text style={styles.textNormal}>
                            I agree all statements in Terms of Service
                        </Text>
                    </View>

                </View>
                {/* Button Login */}
                <TouchableOpacity
                    onPress={Register}
                    style={styles.btnLogin}>
                    <Text style={styles.textbtnLogin} > Sign Up</Text>
                </TouchableOpacity>

                <View style={[styles.textNormal, { justifyContent: 'center', marginTop: 16, }]}>
                    <Text style={styles.textNormal}>or sign up with</Text>
                </View>

                {/* Facebook Google */}
                <View style={styles.boxSocical}>
                    <TouchableOpacity>
                        <Pressable>
                            <Image style={styles.imgIconSocial} source={require('../../Assets/image/BtnFb.png')}></Image>
                        </Pressable>
                    </TouchableOpacity>
                    {/* <TouchableOpacity>
                        <Pressable>
                            <Image style={styles.imgIconSocial} source={require('../asset_ASM/BtnGoogle.png')}></Image>
                        </Pressable>
                    </TouchableOpacity> */}
                    <Text>
                        <GoogleSigninButton
                            style={{ width: 192, height: 48 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={this._signIn}
                        //   disabled={this.state.isSigninInProgress}
                        />;
                    </Text>
                </View>

                {/* Sign Up */}
                <View style={[styles.bottomText, {}]}>
                    <Text style={styles.textNormal}>
                        Already have an account ?
                    </Text>
                    <TouchableOpacity>
                        <Text
                            onPress={GoRegister}
                            style={[styles.textNormal, { color: '#f15a29', fontWeight: 'bold', marginLeft: 10 }]}>
                            Sign In
                        </Text>
                    </TouchableOpacity>

                </View>


            </View>
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {

        bacgroundColor: "#fff",
        marginHorizontal: 24,

    },
    textHeader: {
        fontSize: 50,
        color: '#050505',
        fontWeight: 'bold',
        marginTop: 30,

    },
    wellcomeText: {
        marginTop: 4,
        fontSize: 20,
        color: '#4E4B66'

    },
    textNormal: {
        flexDirection: "row",
        color: '#4E4B66',
        fontSize: 14,

    },
    textInput: {
        marginTop: 4,
        width: windowWIdth - 45,
        height: 48,
        borderColor: '#4E4B66',
        borderWidth: 2,
        borderRadius: 6,
        padding: 10,
        flexDirection: 'row',
        textAlign: 'left',
        paddingRight: 50,

    },
    btnLogin: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fbb040',
        borderRadius: 6,
        width: windowWIdth - 45,
        height: 50,
        marginTop: 17.5,

    },
    textbtnLogin: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    bottomText: {

        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 16
    },
    boxSocical: {
        marginTop: 16,
        width: windowWIdth - 45,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        // borderWidth: 2,
        // borderColor: 'black',
    },
    checkBox: {
        flexDirection: 'row'
    },
    visible: {
        position: 'absolute',
        right: 11,
        bottom: 13,
    }

})
