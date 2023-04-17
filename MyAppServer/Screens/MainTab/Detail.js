import { SafeAreaView, StyleSheet, Text, View, Dimensions, Image, Alert, ToastAndroid } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import AxiosInstance from '../Ultil/AxiosInstance';
const windowWIdth = Dimensions.get('window').width;

const Detail = (props) => {

    const { route, navigation } = props;
    const { params } = route;
    const { product } = params;
    const [isLoading, setIsLoading] = useState(true)
    const [idProduct, setIdProduct] = useState("")
    
    const deleteItemProduct = async () => {
        console.log("a")
        return Alert.alert(
            "Thông báo !",
            "Xóa sẽ không khôi phục được ! ",
            [
                {
                    text: "Xóa",
                    onPress: () => {
                        onDeleteProduct();

                    },
                },
                {
                    text: "Hủy",
                },
            ]
        );

    }
    const onDeleteProduct = async () => {
        setIdProduct(product._id);

        const response = await AxiosInstance()
            .delete("/product/delete?id=" + idProduct);
        setIsLoading(true);
        if (response.result == true) {

            setIsLoading(false);
            navigation.navigate("Table")
            ToastAndroid.showWithGravity('Delete Success', ToastAndroid.SHORT, ToastAndroid.CENTER,);
        } else {
            ToastAndroid.show("Delete Failed", ToastAndroid.SHORT)
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <View style={styles.contentTop}>
                    <TouchableOpacity onPress={() => { navigation.pop(1) }} >
                        <Image source={require('../../Assets/Icon/IconArrow.png')} />
                    </TouchableOpacity>
                    <Text style={styles.titlePage}>Detail product</Text>
                    <Text />
                </View>

                <View style={[styles.mainContent, styles.shadow]}>
                    <View>
                        <View style={styles.itemCenter}>
                            <Image style={styles.image} source={{ uri: product.image }} />
                        </View>
                        <View style={{ marginTop: 10, marginLeft: 10 }} >
                            <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                                <Text style={styles.title}>Name:</Text>
                                <Text style={styles.itemText}>{product.name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                                <Text style={styles.title}>Price:</Text>
                                <Text style={styles.itemText}>{product.price}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                                <Text style={styles.title}>Quantity:</Text>
                                <Text style={styles.itemText}>{product.quantity}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                                <Text style={styles.title}>Category:</Text>
                                <Text style={styles.itemText}>{product.category.name}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                            <TouchableOpacity
                                onPress={deleteItemProduct()}
                                style={[styles.button, { backgroundColor: "#A42B32", borderColor: "red" }]}>
                                <Image style={[styles.imageButton, { tintColor: 'black', width: 30, height: 30 }]} source={require("../../Assets/Icon/IconRecycleBin.png")} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Image style={styles.imageButton} source={require("../../Assets/Icon/IconEdit.png")} />
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Detail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    main: {
        backgroundColor: 'white',
        paddingHorizontal: 12,
        paddingVertical: 10,

    },
    image: {
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'black',
        width: windowWIdth - 60,
        height: 190,

        // maxHeight:130,
        // maxWidth: windowWIdth - 130 * 2,

    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    itemCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentTop: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',


    },
    titlePage: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#f15929'
    },
    title: {
        fontSize: 17,
        color: 'black',
        fontWeight: '700',

    },
    mainContent: {
        borderRadius: 5,
        marginTop: 10,
        padding: 20

    },
    itemText: {
        marginLeft: 10,
        fontSize: 17,
        color: 'black',
    },
    button: {
        backgroundColor: "#74dc2e", width: windowWIdth / 2 - 40, height: 60,
        borderWidth: 2, borderColor: 'green', borderRadius: 10, justifyContent: 'center', alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    imageButton: { width: 40, height: 40, }
})