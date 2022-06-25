import React, { useEffect, useState } from "react";
import { StyleSheet,Text, Pressable,ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../api/api";

export default function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    api
      .get()
      .then((res) => {
        setFilmes(res.data);
      })
      .catch((e) => console.log(e));
    setLoading(false);
  }, []);

  return (


    <View style={styles.container}>
      <ScrollView 
            style={styles.scroll}
            showsVerticalScrollIndicator={false}>
    <>
      {loading === false &&
        filmes.map((filme) => {
          return (
            
              <View
                key={filme.id}
                style={styles.filme}
              >
                <Text  style={styles.tituloTexto}>{filme.nome}</Text>
                <Pressable
                  onPress={() => {
                    navigation.navigate("Detalhes", { filme: filme });
                  }}
                >
                  <Text style={{ color: "blue",fontSize: 20, }}>Sinopse</Text>
                </Pressable>
              </View>
              
          );
        })}
    </>
    </ScrollView>
    </View>
  );
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tituloTexto:{
    fontSize: 30,
    marginBottom:30,
    color:'red',
    fontWeight: "bold",
    paddingTop:30,
  },
  

  filme:{
    display: "flex",
    justifyContent: "space-between",
    marginVertical: 6,
    paddingHorizontal: 16,
   },

   scroll:{
    flex: 1,
    width: 320,
   },


});