import { ScrollView, StyleSheet, RefreshControl, View } from "react-native";
import React, { FC, useCallback, useContext, useState } from "react";
import Question from "./Question";
import { QuestionContext } from "../../context/QuestionContextRoot";
import Result from "../Result";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
});
const QuestionList: FC = () => {
  const { questions, refreshQuestion } = useContext(QuestionContext);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      refreshQuestion();
      setRefreshing(false);
    }, 100);
  }, []);

  return (
    <View>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {questions.map((question) => (
          <Question key={question.id} {...question} />
        ))}
      </ScrollView>
      <Result />
    </View>
  );
};

export default QuestionList;
