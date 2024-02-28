import React from 'react';
import {Image, View} from "react-native";

const GetWeatherImg = ({weatherData}) => {
const commonCondition = weatherData?.mostCommonCondition
    if (commonCondition === 'Clouds')
        return <View><Image source={require('../../assets/icons/weather/cloudiness/clouds.png')}/></View>
    else if (commonCondition === 'Clear')
        return <View><Image source={require('../../assets/icons/weather/sunny/sunny.png')}/></View>
    else if (commonCondition === 'Rain')
        return <View><Image source={require('../../assets/icons/weather/rainy/rainy.png')}/></View>
    else if (commonCondition === 'Thunderstorm')
        return <View><Image source={require('../../assets/icons/weather/thunderstorm/thunder.png')}/></View>
    else if (commonCondition === 'Snow')
        return <View><Image source={require('../../assets/icons/weather/frost/frost.png')}/></View>

};

export default GetWeatherImg;