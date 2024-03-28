import { StyleSheet, Text, View } from "react-native";
import QuestionList from "./components/QuestionList";
import QuestionContextRoot from "./context/QuestionContextRoot";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: "#dbdbdb",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "#FF204E",
    width: "100%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f5f5f5",
  },
});

export default function App() {
  return (
    <QuestionContextRoot>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Questions</Text>
        </View>
        <QuestionList />
      </View>
    </QuestionContextRoot>
  );
}
