import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

const App = () => {
  const [amount, setAmount] = useState('');
  const [bills, setBills] = useState([]);

  const CalcDivisaoCell = () => {
    const value = parseInt(amount);
    if (isNaN(value) || value % 10 !== 0 || value <= 0) {
      alert("Por favor, o número inserido tem que obrigatóriamente ser (Multiplo de 10)");
      return;
    }

    const cedulas = [50, 20, 10];
    const result = [];

    let remainingValue = value;

    cedulas.forEach(cedula => {
      const count = Math.floor(remainingValue / cedula);
      if (count > 0) {
        result.push({ cedula, count });
        remainingValue -= count * cedula;
      }
    });

    setBills(result);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Caixa Eletrônico</Text>
      <Text style={styles.description}>Digite o valor a ser retirado (múltiplo de 10): </Text>
      <TextInput
        style={styles.input}
        placeholder="Valor a ser retirado"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Calcular Cédulas" onPress={CalcDivisaoCell} />
      <FlatList
        data={bills}
        keyExtractor={(item) => item.cedula.toString()}
        renderItem={({ item }) => (
          <Text style={styles.billText}>
            {item.count} cédulas de R${item.cedula}
          </Text>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma cédula necessária.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#48D1CC',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    marginBottom: 20,
    color: 'blue',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100',
    paddingHorizontal: 10,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#191970',
  },
  billText: {
    fontSize: 18,
    color: 'green',
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default App;