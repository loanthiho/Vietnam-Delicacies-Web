import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
export const addToCart = async (id_product: string, navigation: any) => {
  try {
    console.log('posting ...');
    const response = await axios.post(
      `http://nodejs-app-env-1.eba-q2t7wpq3.ap-southeast-2.elasticbeanstalk.com/carts/${id_product}`,
      null,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGE3ZmVkLTY2YzMtNGExYS1iNDdkLTU3MWM3YWFlYTQ0MyIsImVtYWlsIjoidGhpY3VzdG9tZXIuYTI0dGVjaG5vbG9neUBnbWFpLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJEZkbGVtY3MwV0E3WEx3YWRzTjBGMXVYbkFKV21zdEVQWjhSM3pLeHh2UWUvMFlGYVBRa1dLIiwibmFtZSI6InRoaSBjdXN0b21lciIsImlhdCI6MTcwOTIyMzQzNn0.QuQ2zXw7HFSQs2D_XFPl_m7eSUT4lVVpuM_E6Ey0UTg`,
        },
      },
    );
    if (response) {
      console.log('response', response.data.data);
      return navigation.navigate('Giỏ hàng');
    } else {
      console.log('can not add to cart ');
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchDataShoppingcart = async () => {
  const res = await axios.get(
    `http://nodejs-app-env-1.eba-q2t7wpq3.ap-southeast-2.elasticbeanstalk.com/carts`,
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGE3ZmVkLTY2YzMtNGExYS1iNDdkLTU3MWM3YWFlYTQ0MyIsImVtYWlsIjoidGhpY3VzdG9tZXIuYTI0dGVjaG5vbG9neUBnbWFpLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJEZkbGVtY3MwV0E3WEx3YWRzTjBGMXVYbkFKV21zdEVQWjhSM3pLeHh2UWUvMFlGYVBRa1dLIiwibmFtZSI6InRoaSBjdXN0b21lciIsImlhdCI6MTcwOTIyMzQzNn0.QuQ2zXw7HFSQs2D_XFPl_m7eSUT4lVVpuM_E6Ey0UTg`,
      },
    },
  );
  console.log('data res:', res.data);
  return res.data;
};

export const useShoppingCartData = () => {
  return useQuery('shoppingCartData', fetchDataShoppingcart);
};
