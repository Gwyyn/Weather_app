import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const Cross = () => {
    return (
        <View>
            <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M15.75 15.75L9 9M9 9L2.25 2.25M9 9L15.7501 2.25M9 9L2.25 15.7501" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        </View>
    )
}

export default Cross
