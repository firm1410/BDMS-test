import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { QuestionContext } from "../../context/QuestionContextRoot";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IResultList } from "../../models/ResultModel";
import Leaderboard from "./Leaderboard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  submit: {
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#494949",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    borderColor: "#f5f5f5",
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  submitText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF204E",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: 200,
    borderRadius: 20,
    padding: 10,
    margin: 5,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#FF204E",
  },
  buttonClose: {
    backgroundColor: "#f5f5f5",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonTextClose: {
    color: "#FF204E",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 40,
    textAlign: "center",
  },
  scoreText: {
    color: "#FF204E",
    fontSize: 60,
  },
  input: {
    width: 200,
    borderRadius: 20,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  leaderboardTable: {
    height: 200,
    width: 200,
    backgroundColor: "white",
  },
  LeaderboardRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  rank: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFC700",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF204E",
  },
  score: {
    fontSize: 20,
    color: "#000",
  },
});

const Result = () => {
  const { questions, refreshQuestion } = useContext(QuestionContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [leaderboard, setLeaderboard] = useState<IResultList | null>(null);
  const [name, setName] = useState("");
  const getResult = () => {
    return questions.reduce((acc, question) => {
      return question.select === question.answer ? acc + 1 : acc;
    }, 0);
  };
  const onClick = () => {
    setModalVisible(!modalVisible);
    getLeaderboard().then(setLeaderboard);
  };
  const setScore = async () => {
    try {
      const leaderboard = await AsyncStorage.getItem("leaderboard");
      if (leaderboard === null) {
        await AsyncStorage.setItem(
          "leaderboard",
          JSON.stringify([{ name, score: getResult(), id: 1 }])
        );
      } else {
        const leaderboardList: IResultList = JSON.parse(leaderboard);

        leaderboardList.push({
          name,
          score: getResult(),
          id: leaderboardList.length + 1,
          rank: leaderboardList.length + 1,
        });
        leaderboardList.sort((a, b) => b.score - a.score);
        leaderboardList.map((data, index) => {
          data.rank = index + 1;
        });
        await AsyncStorage.setItem(
          "leaderboard",
          JSON.stringify(leaderboardList)
        );
      }
      setName("");
      refreshQuestion();
      setModalVisible(!modalVisible);
    } catch (e) {
      // saving error
    }
  };
  const getLeaderboard = async (): Promise<IResultList> => {
    try {
      const jsonValue = await AsyncStorage.getItem("leaderboard");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getLeaderboard().then(setLeaderboard);
  }, []);

  const renderLeaderboard = () => {
    if (leaderboard === null) {
      return <ActivityIndicator />;
    }
    if (leaderboard.length === 0) {
      return <Text>No data</Text>;
    }
    return leaderboard?.map((data) => {
      return (
        <Leaderboard
          key={data.id}
          rank={data.rank}
          name={data.name}
          score={data.score}
        />
      );
    });
  };
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView style={styles.leaderboardTable}>
              <View style={styles.LeaderboardRow}>
                <Text style={styles.rank}>Rank</Text>
                <Text style={styles.name}>Name</Text>
                <Text style={styles.score}>Score</Text>
              </View>
              {renderLeaderboard()}
            </ScrollView>
            <Text style={styles.modalText}>Your Score is</Text>
            <Text style={[styles.modalText, styles.scoreText]}>
              {getResult()}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              onChangeText={setName}
              value={name}
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setScore()}
            >
              <Text style={styles.buttonText}>Save score</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonTextClose}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={onClick} style={styles.submit}>
        <Text style={styles.submitText}>Submit Answer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Result;
