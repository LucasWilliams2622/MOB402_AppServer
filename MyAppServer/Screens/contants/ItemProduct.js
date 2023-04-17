import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const windowWIdth = Dimensions.get('window').width;

const ItemProduct = (props) => {
    const { product, navigation } = props;
    const deleteItemProduct = async (id) => {
        console.log("Delete")
    }
    const editItemProduct = async (id) => {
        console.log("Edit")
    }
    const ClickItem = () => {
        console.log('Click item',product._id)
        navigation.navigate("Detail", { product });
        
        // console.log("image :"+ product.image)
    }
    return (
        <TouchableOpacity onPress={ClickItem}>
            <SafeAreaView style={styles.container} >
                <View style={styles.main}>
                    <View style={styles.content}>
                        <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                            <Text style={styles.title}>Name:</Text>
                            <Text style={styles.Item}>{product.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                            <Text style={styles.title}>Price:</Text>
                            <Text style={styles.Item}>{product.price}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                            <Text style={styles.title}>Quantity:</Text>
                            <Text style={styles.Item}>{product.quantity}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                            <Text style={styles.title}>Category:</Text>
                            <Text numberOfLines={3} style={[styles.Item, { maxWidth: 70 }]}>{product.name}</Text>
                        </View>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={styles.image} source={{ uri: product.image }} />
                    </View>
                    {/* <View style={{ justifyContent: 'center', }}>
                    <TouchableOpacity 
                    style={styles.button} 
                    onPress={deleteItemProduct}>
                        <Text style={styles.textButton}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={[styles.button, { marginTop: 20, backgroundColor: '#1cc959', borderColor: '#0a732f' }]}
                    onPress={editItemProduct}>
                        <Text style={styles.textButton}>Edit</Text>
                    </TouchableOpacity>
                </View> */}
                </View>
            </SafeAreaView>
        </TouchableOpacity>

    )
}

export default ItemProduct

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    main: {
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    content: {
        flexDirection: 'column',
        // borderWidth: 2,
        // borderColor: 'black',
        justifyContent: 'flex-start', alignItems: 'flex-start',
        width: 200,
        padding: 10,
        maxWidth: 200,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: 'black',
        letterSpacing: 0.12,
    },
    Item: {
        fontSize: 16,
        fontWeight: '400',
        color: 'black',
        letterSpacing: 0.12,
        maxWidth: 100,

    },
    image: {
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'black',
        width: windowWIdth - 120 * 2,
        height: 150,
        // maxHeight:130,
        // maxWidth: windowWIdth - 130 * 2,

    },
    button: {
        backgroundColor: '#d95130',
        padding: 12,
        borderWidth: 1.3,
        borderColor: '#fa3200',
        borderRadius: 20,
        justifyContent: 'center', alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    textButton: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#f5f5b8'
    }
})