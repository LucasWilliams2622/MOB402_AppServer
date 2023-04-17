import { StyleSheet, Text, View, Animated, RefreshControl, Image, Dimensions, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import React, { useState, useRef, useEffect } from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import ItemProduct from '../contants/ItemProduct'
import { ActivityIndicator, TextInput } from 'react-native-paper';
import AxiosInstance from '../Ultil/AxiosInstance';

const Table = (props) => {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(true)
  const [refreshControl, setRefreshControl] = useState(false)
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [products, setProducts] = useState([])
  const [stateList, setStateList] = useState(0)
  
  const getProducts = async () => {
    const response = await AxiosInstance().get("/product/get-all-v2");
    console.log("name", response.products);

    if (response.result) {
      setProducts(response.products)//array

      // setIdProduct(response.products._id)
      // console.log("idProduct",idProduct)
      setIsLoading(false);

    } else {
      ToastAndroid.show("Lấy data thất bại")
    }
  }
  useEffect(() => {
    getProducts();
    return () => {
    }
  }, [stateList])
  const deleteItemProduct = async (data) => {
    return Alert.alert(
      "Thông báo !",
      "Xóa sẽ không khôi phục được ! ",
      [{
        text: "Xóa",
        onPress: () => {
          console.log("id  ", data.item._id)
          onDeleteProduct(data.item._id);
        },
      },
      {
        text: "Hủy",
      },]
    );

  }
  const onDeleteProduct = async (idProduct) => {
    const response = await AxiosInstance()
      .delete("/product/delete?id=" + idProduct);
    setIsLoading(true);

    if (response.result == true) {
      getProducts()
      setIsLoading(false);
      ToastAndroid.showWithGravity('Delete Success', ToastAndroid.SHORT, ToastAndroid.CENTER,);
    } else {
      ToastAndroid.show("Delete Failed", ToastAndroid.SHORT)
    }
  }
  const editItemProduct = async () => {
    ToastAndroid.showWithGravity('Edit', ToastAndroid.SHORT, ToastAndroid.CENTER,);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Animated.View style={[styles.centerItem, {
          width: '100%', height: 50,
          opacity: animatedValue.interpolate({
            inputRange: [-1, 100],
            outputRange: [1, 0],
          }),
        }]}>
          <Text style={styles.title}>List Of Products</Text>
        </Animated.View>
        <View style={{ marginBottom: 100 }}>
          {/* {
            isLoading == true ?
              (
                <View style={styles.loading}>
                  <ActivityIndicator size='large' color='#fffff' />
                  <Text>Loading....</Text>
                </View>
              )
              :
              ( */}
          <SwipeListView
            onScroll={e => {
              animatedValue.setValue(e.nativeEvent.contentOffset.y)
            }}

            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            data={products}
            renderItem={({ item }) => <ItemProduct product={item} navigation={navigation} />}
            keyExtractor={item => item._id}
            extraData={true}

            refreshControl={
              <RefreshControl refreshing={refreshControl} onRefresh={() => {
                setRefreshControl(true)
                console.log("Refresh")
                setStateList(stateList + 1)
                console.log(stateList)

                setRefreshControl(false)
              }} colors={['green']} />
            }

            Load More
            ListFooterComponent={() => (
              isLoading ? //  a==b ? b : a
                <View style={{
                  marginTop: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  padding: 10,
                  // width : WIDTH,
                  // height : 50 ,
                  flexDirection: 'column'
                }} >
                  <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 5 }}> Loading ... </Text>
                  <ActivityIndicator size="small" color='green' fontWeight='bold' />
                </View> : null
            )}
            onEndReached={() => {
              setIsLoading(true)
              console.log("Load More")
              // setData(mang_du_lieu)

              setTimeout(() => {
                //   setData(data.concat([ { title : "moi a nha"} ]))
                setIsLoading(false)
              }, 5000);
            }}
            onEndReachedThreshold={0.1}
            renderHiddenItem={(data, rowMap) => (
              <>
                <TouchableOpacity
                  onPress={() => {
                    deleteItemProduct(data)
                  }}
                  style={{
                    height: 80,
                    backgroundColor: '#A42B32',
                    justifyContent: 'center',
                    marginHorizontal: 10,
                    alignItems: 'flex-end',
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                  }}>
                  <Image
                    source={require('../../Assets/Icon/IconRecycleBin.png')}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: "blue",
                      marginRight: 30,
                      tintColor: 'white',
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={editItemProduct}
                  style={{
                    height: 80,
                    backgroundColor: '#74dc2e',
                    borderBottomLeftRadius: 20,
                    marginHorizontal: 10,
                    borderBottomRightRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Image
                    source={require('../../Assets/Icon/IconEdit.png')}
                    style={{
                      width: 30,
                      height: 20,
                      tintColor: "blue",
                      marginRight: 30,
                      tintColor: 'white',
                    }}
                  />
                </TouchableOpacity>

              </>

            )}

            rightOpenValue={-85}
          />
          {/* )
          } */}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Table

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  main: {
    backgroundColor: 'white',

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f15929'
  },
  centerItem: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#FFDD83',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,

  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

const data = [{
  "_id": 1,
  "name": "Melloney",
  "price": 150,
  "quantity": 1,
  "category": "Temp Fencing, Decorative Fencing and Gates",
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIcSURBVDjLjZO/T1NhFIafc+/trdRaYk1KUEEWjXHRaCSik+E/cDHGzYXB2YHRhMRFY1SYmRgYHZ3VxIRFDYMraMC2hrbQXm7v9+M4UGobiOEk7/adN+9zvnNEVQEQkYvAGBDy/6oBm6rqAVBVeia30jRtGmOctVaPU5qmuri4+AaYAgJVHTKYNsa4drutnU6nr1arpY1GQ6vVqlprdXt7W5eWlvomMv/uw6tSofB4p+NOF0biYtc48tEAhXiuTZzh/s1xyuUyWZbhvWdlZeXt3Nzca14sf6zW6nXf7uzrcfq9s6sLy5+1Xq8fQQKmo1ZCvlAoyo+tXT5tPGO09IckM2zWznH3/AJ3rl5ACInjmGazifceay2VSgWASISSBaz3FIs1RnJlPF18vEG1keDVk1lLFEWICM45wvAfYqTKriqje0lGI01x2qFtuuwkKQ26oEKcCwnDEBFBRA6HfmBw8JWwl3o2ti7j8+u0TUKzcYkrY/n+wyAIEJEjSxEglLyH5r7j+tg8T1oVZr8GzE69JIoiFMiM7zeHYUgQBAMJVBGU77+eYoxhLcvIxnNk6w8xxvDo3hqH+yIieO+HEkQB/qe6bPL5g/cckCkDiBhjOJULhlCGDJIkXX2z+m3GeW4UCnExyxxxHIIOLNLk2WP5AaQXTYDb1tovgHCy8lEUzQS9g1LAO+f2AX+SZudcAjgZOOeJ3jkHJ0zggNpfYEZnU63wHeoAAAAASUVORK5CYII="
}, {
  "_id": 2,
  "name": "Codi",
  "price": 982,
  "quantity": 2,
  "category": "Structural & Misc Steel Erection",
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJzSURBVBgZBcFdaJVlAADg532/75zN/XSstrM1YVBUpEmtycigG4sQu7FBl0VE5GUdooiuRj/3RRdddBNE94FgFkJqehPBQLLInEMHbXZmDvd7vr/z9Twhe8v+5rQFqQ6AiAiACAAoseqLfMXHaXPagseOdUwcIWkQU0IgBkIkBmJAQkBAXbH6W6f5w2mpVMfEEbKEyTkSdP/kziIxkkREEoRIXTMyRnuW9ulOCpIGcZBn5gHzFDtcP8fSGaptBOoagY3bDD5In6iPkLK7xu/fs3yZnXUawxx6hRNfMnUUECgKegVlTk4qIgZ217j6HTGQRsZmmHmN1jTPvsvi1yydIyvJM4qKHlFExOQcr37LC5/y6Ek2l/n5Q1Z+AWZPMTFDltErKUpyUn1ICGgMM36Q8YMcmufyZy7dLHT/uW47GzDQeFNr9g3HL7wuFhU9UhEBd69w9h3ah3linuFxl8ZO2SyGPD01Im0kuvdyG1uZi49/4FjvJ3KiiBipI3tdVs5z/iNuXXB7e8AjE0M2smBts1KGxIH2qG7rSfKKnFQfAknN0fdpjLBykcVvbLc+0Ww2lFmpX5OVtcE0UdYpZUVOCmLN+GGm5oC65OpZQ+2GvKgUFWW/BnVgd2eHsiYnAoG9dYpdYP0GWebA3jVbe5XRfamhwdR9Qw1rdwv1f9esbt2jJJWjLlHx43s0WqxcISs99cdXljZPuvHQi/o1Wzs9xb9/eX68a3WzqWi1hPptn3v5REd7jhJVQVFRVBQVeUVRUVZU3NrccmffoAcenvH3r2fKkB23vzlpwaSOPkr0kCNHDyVylMi5ef+o5edeKqu6n/4PaywNA5LOKLcAAAAASUVORK5CYII="
}, {
  "_id": 3,
  "name": "Riki",
  "price": 994,
  "quantity": 3,
  "category": "Granite Surfaces",
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKnSURBVDjLpVPfS5NhFN6/0F1EF9FFBf28GhF0UWrkVQQZkamgbckoGEUsbVJgLl2K++F0bcx0UwZT07bZnG6yzc3hJND56ZYr59zELjSdm36NTZ6+9yOEQQyii8MLh/M857zPeQ4HAOd/4p8BBoMB3d3d0Gg0UKlUDzg+nw8kpqam4HK54HQ6MT4+DpvNBovFguHhYQwMDMBoNEKv17O12WwWiUQCMpmM4ni9XuRyOWQymYKRSqWg0+nWk8kkwuEw2tvbo1KpVMDxeDxsIh6Pw+/3IxaLgeSi0SgmJiYQiURgtVrZmsHBQVAUxU7U0tJSdKiBw+HA9PQ0RkdHuW63G0NDQ1wC7uvr45JvaLVaLgH7jbdE4f57iHxqwpzuBuZVZytZgrGxMQSDQVaDlZUVVgPSmYBDoRDb+WtAhY1JEXaCViC1ju0gQ9h688ehuiMjI0in07Db7WCU5prNZqI0l4wbMBXVbVKvkImbseF6h/2Fj8iterHwgU8fEjCF4kAggOXlZRAw6WwymRCe1WOLEuNg34v974+xFXiCkKEGQW3FZkBx+1Tejnt7e4nSUKvVUCqV6FcL8XOhDge0H3vfqkCvlWN3qR6LnSX40lZ8qaCRbG+O3t2YFf0BV4KO3UeSeomQshiS5zXbeU7s6ek5zSj9vqurCwqFAhrpI1C2Z8zYHtDRGvxaq8AOM0moowTh1ssnBAJBOo+AEUtMXrlcLlQ2VGwufq7HvE2GxEwZ9qLl2Jp7gSVlUarhKS/BgIV8Pp/OI2A8LWZsya7LRPyxu4qw5g4m64/Bpy6F/fUVGDqbWRsztaiuro789ZgkEgkaeeeQ8XcgMyPHTNM1mB4eT9nrLlysra0V8ng8AkbBayy7eoR+W3Um62wuzTrarrstovMnC13nb3Lp9V3T7PhSAAAAAElFTkSuQmCC"
}, {
  "_id": 4,
  "name": "Modesty",
  "price": 733,
  "quantity": 4,
  "category": "Roofing (Asphalt)",
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIjSURBVDjLY/j//z8DJZiBqgb4dN1jDpnycL5Xx111z7a7/JVrnn8Aibs13DKrXv38t0/b3XkEXeDVdjetZOWzJx7Nd4y82+5McKm9pVm56tnPgK67a4n2glvjraicRU/vudTc5AzsurcmdOKDg3i9YGdnx52VlVXa2tr6bt68ef9ramoeJqXnXwHJ5eTkSAD5d0HiIHmQOpB6uAFGRkZsPj4+XRMnTvz/4sWL/3fv3v1/8ODB/42NjfdACqqrqw/dvHnzB0j8yJEj/0HqQOpB+sAGGBoa+hUXF3+4evXqu4iIiG3e3t5/UlNT/0+aNCkPpCA/P/8/iA8SB8mvWLHiIUg9SB/MBV1NTU3fJ0+enA5U+Mne3p5j7969HOfOneMAKTh06BDH2rVrOYDiakD5JyB1IPUgfWADdHV1M9PT099PmzatJCgoaKejo+MvNze3/4GBgf9BCoC0PogPEgfJg9SB1IP0gQ3QBAJfX9/rvb2971etWvV23bp1/6dPn/6/sLAQbEBFRQWYDxIHyYPUgdSD9IENUFNTYwY6z8DLy+t+SkrKl+zs7O9A/DM8PDwOpCAhOfc6kP8JJA6SB6kDqQfpw5kOPKtvHHTIu7JGL/wMZ0DzrXvaIaejiM4LTgVX1yZOuvdTN+yMplHk+QmaIaeNAhpuPlEPPJFG0ACr9Ivz4ife+60TesYMxA9tu/UBqJFfPeCEulHk2fmqfseZqZ4bAf27e9aCOQHGAAAAAElFTkSuQmCC"
}, {
  "_id": 5,
  "name": "Pearce",
  "price": 384,
  "quantity": 5,
  "category": "EIFS",
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJYSURBVDjLY/j//z8DJRhMmJQd+x89/W4IRQbY1x5L8590dzmy5PuIqC4gfvA+PPIyEMfhNqD06H+L9gfG9p33/jr23OMEiX30DTj8yT/oFxCf+hAYfBeIfwPxIyBWwjSg5Mh/tYZHzDr1D34aND7Y9tXOsf2Lg/O/z85uNjCFn908lT56eH985xXwzXvygwYUA4yLD/9Xcm+QlS572JWesP7XVyOL79/MLKci22Rc/6DXvPH+X8um+79t2u7/tOu4/w9ugFHxof8wha+1LP89NHT9iaxZIf/BCpWie7/Vi+/N/25kqvrN2Oz/suiO6QgDig6ADfgtJrX0p6TMb1u/Xd+5Eh9M4k16yCyQdH+HYOK9H6JJd+tgBv7U0j3wXVvvA9wAg8J9/6sNAvT/8gr++8Mn1MYQ8aCFIfzBf6bwB3+Zwx/8Ywu7H44e+j8VVX4hDMjf+/8/I6v/fya2OyghHHCn3GuRw3TvJTZnPJdYnXVbbA436Le49Aa4Afp5u///ZGAJ+c3AIg5T4DXT0stjpuULj1nmD9xmW6x1nWu2z2W+6RenBcbxIHmga6XgBujl7vw/R1TDAabZscNommOn0UeHLsNFDj2GPDBxh37DDrtJ+u8x0oFu9vb/liU6khal2jPNS3UfAem3FmU6Gej+tqjX5rBo0rln1qI9GdWArG3/jTI0/Q0z1N3UAyxdgTQ4NQpreMjCFAqpOoHZRvnqUhpROhmmxRo8cAO0M7f8187Y/F8rYxMQb/yvlbYBiNf/1wTh1HX/NUA4ZS0Ur/mvkbwajOEGUIIBf5BxjDvwFIUAAAAASUVORK5CYII="
}, {
  "_id": 6,
  "name": "Nolan",
  "price": 460,
  "quantity": 6,
  "category": "RF Shielding",
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLY/j//z8DJZgsTV+9fAu+uHo8+GzvXECWAV+c3R//mTn9/ydLu4eka3ZyY/ts63T3k4Xt+4/GlqS74JONY+9Hc5tdH4wsmAmGgWv9xQKX2nMPnapOF4A1WzsEfjSzefLB0FwUHoi/szPX/05P/f0rOWk9ugHONWefzNl44X/B/L3/o7LXnn1h4fitN6i22Tx7W5tpxqYHxmnrChh+p6X+/rd10/+fsbF/f0REmiE0n7F3rDz5wb7s6Bu3gt3Vz80db69zTd1mlr11tUnGxt89Cw/8N0ha9YDhZ2LC+p8xMb9/hEdc+h4Ucu+br//JFXFNi5zKjz20KztiDzIMGFgzP+iZboQZbpSypsAgaeUjvfilqIEI9C9bf8rk3Wd8kz59sHV+BQysa8DA+vNe1+RreV94S96UiE9pff7/I1scPnlW6NWgBCLQvxKOVaeO2ZcfW2pbcogTGFgGwMD6+2/alP+rYhz+Na5O/L/lytT/F57t+t+/O+t/eL/uf/NsyR4G17oLBUD/Pgf69w3Qv6XILnqvbbT+nZre74RWlz8bL0/4v/HapP8g0LMn9X//nnSQAd8ZnKrPPJi85uJ/oH9f4opOn2rD/9uuzPmPDDZdmgoy4D+DQ8XxArvSww9sivYX4DLAMkf6e/eupP/tuxLAmtt3JiBcQEzqAypsCe7R+N+7KwVsM4gG8cFhQGwSBiruAOJPIGdD6Q6QOAAJO6JfeUJqowAAAABJRU5ErkJggg=="
}, {
  "_id": 7,
  "name": "Erich",
  "price": 208,
  "quantity": 7,
  "category": "Fire Sprinkler System",
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALvSURBVBgZBcFNaNUFAADw3//jbe/t6d6cc2/kUpeXsEgUsSSiKIzAQxDdvCgdulgagmBXLx4K7BgRWamnOgSDIj3EusRangwlbVvOyba25tvH23v/z36/oCxLcOr7uaO48sxA9Vg7LbTTQloUtrKihXUsI8cqVvAtfo4Biix78eDItmPnX90FADaTotFOisZqJx9NUta7udnlDT/+vXkc52KAIsua/T0BmHuSqwSBOCCK6a2E9vSGojBUiTg0WvNUoz74xeTjT0OAPE376zFZwXoSaKU86dLq0OqwssXSRg4uXn/o2Fjd80OVXTFAnqaD23tCm102O7kwDMSIIsKISCAKKBDka36bXnX7YetxDJAnSbNRi7S2Mu1uKQxLUUiYB6KQSCmKUEYW17o+u/lgDadigCxJ9jb7K1qdUgYlUR4IS+RsPfhFliaeGzkhr+SyJBv74aOX/wsB8qS7d6TRazMpBSFREAjWH0lmflV21lR7e/T19fl3acmbAw+9MzT7CQRlWXrr0k+1OArb3104bvKfVKEE6fSEffv2mZ+f12w2hWFodnbW6Oio8fFxRVHUY8i6ya56vSoMKKAkCAi279bpdCwvL5uYmFCr1Rw4cEC73Vav1786c+ZMO4Q86fbFCnFIFAYEoY17tzSiTcPDw+7fv+/1kxe9e/q8R/PzRkZG7N+///Tly5fL+JVz14dw6eizeyyslWYXc/UqnVZLFEWazabh4WG1Kv19lGVgfX3d3Nyc6elpcZ4kb+DEH3dnrG7FNrqlNC8V2UEjG/MGBxeMjY2ZHP/aVFDa8/RuKysr7ty58yUuxHmaHn77tRdqH598CQDkJde+mcKAhYUFRw4f1Ol0zMzMaDQa8F6tVns/ztN0ZmG55drNuwa21Qz0Vw3UezXqvQYGh1y9etUHH5419fukxcVFy2XTrVufl1mW3bxx40YeHDp5ZQjnsBc7sRM7sAONak+lUq1WHKrds7S05M/yyF84efva2Sn4HxcNUm7wsX3qAAAAAElFTkSuQmCC"
}, {
  "_id": 8,
  "name": "Kaitlin",
  "price": 404,
  "quantity": 8,
  "category": "Drilled Shafts",
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJfSURBVDjLpVNNiFJRFD6O4j8EMpoMTGU6LUbCMJAmmFzYQpjViIgkSNtoldDOzUCbCIJA2rlpNv4thiCY5dSmNJOiYhwRJ8nIMdT8/3nq7ZxH7/GaoE33cbjn3ne+737nnHtljDH4n6E4vZFMJg04RZB4C2cLznK0MtoLXD8JhUI/pPEyqQIEb2s0ml2n06kzGo2gVCr5/clkAo1GA/L5/KDf798Oh8MZEUQEZIlEwp3NZtlgMGAcx7HhcMja7TZrtVqs2+2y8XjMEMxisRgLBoNeAbdEJAjWa7XaXbvdDnK5HHq9HiABIBFMp1NAIDSbTcjlclCtVmGxWDwNBAJ6wi79FhJxOByrKpUKUAEFwHw+503w0+k0RKNR0Ol0YDAYqDb3RQIM8ppMJj5XCp7NZiIB+ZlMhurD+6VSCfR6Pcn3igS4cNHpo9FIBApGJwtgUnN4eAgUi75LbKPQCalsMjo5lUrx/4V9wRcwAkEOT9+gtlEaUrBARgD7nYsglylg+GlIsJy0Bvv1eh3UarUom8DSVOx3rWBZs8DKeTN8t/Gd2JfW4HGhUPhKLSuXy2LOvGz8Lt9bgwuWc2BdRhKTFZbNBhhutm+5H1xTijcxHo+7O53OQa1WA7wTUCwWoVKpgC28CiqTAs6eMYNt5RJM51M4/vYF8u/fjicT7uUfV9nv92/j+hn2WU/9ppqQClJWXT8Cz1UPT3Dw+hWcnDQ28g8/vJGdfo0+n8+AexF0tzDPdfRH6B+Pbvy84rl+E7g5B3vP9+Ddo4+yvx7Tv8bmjouhZODGdL05+Bw74gl+AetZvIbkaCwtAAAAAElFTkSuQmCC"
}, {
  "_id": 9,
  "name": "Sioux",
  "price": 824,
  "quantity": 9,
  "category": "Drywall & Acoustical (FED)",
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJcSURBVDjLfVPPaxNBFP5mtzVL0nhIA4mUmBaqB/WSUy459FBs6amIIv0DJBcR9GIOWqSI9JSjesjFi1eDoNBEsdEaEFsRD0EPLYKxNMREyY/NbvbH+GbdTdOWOvB4M7Pvfe9735tlnHOIZd24znHuAsxiEdw0wS0LtmHAdv3o/Dz4q3UEXq8xDK0RbzOcxIcSbXHv+b6Bw2sfwDAdEFvXnWAHSHh3P3IMgDQAoI+ckhGPwxIgZMJbmgY2PQ1b7VFM/z8M+saKpmnLzctX0AmOQZNlGIJ6uw3lVwORN28RpJhjAbbv3qlyVe2EJibGFDrbtg1PYALGJ1nuqLMz1aVDAEwEVSqVpGma+UgkEm1TxV6v5wAIkyQJPp/PsVKptKfr+mI6nf5wQAOimgmHw9FWqwVVVWHRBIQJANFGp9Nx7hOJRJTYZI6ISEEpwURUNoXqbnVhHli320UgEAAxSB1poVwuW7FYTKrX604ShjQYnD/mwbfy0Ks7sGT+g64eXiyYq46IfRqPFzzsB/ut5zhZfY+zV9PwTZ1H70shVnlXvF+cHe06LRCt5uBJu7179IXvbTzFmZlLULbXwZ4swb/zDJPxcZkzfnPEBdig/heF0s7sDzGRGjUo0Slg4db+/O+dgmyzScmd8+rm5uaeoijw+/0HNGCMgYfCUD+/AChJv83wm6xVqwstdplHPZfLXSMmK8lkMhoMBv+9TpdF4+VjnPi2htPj9E9IVbTrJr7XZMvQ+PIAQKxsNpskkAyJmiILCXGppSbZxtyf0q5S/7ogWyxOlX9S1qO5gvngL9401yPDHgg9AAAAAElFTkSuQmCC"
}, {
  "_id": 10,
  "name": "Jenine",
  "price": 192,
  "quantity": 10,
  "category": "RF Shielding",
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKUSURBVDjLhVNdSJNRGH6++enSTc3Rl9Y0KzRcoSHShURERRldlLGLMsqrCO2iLuwuL7qKLr0MoQvDHJigJkEbG5mGdzKU1PnvN7I2Fgu33Or7W+858YkrpRee8x7ec97n/TtHyGQyCAQCVtJXCS2GYdSQribQ1vhEeon0C0KgublZx18i+P3+43TJI0lSXVlZGWw2GwoKCsCINzY2kEwmEQ6HEYvFPpLtptvtXs9i8Pl872VZZuEyu4mqqplgMJh57O1Ya/e25jByExZaTpSWluJ/4nQ6kdZSTlXRAtvtIkXmTNPT07Db7RwlJSVYSS7infwGa8llaJoOTdXhLCwX7Zr97C3PdW9fy2BTFoHD4WB1IhKJIJH3HZPKBA4UOXHh4GXoGR0GQTd0vk+l0peuPW9aGm7zVolmLSyyKIoUTUMgPoN9uRIk635MRYNY+bYMVVFRXlTBz0PhBf/Ifd9FloHFzIAdULM4FhMh7jiyMIREfBOte9vwtLEL65+/anNyaFz5qTSdf3Y6P6sEXdc5CcO9Qw85UTQaRfJHktvYnTzFqpPzOV/HmEG+6awMzOgmyRahquHtlyF+p0FoTJCz/s8UGExHk1DRflHjDAxHBpBSNrldURQ0djaMUT/O0DgZuSyySPF4HPQS+QTS6fQfZksuBuQ+5BXlQFDzceflDWqkJh2tOCydqq/H7Pw8xsYnvILH47lC7P0ul8tWWVkJq9UKQRBw99VtFBcW4+Sx2q3xmeNcWl2F3z86qWv6I4Gl29vbe4RIOglui8VSzP4CK2dQfo09ksgf0kxoDhpPm/VG/0DOT1Z7wqOcYLt0d3cXknMVwaCmhjzRHi+l7pjqmq3b8Y1v/xg7ofZBTY6rvbp/t/PfI0AjgZ0qo+wAAAAASUVORK5CYII="
}]
