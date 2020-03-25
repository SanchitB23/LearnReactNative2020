import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../containers/CustomHeaderButton";
import colors from "../constants/colors";
import {useDispatch} from "react-redux";
import {setFilters} from "../store/actions/mealsActions";

const FilterSwitch = props => (
    <View style={styles.filterContainer}>
      <Text style={{color: 'black'}}>{props.label}</Text>
      <Switch value={props.value} onValueChange={props.onChange}
              trackColor={{true: colors.secondaryColor}} thumbColor={colors.primaryColor}/>
    </View>
);

const FiltersScreen = (props) => {

  const {navigation} = props;

  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const dispatch = useDispatch();

  const saveFilter = useCallback(() => {
    const appliedFilters = {
      isGlutenFree,
      isLactoseFree,
      isVegan,
      isVegetarian
    };
    dispatch(setFilters(appliedFilters))

  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

  useEffect(() => {
    navigation.setParams({save: saveFilter})
  }, [saveFilter]);

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Available Filters</Text>
        <FilterSwitch label='Gluten-free' value={isGlutenFree} onChange={newVal => setIsGlutenFree(newVal)}/>
        <FilterSwitch label='Lactose-free' value={isLactoseFree} onChange={newVal => setIsLactoseFree(newVal)}/>
        <FilterSwitch label='Vegan' value={isVegan} onChange={newVal => setIsVegan(newVal)}/>
        <FilterSwitch label='Vegetarian' value={isVegetarian} onChange={newVal => setIsVegetarian(newVal)}/>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center'
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 15
  }
});

FiltersScreen.navigationOptions = navData => {
  return {
    headerLeft: () => <HeaderButtons title="NavBar" HeaderButtonComponent={CustomHeaderButton}>
      <Item title={"Menu"} iconName="menu" onPress={() => {
        navData.navigation.toggleDrawer()
      }}/>
    </HeaderButtons>,
    headerRight: () => <HeaderButtons title="NavBar" HeaderButtonComponent={CustomHeaderButton}>
      <Item title={"Save"} iconName="save" onPress={navData.navigation.getParam('save')}/>
    </HeaderButtons>
  }
};


export default FiltersScreen;
