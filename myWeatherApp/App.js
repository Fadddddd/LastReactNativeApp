/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  TextInput,
  ActivityIndicator,
  View,
} from 'react-native';

import axios from 'axios';

const styles = StyleSheet.create({
root: {
  flex : 1,
},
image: {
  flex : 1,
  flexDirection: 'column',
},
textInput: {
borderBottomWidth: 3,
padding: 5,
paddingVertical: 20,
marginVertical: 100,
marginHorizontal: 10,
backgroundColor: '#fff',
fontSize: 19,
borderRadius: 16,
borderBottomColor: "#df8e00"

}
});


const App = () => {
  const [input, setInput] = useState ("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState ([]);
  

const API = {
key: '377033de1ffa48f4f164793563f371cc',
baseUrl: 'https://api.openweathermap.org/data/2.5/'
};

const fetchDataHandler = useCallback ({}=>{
  setLoading(true);
  setInput("");
  axios({
    method: "GET",
    url: `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`
  })
  .then(res =>{
    console.log(res.data);
    setData(res.data);
  })
  .catch(e=>console.dir(e))
  .finally(()=>setLoading(false));
}, [api.key.input]);

  return (
    <View style={styles.root}>
      <ImageBackground source={require('./assets/sea.jpg')}
      resizeMide="cover"
      style={styles.image}>
        <View>
          <TextInput placeholder='Enter city name and press return...'
          onChangeText={text=>setInput(text)}
          value={input}
          placeholderTextColor={'#000'}
          style={styles.textInput}
          onSubmitEditing={fetchDataHandler}/>
      </View>
      {loading && ( 
      <View>
        <ActivityIndicator size= {'large'} color='#000'/>
        </View>
      )}

      {data && 
      <View style={styles.infoView}>
        <Text style={styles.cityCountryText}>{`${data?.name} ${data?.sys?.country}`}</Text></View>}
      </ImageBackground>
    </View>
  );
};


export default App;
