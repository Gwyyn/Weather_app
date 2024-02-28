import React from 'react';
import {TouchableOpacity} from "react-native";
import Svg, {Path} from "react-native-svg";

const Pencil = ({onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M12.4331 4.79331L4.51981 12.7067C3.81315 13.42 1.69981 13.7466 1.18648 13.2733C0.673146 12.7999 1.04647 10.6867 1.75313 9.97333L9.66647 2.05999C10.0319 1.712 10.5189 1.52064 11.0234 1.52679C11.5279 1.53294 12.0101 1.73611 12.3669 2.09291C12.7237 2.44971 12.9269 2.93187 12.933 3.43641C12.9392 3.94097 12.7478 4.42792 12.3998 4.79331H12.4331Z" stroke="#939393" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <Path d="M13 13.5H7" stroke="#939393" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        </TouchableOpacity>
    );
};

export default Pencil;