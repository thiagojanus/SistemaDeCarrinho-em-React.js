import React, { useState } from 'react';
import { StyleSheet, Button, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';

const FoodItem = ({ item, onAddToCart, inCart }) => {
  return (
    <View style={styles.foodItemContainer}>
      <Image source={{ uri: item.image }} style={styles.foodImage} />
      <View style={styles.foodDetails}>
        <Text style={styles.foodName}>{item.name}</Text>
        <TouchableOpacity
          style={[styles.addToCartButton, inCart && styles.inCartButton]}
          onPress={() => {
            onAddToCart(item);
          }}
        >
          <Text style={styles.addToCartButtonText}>
            {inCart ? 'Remover do Carrinho' : 'Adicionar ao Carrinho'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Receita = () => {
  const [cart, setCart] = useState([]);

  const foodItems = [
    { id: 1, name: 'Hambúrguer', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTENYnRh013tE7LrJCY-j0pTDFoJzJZtAx8qw&s' },
    { id: 2, name: 'Pizza', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv72nHmvm63MsC-qxPTz5xUR0zUjEZyhsCdw&s' },
    { id: 3, name: 'Salada', image: 'https://img.band.uol.com.br/image/2023/09/25/salada-1549_800x450.webp' },
    { id: 4, name: 'Sushi', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEZu6QLDwHZcs6rv_4HFpDpxHm76qY8lfyAg&s' },
    { id: 5, name: 'Lasanha', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ-inDS2Kz0Z8omoTLw_LVDuXvX845CtUOYg&s' },
  ];

  const handleAddToCart = (item) => {
    if (cart.some(i => i.id === item.id)) {
      setCart(cart.filter(i => i.id !== item.id));
    } else {
      setCart([...cart, item]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nome da Receita</Text>
      <FlatList
        data={foodItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FoodItem item={item} onAddToCart={handleAddToCart} inCart={cart.some(i => i.id === item.id)} />
        )}
        contentContainerStyle={styles.foodList}
      />
      <View style={styles.cartContainer}>
        <Text style={styles.cartTitle}>Carrinho</Text>
        {cart.length === 0 ? (
          <Text style={styles.cartEmpty}>Carrinho vazio</Text>
        ) : (
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Text style={styles.cartItem}>{item.name}</Text>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  foodList: {
    paddingVertical: 12,
  },
  foodItemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  foodDetails: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addToCartButton: {
    backgroundColor: '#2980B9',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  inCartButton: {
    backgroundColor: '#27AE60',
  },
  addToCartButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cartContainer: {
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cartEmpty: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  cartItem: {
    fontSize: 16,
    marginVertical: 4,
  },
});

export default Receita;