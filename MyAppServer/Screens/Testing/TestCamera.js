
import { Animated, Easing, StyleSheet, Text, View } from 'react-native'
import React,{useRef,useEffect} from 'react'

const TestCamera = () => {
  const animatedValue = useRef(new Animated.ValueXY({
    x:100,
    y:100,
  })).current;
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: {
        x:200,
        y:300,
      },
      duration: 2000,
      useNativeDriver: false,
      easing:Easing.inOut(Easing.bounce)
    }).start();


  }, [animatedValue])

  return (
   
      <Animated.View style={{
        width: 100,
        height: 100,
        marginTop: animatedValue.y,
        marginLeft: animatedValue.x,

        backgroundColor: 'black'
      }}>
    </Animated.View>
    
  )
}

export default TestCamera

const styles = StyleSheet.create({})


























// import React, { useState } from 'react';
// import { View, Text, TextInput, Image, StyleSheet, Dimensions, Button, KeyboardAvoidingView, Alert, TouchableOpacity } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Dropdown } from 'react-native-element-dropdown';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import AxiosIntance from '../Ultil/AxiosIntance';

// const windowHeight = Dimensions.get('window').height;
// const windowWIdth = Dimensions.get('window').width;


// const Category = [
//   { label: 'School', value: '1' },
//   { label: 'Work', value: '2' },
//   { label: 'Fashion', value: '3' },
//   { label: 'Travel', value: '4' },
//   { label: 'Active', value: '5' },
//   { label: 'Outdoor', value: '6' },

// ]
// const Form = (props) => {
//   const { navigation } = props;

//   const [imageUrl, setimageUrl] = useState("")
//   const [valueCategory, setvalueCategory] = useState(null)


//   const [isFocus, setIsFocus] = useState(false);

//   const Back = () => {
//     navigation.pop(1)
//   }
//   const renderCategory = () => {
//     if (valueCategory || isFocus) {
//       return (
//         <Text style={[styles.label, isFocus && { color: 'blue' }]}>

//         </Text>
//       );
//     }
//     return null;
//   };

//   const dialogImageChoose = () => {
//     return Alert.alert(
//       "Thông báo",
//       "Chọn phương thức đăng ảnnh",
//       [
//         {
//           text: "Chụp ảnh ",
//           onPress: () => {
//             capture()
//           },
//         },
//         {
//           text: "Tải ảnh lên",
//           onPress: () => {
//             getImageLibrary()
//           },
//         },
//         {
//           text: "Hủy",
//         },
//       ]
//     );
//   };
//   const capture = async () => {
//     const result = await launchCamera();
//     console.log(result.assets[0].uri);
//     const formdata = new FormData();
//     formdata.append('image', {
//       uri: result.assets[0].uri,
//       type: 'image/jpeg',
//       name: 'image.jpg',


//     });
//     console.log("result"+formdata)

//     // console.log(result.assets[0].uri);
//     // const formdata = new FormData();
//     // formdata.append('image', {
//     //   uri: result.assets[0].uri,
//     //   type: 'image/jpeg',
//     //   name: 'image.jpg',


//     // });
//     // const response = await AxiosIntance("multipart/form-data").post('/media/upload', formdata);
//     // console.log(response.data.path);
//     // if (response.error == false) {
//     //   setimageUrl(response.data.path);
//     //   ToastAndroid.show("Upload ảnh thành công", ToastAndroid.SHORT);
//     // }
//     // else {
//     //   ToastAndroid.show("Upload ảnh thất bại", ToastAndroid.SHORT);
//     // }
//   }
//   const getImageLibrary = async () => {
//     const result = await launchImageLibrary();
//     // console.log(result.assets[0].uri);
//     // const formdata = new FormData();
//     // formdata.append('image', {
//     //   uri: result.assets[0].uri,
//     //   type: 'image/jpeg',
//     //   name: 'image.jpg',


//     // });
//     // const response = await AxiosIntance("multipart/form-data").post('/media/upload', formdata);
//     // console.log(response.data.path);
//     // if (response.error == false) {
//     //   setimageUrl(response.data.path);
//     //   ToastAndroid.show("Upload ảnh thành công", ToastAndroid.SHORT);
//     // }
//     // else {
//     //   ToastAndroid.show("Upload ảnh thất bại", ToastAndroid.SHORT);
//     // }
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView>

