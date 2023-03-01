import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: 'skyblue',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: 'skyblue',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#73CED6",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20
  },
  points : {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 15,
    textAlign: 'center'
  },
  dicePoints: {
    flexDirection: 'row',
    width: 280,
    alignContent: 'center'
  },
  home: {
    fontSize: 17 ,
    alignSelf: 'center'
  },
  homeOkButton: {
    backgroundColor:'#39b2ee',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  playerTextInput: {
    alignSelf: 'center',
    width: 80,
    margin:10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  rulesTitle: {
    fontSize: 18,
    fontWeight:'bold',
    alignSelf: 'center',
    marginBottom: 5
  },
  rules: {
    textAlign:'center',
    marginRight: 7,
    marginLeft: 7,
    marginTop: 10
  },
  infoIcon: {
    color: '#39b2ee',
    alignSelf: 'center',
    marginBottom: 20
  },
  glPLayer: {
    fontSize: 20,
    alignSelf: 'center',
    margin: 10,
  },
  total: {
    fontSize: 30,
    margin: 15
  }
})