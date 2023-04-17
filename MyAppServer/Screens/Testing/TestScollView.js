
import React, { useRef } from 'react'
import { Animated, SafeAreaView, ScrollView, View } from 'react-native';
export default TestCamera = () => {


    const animatedValue = useRef(new Animated.Value(0)).current;

    return (
        <SafeAreaView>
            <Animated.View
                style={{
                    width: '100%', height: 100,
                    backgroundColor: '#19b5fe',
                    opacity: animatedValue.interpolate({
                        inputRange: [-1, 100],
                        outputRange: [1, 0],
                    }),
                }}
            />
            <ScrollView

                onScroll={e => {
                    animatedValue.setValue(e.nativeEvent.contentOffset.y)
                }}
                scrollEventThrottle={16}
            >
                <View style={{ height: 10000 ,borderColor:'black',borderWidth:5,backgroundColor:'pink'}} />
            </ScrollView>
        </SafeAreaView>
    );

}