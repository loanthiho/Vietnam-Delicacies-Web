import React, {useEffect} from 'react';
import {getUserAccessToken} from '../api/storage';

const CheckAuth = ({navigation}: {navigation: any}) => {
  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const getUser = await getUserAccessToken();
        if (!getUser) {
          console.log("User doesn't have an account");
          navigation.navigate('SignIn');
        } else {
          console.log('User data:', getUser);
          console.log('User accepted');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        // Handle error if necessary
      }
    };

    checkUserAuth();
  }, [navigation]);

  // You can return a loading indicator or something else if needed
  return null;
};

export default CheckAuth;
