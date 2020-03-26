import React from 'react';
import {Platform} from 'react-native';
import {HeaderButton} from "react-navigation-header-buttons";
import {MaterialIcons} from "@expo/vector-icons";
import colors from "../../constants/colors";

const CustomHeaderButton = (props) => {
  return <HeaderButton {...props} IconComponent={MaterialIcons} iconSize={23}
                       color={Platform.OS === 'android' ? 'white' : colors.primary}/>
};

export default CustomHeaderButton;
