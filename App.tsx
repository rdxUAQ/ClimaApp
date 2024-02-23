import React, {useState, useEffect} from 'react';


import {
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
} from 'react-native';

export default App = () => {
  const [city, setCity] = useState('Santiago de queretaro');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const[backgroundColorS, setBackgroundColor] = useState('#071952');
  
  const getBackgroundColor = (text) => {
    const conditionText = text;
    switch (conditionText) {
      case 'Sunny':
        setBackgroundColor('#00A9FF');
        break;

      case 'Partly cloudy':
        setBackgroundColor('#CDF5FD');
        break;

        default:
          setBackgroundColor('#071952');
          break;
    }
  }

  const fetchWeatherData = async () => {
    const API_KEY = '1e942fdf233545d395d191605242102';
    try {
      const res = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=yes&alerts=no`,
      );
      const data = await res.json();
      setWeatherData(data);
      getBackgroundColor(data.current.condition.text);
    } catch (err) {
      console.error(err.message);
      setError(err);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData;
    }
  }, [city]);

  

  

  return (
    
    <SafeAreaView style={[styles.container, {backgroundColor : backgroundColorS}]}>
      
        <View style={styles.container}>
        
        
        {weatherData && (
          <View style={styles.weatherView}>
            <Text style={styles.weatherCity}>{weatherData.location.name}</Text>
            <Text style={styles.weatherC}>{weatherData.current.temp_c} C°</Text>
            <Text style={styles.weatherCondition}>{weatherData.current.condition.text}</Text>
            {}
            <Image style={styles.weatherIcon} source={{uri: weatherData.current.condition.icon.replace('//','https://')}}/>
          </View>
        )}
        
        
      </View>
    


      <View style={styles.bottom}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your location"
        placeholderTextColor = "white"
        value = {city}
        onChangeText={text => {
          setCity(text);
        }}
        />
        <TouchableOpacity style={styles.button} onPress={fetchWeatherData}>
          <Text style={styles.weatherButtonText}>🔎</Text>
        </TouchableOpacity>
        {error && (
          <Text>{error}</Text>
      )}
      </View>
      
      
    </SafeAreaView>
    
    
  );
};



const styles = StyleSheet.create({
  home:{
    flex:1,
    
  },
  container: {
    flex: 1,
    
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom:{
    
    backgroundColor: "rgba(0, 0, 0,0.9)",
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    
    
    
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#000',
    marginHorizontal: 0,
    marginBottom: 20,
    marginTop: 0,
  },
  textInput: {
    color: 'white',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
    padding: 5,
    marginBottom: 15,
    marginTop: 15,
    marginLeft: 20,
    width: 250,
    height: 40,
  },
  button: {
    borderWidth: 2,
    borderColor: 'white',
    width: 55,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  weatherButtonText: {
    color: '#ffff',
    fontSize: 16,
    textAlign: 'center',
  },
  weatherView: {
    backgroundColor:'rgba(82, 92, 235,0.5)',
    borderRadius: 10,
    
    padding: 21,
    marginHorizontal: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherC:{
    color: '#FFF6E9',
    fontSize: 89,
    textAlign: 'center',
  },
  weatherCity: {
    color: '#FFF6E9',
    fontSize: 21,
    textAlign: 'center',
  },
  weatherCondition: {
    color: '#FFF6E9',
    fontSize: 21,
    textAlign: 'center',
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },

  
});