//         <View style={styles.main}>
//           <View style={{ padding: 10 }}>
//             <View style={styles.centerItem}>
//               <Text style={styles.title}>New Product</Text>

//             </View>
//             <View style={styles.boxInput}>
//               <Text style={styles.text}>Name:</Text>
//               <TextInput style={styles.TextInput}
//                 autoCapitalize={false}
//                 autoCorrect={false}
//                 placeholder="Gucci Bag ..."
//                 keyboardType='ascii-capable'
//               />
//             </View>
//             <View style={styles.boxInput}>
//               <Text style={styles.text}>Price:</Text>
//               <TextInput style={styles.TextInput}
//                 autoCapitalize={false}
//                 autoCorrect={false}
//                 placeholder=" 99 .99 $"
//                 keyboardType='numeric'
//               />
//             </View>
//             <View style={styles.boxInput}>
//               <Text style={styles.text}>Quantity</Text>
//               <TextInput style={styles.TextInput}
//                 autoCapitalize={false}
//                 autoCorrect={false}
//                 placeholder=" 67"
//                 keyboardType='numeric'
//               />
//             </View>
//             <View style={styles.boxInput}>
//               <Text style={styles.text}>Image:</Text>
//               <TouchableOpacity onPress={dialogImageChoose} >
//                 <Image style={styles.image} source={require('../../Assets/BagImage/1.jpg')} />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.boxInput}>
//               <Text style={styles.text}>Category:</Text>
//               {renderCategory()}
//               <Dropdown
//                 style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
//                 placeholderStyle={{ color: '#AC8E71' }}
//                 selectedTextStyle={{ color: '#AC8E71' }}
//                 inputSearchStyle={styles.inputSearchStyle}

//                 data={Category}
//                 search
//                 maxHeight={140}
//                 labelField="label"
//                 valueField="value"

//                 placeholder={!isFocus ? 'Category' : '...'}
//                 searchPlaceholder="Search..."
//                 value={valueCategory}
//                 onFocus={() => setIsFocus(true)}
//                 onBlur={() => setIsFocus(false)}
//                 onChange={item => {
//                   setvalueCategory(item.valueCategory);
//                   setIsFocus(false);
//                   console.log('data:' + valueCategory)
//                 }}
//               />
//             </View>
//             <TouchableOpacity style={styles.centerItem}>
//               <View style={styles.button} >
//                 <Text style={[styles.text, { color: 'white' }]}>Add New Product</Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   )
// }

// export default Form
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     flex: 1,
//   },
//   main: {
//     backgroundColor: 'white',
//     margin: 14,
//     borderRadius: 16,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.30,
//     shadowRadius: 4.65,

//     elevation: 8,
//   },
//   title: {
//     fontSize: 20,
//     color: '#f15a29',
//     fontWeight: 'bold',
//     marginBottom: 10,

//   },
//   text: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: 'black',

//   },
//   TextInput: {
//     borderWidth: 1,
//     borderRadius: 6,
//     color: 'gray',
//     height: 40,
//     marginTop: 5,


//   },
//   boxInput: {

//     flexDirection: 'column',
//     marginBottom: 15,

//   },
//   image: {
//     marginTop: 5,
//     width: windowWIdth - (14 * 2 + 20),
//     height: 120,
//     borderWidth: 1,
//     borderColor: 'black'
//   },
//   dropdown: {
//     height: 40,
//     borderRadius: 10,
//     paddingHorizontal: 27,
//     backgroundColor: '#F3F3F3',
//     width: windowWIdth - (14 * 2 + 20),
//     marginBottom: 60,
//   },
//   button: {
//     backgroundColor: '#f2921d',
//     borderWidth: 1,
//     marginBottom: 5,
//     height: 50,
//     padding: 10,
//     width: 150,
//     borderRadius: 14,
//     borderColor: '#696cff',
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 4,

//     },
//     shadowOpacity: 0.32,
//     shadowRadius: 5.46,

//     elevation: 9,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   centerItem: {
//     justifyContent: 'center', alignItems: 'center'
//   }
// })