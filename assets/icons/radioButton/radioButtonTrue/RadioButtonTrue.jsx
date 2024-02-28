import React from 'react';
import {View} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';

const RadioButtonTrue = () => {
    return (
        <View>
            <Svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Circle cx="9" cy="9.5" r="8.5" stroke="black"/>
                <Path fillRule="evenodd" clipRule="evenodd" d="M13.8535 7.14644C14.0488 7.34171 14.0488 7.65829 13.8535 7.85355L9.2071 12.5C8.81658 12.8905 8.18342 12.8905 7.7929 12.5L5.64645 10.3535C5.45119 10.1583 5.45119 9.8417 5.64645 9.64645C5.84171 9.4512 6.15829 9.4512 6.35355 9.64645L8.5 11.7929L13.1465 7.14644C13.3417 6.95119 13.6583 6.95119 13.8535 7.14644Z" fill="black"/>
            </Svg>
        </View>
    )
}

export default RadioButtonTrue
