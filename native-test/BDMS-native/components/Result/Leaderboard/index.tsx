import { View, Text, StyleSheet } from "react-native";
import React from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flexGrow: 1,
    gap: 20,
  },
  rank: {
    flex: 1,
    fontSize: 20,
    color: "#FFC700",
  },
  name: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF204E",
  },
  score: {
    flex: 1,
    fontSize: 20,
    textAlign: "right",
    color: "#000",
  },
});
const Leaderboard = ({ rank, name, score }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.rank}>{rank}</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.score}>{score}</Text>
    </View>
  );
};

export default Leaderboard;
