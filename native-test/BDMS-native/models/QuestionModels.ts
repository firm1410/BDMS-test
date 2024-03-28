export type SelectType = "A" | "B" | "C" | "D" | "";
export interface IQuestion {
  id: number;
  question: string;
  A: string;
  B: string;
  C: string;
  D: string;
  answer: string;
  select: SelectType;
}
export interface IChoice {
  choice: string;
}
export interface IQuestionList {
  questions: IQuestion[];
}
