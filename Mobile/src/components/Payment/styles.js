import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 5,
    marginTop: 20,
    padding: 10,
    borderColor: 'white',
    elevation: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 30,
  },
  itemImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  content: {
    alignSelf: 'center',
    gap: 10,
  },
  itemText: {
    maxWidth: 140,
    marginRight: 10,
    fontSize: 20,
    borderRadius: 10,
    color: '#FFA000',
  },
  itemPrice: {
    marginRight: 40,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
    borderRadius: 5,
    color: '#FFFFFF',
    backgroundColor: '#FFA000',
  },
  arrowLeft: {
    fontSize: 30,
  },
  TitleAddress: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFA000',
  },
  OrderDetails: {
    paddingLeft: 20,
    paddingTop: 20,
    fontSize: 18,
    color: '#FFA000',
  },
  button: {
    width: 20,
    height: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    bottom: 5,
  },
  btn: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  BtnTotal: {
    fontSize: 20,
  },
  numAlltotal: {
    fontWeight: 'bold',
    color: '#FFA000',
    fontSize: 25,
  },
  BtnShow: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
    fontSize: 20,
    color: 'white',
    backgroundColor: '#2E7D32',
    borderRadius: 10,
  },
  AddressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 25,
  },
  AddressNum: {
    fontSize: 16,
  },
  Address: {
    fontSize: 16,
  },
  AddressIcon: {
    fontSize: 20,
    alignSelf: 'center',
  },
  infOrder: {
    padding: 10,
    marginTop: 5,
  },
  detailOrder: {
    fontSize: 18,
    color: '#FFA000',
  },
  groupPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 18,
  },
  totalPrice: {
    fontWeight: 'bold',
  },
  toggleButton: {
    alignItems: 'center',
    borderRadius: 10,
    width: 50,
    height: 30,
    bottom: 35,
    left: 300,
  },
  toggleButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default styles;
