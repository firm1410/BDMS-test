import { View, Text, StyleSheet } from "react-native";
import React, { FC } from "react";
import Choice from "./Choice";
import { SelectType } from "../../../models/QuestionModels";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",

    shadowColor: "#494949",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    borderColor: "#c2c2c2",
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
  },
  choice: {
    borderColor: "#c2c2c2",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    fontSize: 16,
  },
});
interface IQuestionProps {
  id: number;
  question: string;
  A: string;
  B: string;
  C: string;
  D: string;
  select: SelectType;
}
const Question: FC<IQuestionProps> = ({ A, B, C, D, question, id, select }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {++id}:{question}
      </Text>
      <Choice active={select === "A"} id={id} choice="A">
        A:{A}
      </Choice>
      <Choice active={select === "B"} id={id} choice="B">
        B:{B}
      </Choice>
      <Choice active={select === "C"} id={id} choice="C">
        C:{C}
      </Choice>
      <Choice active={select === "D"} id={id} choice="D">
        D:{D}
      </Choice>
    </View>
  );
};

export default Question;
