import React, {useState} from 'react';
import {Button, FlatList, StyleSheet, View} from 'react-native';
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const addGoalHandler = (enteredGoal) => {
    setCourseGoals(currentGoals => [...currentGoals, {key: (currentGoals.length + 1).toString(), value: enteredGoal}])
    setModalVisibility(false)
  };

  const onDeleteHandler = (index) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter(goal => {
        return goal.key !== index
      })
    })
  };

  return (
      <View style={styles.screen}>
        <Button title="Add New Goal" onPress={() => setModalVisibility(true)}/>
        <GoalInput addGoal={addGoalHandler} modalVisibility={modalVisibility}
                   onCancel={() => setModalVisibility(false)}/>
        <FlatList data={courseGoals}
                  renderItem={itemData => <GoalItem title={itemData.item.value}
                                                    onDelete={() => onDeleteHandler(itemData.item.key)}/>}/>
      </View>
  );
}

const styles = StyleSheet.create({
  screen: {padding: 100}
});
