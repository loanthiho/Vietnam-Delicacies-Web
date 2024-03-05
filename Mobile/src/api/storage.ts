import AsyncStorage from '@react-native-async-storage/async-storage';

const setTotalPriceLocal = async (price: any) => {
  try {
    await AsyncStorage.setItem('totalPrice', JSON.stringify(price));
  } catch (error) {
    console.log('Error setting combine user data:', error);
  }
};

const getTotalPriceLocal = async () => {
  try {
    const result = await AsyncStorage.getItem('totalPrice');
    if (result) {
      return JSON.parse(result);
    }
    return null;
  } catch (error) {
    console.log('Error Error get total price:', error);
    return null;
  }
};

export {setTotalPriceLocal, getTotalPriceLocal};
