import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Dimensions, Button, KeyboardAvoidingView, Alert, TouchableOpacity, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
const windowHeight = Dimensions.get('window').height;
const windowWIdth = Dimensions.get('window').width;
import { IP_CONFIG_LAPTOP } from '../../Component/index/index'
import AxiosInstance from '../Ultil/AxiosInstance';


const Category = [
  { label: 'School', value: '1' },
  { label: 'Work', value: '2' },
  { label: 'Fashion', value: '3' },
  { label: 'Travel', value: '4' },
  { label: 'Active', value: '5' },
  { label: 'Outdoor', vaproductlue: '6' },

]

const Form = (props) => {
  const { navigation } = props;
  const [valueCategory, setValueCategory] = useState(null)
  const [isFocus, setIsFocus] = useState(false);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [categories, setCategories] = useState([]);
  const [imageUrl, setImageUrl] = useState(null)

  const getAllCategory = async () => {
    try {
      const response = await AxiosInstance().get("category/get-all-category",);

      if (response.result) {
        console.log("categories", response.categories)
        setCategories(response.categories)
      } else {
        ToastAndroid.show(" Failed", ToastAndroid.SHORT);
      }
    } catch (e) {
      console.log("=========>" + e);
    }
  }
  const addNewProduct = async () => {
    try {
      const response = await AxiosInstance().post("product/add-new",
        {
          name: name, price: price, quantity: quantity,
          image: imageUrl,
          category: valueCategory
        });

      if (response.result) {

        ToastAndroid.show("Add new success", ToastAndroid.SHORT);
        // setName("");
        // setPrice("");
        // setQuantity("")
        // setCategories("")
        // setImageUrl("")
      } else {
        ToastAndroid.show(" Failed to add new", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log("Error add new" + error);
    }
  }
  const renderCategory = () => {
    if (valueCategory || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
        </Text>
      );
    }
    return null;
  };
  const dialogImageChoose = () => {
    return Alert.alert(
      "Thông báo",
      "Chọn phương thức đăng ảnnh",
      [
        {
          text: "Chụp ảnh ",
          onPress: () => {
            capture()
          },
        },

        {
          text: "Tải ảnh lên",
          onPress: () => {
            getImageLibrary()
          },
        },
        {
          text: "Hủy",
        },
      ]
    );
  };
  const capture = async () => {
    const result = await launchCamera();
    console.log(result.assets[0].uri);
    const formdata = new FormData();
    formdata.append('image', {
      uri: result.assets[0].uri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    const response = await AxiosInstance("multipart/form-data").post('/product/upload-image', formdata);
    console.log(response.link);
    if (response.result == true) {
      setImageUrl(response.link);
      ToastAndroid.show("Upload ảnh thành công", ToastAndroid.SHORT);
    }
    else {
      ToastAndroid.show("Upload ảnh thất bại", ToastAndroid.SHORT);
    }
  }
  const getImageLibrary = async () => {
    const result = await launchImageLibrary();
    console.log(result.assets[0].uri);
    const formdata = new FormData();
    formdata.append('image', {
      uri: result.assets[0].uri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    const response = await AxiosInstance("multipart/form-data").post('/product/upload-image', formdata);
    console.log(response.link);
    if (response.result == true) {
      setImageUrl(response.link);
      ToastAndroid.show("Upload ảnh thành công", ToastAndroid.SHORT);
    }
    else {
      ToastAndroid.show("Upload ảnh thất bại", ToastAndroid.SHORT);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>

        <View style={styles.main}>
          <View style={{ padding: 10 }}>
            <View style={styles.centerItem}>
              <Text style={styles.title}>New Product</Text>

            </View>
            <View style={styles.boxInput}>
              <Text style={styles.text}>Name:</Text>
              <TextInput style={styles.TextInput}
                autoCapitalize={false}
                autoCorrect={false}
                placeholder="Gucci Bag ..."
                keyboardType='ascii-capable'
                value={name}
                onChangeText={(text) => { setName(text) }}
              />
            </View>
            <View style={styles.boxInput}>
              <Text style={styles.text}>Price:</Text>
              <TextInput style={styles.TextInput}
                autoCapitalize={false}
                autoCorrect={false}
                placeholder=" 99 .99 $"
                keyboardType='numeric'
                value={price}
                onChangeText={(text) => { setPrice(text) }}
              />
            </View>
            <View style={styles.boxInput}>
              <Text style={styles.text}>Quantity</Text>
              <TextInput style={styles.TextInput}
                autoCapitalize={false}
                autoCorrect={false}
                placeholder=" 67"
                keyboardType='numeric'
                value={quantity}
                onChangeText={(text) => { setQuantity(text) }}
              />
            </View>
            <View style={styles.boxInput}>
              <Text style={styles.text}>Category:</Text>
              {renderCategory()}
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={{ color: '#AC8E71' }}
                selectedTextStyle={{ color: '#AC8E71' }}
                inputSearchStyle={styles.inputSearchStyle}

                data={categories}
                search
                maxHeight={250}
                labelField="name"
                valueField="_id"

                placeholder={!isFocus ? 'Category' : '...'}
                searchPlaceholder="Search..."
                value={valueCategory}
                onFocus={() => { [setIsFocus(true), getAllCategory()] }}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValueCategory(item._id);
                  setIsFocus(false);
                  console.log('data:', item.name)
                }}
              />
            </View>
            <View style={styles.boxInput}>
              <Text style={styles.text}>Image:</Text>
              <TouchableOpacity onPress={dialogImageChoose} >
                {/* <Image style={styles.image} source={{ uri: imageUrl }} /> */}
                {
                  !imageUrl
                    ?
                    (<Image style={styles.image} source={require('../../Assets/BagImage/1.jpg')} />)
                    :
                    (<Image style={styles.image} source={{ uri: imageUrl }} />)
                }

              </TouchableOpacity>
            </View>


            <TouchableOpacity style={styles.centerItem} onPress={addNewProduct}>
              <View style={[styles.button, { marginTop: 10 }]} >
                <Text style={[styles.text, { color: 'white' }]}>Add New Product</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Form
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  main: {
    backgroundColor: 'white',
    margin: 14,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
  },
  title: {
    fontSize: 20,
    color: '#f15a29',
    fontWeight: 'bold',
    marginBottom: 10,

  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',

  },
  TextInput: {
    borderWidth: 1,
    borderRadius: 6,
    color: 'gray',
    height: 40,
    marginTop: 5,


  },
  boxInput: {

    flexDirection: 'column',
    marginBottom: 15,

  },
  image: {
    marginTop: 5,
    width: windowWIdth - (14 * 2 + 20),
    height: 150,
    borderWidth: 1,
    borderColor: 'black'
  },
  dropdown: {
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 27,
    backgroundColor: '#F3F3F3',
    width: windowWIdth - (14 * 2 + 20),

  },
  button: {
    backgroundColor: '#f2921d',
    borderWidth: 1,
    marginBottom: 5,
    height: 50,
    padding: 10,
    width: 150,
    borderRadius: 14,
    borderColor: '#696cff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,

    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerItem: {
    justifyContent: 'center', alignItems: 'center'
  }
})