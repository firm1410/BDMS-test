import { Text, TextStyle, TouchableOpacity } from "react-native";
import React, { FC, useContext } from "react";
import { QuestionContext } from "../../../../context/QuestionContextRoot";
import { SelectType } from "../../../../models/QuestionModels";

interface IChoice {
  children: React.ReactNode;
  active: boolean;
  id: number;
  choice: SelectType;
}

const choiceStyle = (active): TextStyle => ({
  borderColor: "#c2c2c2",
  borderWidth: 1,
  borderRadius: 10,
  color: active ? "#f5f5f5" : "#000",
  backgroundColor: active ? "#FF204E" : "#f5f5f5",
  padding: 5,
  paddingLeft: 10,
  margin: 10,
  fontSize: 16,
});

const Choice: FC<IChoice> = ({ children, active, id, choice }) => {
  const { chooseAnswer } = useContext(QuestionContext);

  const onClick = () => {
    chooseAnswer(id, choice);
  };
  return (
    <TouchableOpacity onPress={onClick}>
      <Text style={choiceStyle(active)}>{children}</Text>
    </TouchableOpacity>
  );
};
export default Choice;
