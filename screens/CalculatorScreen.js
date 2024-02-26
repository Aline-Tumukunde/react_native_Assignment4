import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

const CalculatorScreen = ({ input, setInput, result, setResult, onButtonPress }) => {
  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', 'C', '=', '+'
  ];

  return (
    <View style={styles.calculatorContainer}>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{result}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          value={input}
          onChangeText={setInput}
          keyboardType='numeric'
        />
      </View>
      <View style={styles.buttonContainer}>
        {buttons.map((item, index) => (
          <TouchableOpacity key={index} style={styles.button} onPress={() => onButtonPress(item)}>
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const CalculatorApp = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const onButtonPress = (value) => {
    switch (value) {
      case '=':
        try {
          setResult(eval(input).toString());
        } catch (error) {
          setResult('error');
        }
        break;
      case 'C':
        setInput('');
        setResult('');
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar = input.slice(-1);
        if (['+', '-', '*', '/'].includes(lastChar)) {
          setInput((prevInput) => prevInput.slice(0, -1) + value);
        } else {
          setInput((prevInput) => prevInput + value);
        }
        break;
      default:
        setInput((prevInput) => prevInput + value);
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <CalculatorScreen
        input={input}
        setInput={setInput}
        result={result}
        setResult={setResult}
        onButtonPress={onButtonPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calculatorContainer: {
    width: 350, // Set your desired width
    height: 500, // Set your desired height
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
  },
  resultContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  resultText: {
    fontSize: 40,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  inputText: {
    fontSize: 30,
  },
  buttonContainer: {
    flex: 7,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  button: {
    width: '22%',
    height: '18%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    margin: '1%',
    marginVertical: '1%',
  },
  buttonText: {
    fontSize: 24,
  },
});

export default CalculatorApp;
