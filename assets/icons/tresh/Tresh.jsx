import React from 'react';
import {View} from 'react-native';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

const QRCodeIcon = () => {
    return (
        <View>
            <Svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <G clipPath="url(#clip0_12_174)">
                    <Path d="M18 0.5H0V18.5H18V0.5Z" fill="white"/>
                    <Path d="M3.75 6.125H14.25L13.5 16.25H4.5L3.75 6.125Z" stroke="#E72E2E" stroke-linejoin="round"/>
                    <Path d="M11.625 7.625L11.25 14.75" stroke="#E72E2E" stroke-linecap="round" stroke-linejoin="round"/>
                    <Path d="M9 7.625V14.75" stroke="#E72E2E" stroke-linecap="round" stroke-linejoin="round"/>
                    <Path d="M6.375 7.625L6.75 14.75" stroke="#E72E2E" stroke-linecap="round" stroke-linejoin="round"/>
                    <Path d="M12 4.25H14.25C15.0784 4.25 15.75 4.92157 15.75 5.75V6.125H2.25V5.75C2.25 4.92157 2.92157 4.25 3.75 4.25H6M12 4.25L11.25 2.75H6.75L6 4.25M12 4.25H6" stroke="#E72E2E" stroke-linejoin="round"/>
                </G>
                <Defs>
                    <ClipPath id="clip0_12_174">
                        <Rect width="18" height="18" fill="white" transform="translate(0 0.5)"/>
                    </ClipPath>
                </Defs>
            </Svg>

        </View>
    )
}

export default QRCodeIcon
