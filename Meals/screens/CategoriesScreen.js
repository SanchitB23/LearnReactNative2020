import React from 'react';
import {FlatList} from 'react-native';
import {CATEGORIES} from "../data";
import CategoryGridTile from "../components/CategoryGridTile";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../containers/CustomHeaderButton";

const CategoriesScreen = props => {

      const renderGridItem = (itemData) => {
        return <CategoryGridTile itemData={itemData} onSelect={() => props.navigation.navigate({
          routeName: 'CategoryMeals',
          params: {categoryId: itemData.item.id}
        })}/>
      };

      return (
          <FlatList
              data={CATEGORIES}
              renderItem={renderGridItem}
              numColumns={2}
          />
      );
    }
;

CategoriesScreen.navigationOptions = navData => {
  return {
    headerLeft: () => <HeaderButtons title="NavBar" HeaderButtonComponent={CustomHeaderButton}>
      <Item title={"Menu"} iconName="menu" onPress={() => {
        navData.navigation.toggleDrawer()
      }}/>
    </HeaderButtons>
  }
};

export default CategoriesScreen;
