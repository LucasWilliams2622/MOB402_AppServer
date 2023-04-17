import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {  
    fetch('http://172.23.16.1:3000/api/category/get-all-category')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View>
      {categories.map(category => (
        <Text key={category._id}>{category.name}</Text>
      ))}
    </View>
  );
};

export default CategoryList;
