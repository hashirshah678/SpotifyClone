import {
  Image,
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import HomeIcon from '../../assets/icons/home.png';
import SearchIcon from '../../assets/icons/search.png';
import LibraryIcon from '../../assets/icons/library.png';
import HomeFocusedIcon from '../../assets/icons/home_focused.png';
import SeacrhFocusedIcon from '../../assets/icons/search_focused.png';
import LibraryFocusedIcon from '../../assets/icons/library_focused.png';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors, Fonts} from '../../utils/Constants';
import {fontR} from '../../utils/Scaling';
import CustomText from '../../component/ui/CustomText';

interface TabProps {
  name: string;
}

interface IconProps {
  focusedIcon: boolean;
}

const styles: ImageStyle = {
  width: RFValue(18),
  height: RFValue(18),
};

const tabStyles: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const textStyleInActive: TextStyle = {
  textAlign: 'center',
  marginTop: 4,
  color: Colors.inactive,
  fontSize: fontR(9.5),
};

const textStyleActive: TextStyle = {
  textAlign: 'center',
  marginTop: 4,
  color: Colors.text,
  fontSize: fontR(9.5),
};

const TabIcon: FC<TabProps> = ({name}) => {
  return (
    <View style={tabStyles}>
      <Image
        source={
          name === 'Home'
            ? HomeIcon
            : name === 'Search'
            ? SearchIcon
            : LibraryIcon
        }
        style={[styles]}
      />
      <CustomText fontFamily={Fonts.Bold} style={textStyleInActive}>
        {name}
      </CustomText>
    </View>
  );
};

const TabIconFocused: FC<TabProps> = ({name}) => {
  return (
    <View style={tabStyles}>
      <Image
        source={
          name === 'Home'
            ? HomeFocusedIcon
            : name === 'Search'
            ? SeacrhFocusedIcon
            : LibraryFocusedIcon
        }
        style={[styles]}
      />
      <CustomText fontFamily={Fonts.Bold} style={textStyleActive}>
        {name}
      </CustomText>
    </View>
  );
};

export const HomeTabIcon:FC<IconProps> = ({focusedIcon})=>{
    return focusedIcon ? <TabIconFocused name="Home" /> : <TabIcon  name="Home"/>;
};
export const SearchTabIcon:FC<IconProps> = ({focusedIcon})=>{
    return focusedIcon ? <TabIconFocused name="Search" /> : <TabIcon  name="Search"/>;
};
export const LibraryTabIcon:FC<IconProps> = ({focusedIcon})=>{
    return focusedIcon ? <TabIconFocused name="Library" /> : <TabIcon  name="Library"/>;
};
