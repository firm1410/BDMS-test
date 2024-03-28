import { FC, ReactNode, createContext, useMemo, useState } from "react";
import { IQuestion, SelectType } from "../models/QuestionModels";
import questionsJSON from "../constants/questions.json";

export const QuestionContext = createContext<{
  questions: IQuestion[];
  refreshQuestion: () => void;
  chooseAnswer: (id: number, choice: SelectType) => void;
}>({ questions: [], chooseAnswer: () => {}, refreshQuestion: () => {} });

const QuestionContextRoot: FC<{ children: ReactNode }> = ({ children }) => {
  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questionsJSON.length);
    return questionsJSON[randomIndex];
  };
  const random20Questions = () =>
    Array.from({ length: 20 }).map((_value, index) => {
      const randomQuestion = getRandomQuestion();
      return {
        ...randomQuestion,
        id: index,
        select: "" as SelectType,
      };
    });
  const [questions, setQuestions] = useState<IQuestion[]>(random20Questions);

  const refreshQuestion = () => {
    setQuestions(random20Questions);
  };
  const chooseAnswer = (id: number, choice: SelectType) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === id - 1 ? { ...question, select: choice } : question
      )
    );
  };

  const value = useMemo(() => {
    return {
      questions,
      chooseAnswer,
      refreshQuestion,
    };
  }, [questions, chooseAnswer, refreshQuestion]);

  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
};
export default QuestionContextRoot;
