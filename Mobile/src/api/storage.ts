import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserAccessToken = async () => {
  try {
    const result = await AsyncStorage.getItem('user');
    if (result) {
      return JSON.parse(result);
    }
    return null;
  } catch (error) {
    console.log('Error getting data user:', error);
    return null;
  }
};

const setUserAccessToken = async (data: any) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(data));
  } catch (error) {
    console.log('Error setting data user:', error);
  }
};

const setDataCombine = async (data: any) => {
  try {
    await AsyncStorage.setItem('userCBData', JSON.stringify(data));
  } catch (error) {
    console.log('Error setting combine user data:', error);
  }
};

const getUserCombineData = async () => {
  try {
    const result = await AsyncStorage.getItem('userCBData');
    if (result) {
      return JSON.parse(result);
    }
    return null;
  } catch (error) {
    console.log('Error getting combine data:', error);
    return null;
  }
};
export {
  getUserAccessToken,
  setUserAccessToken,
  setDataCombine,
  getUserCombineData,
};
