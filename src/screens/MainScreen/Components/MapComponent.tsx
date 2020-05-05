import React, { useState, useEffect } from 'react';

import { View, StyleSheet, BackHandler, Dimensions } from 'react-native';
import { IMainRoute } from '../Types/navigation';
import MapView, { LatLng, Marker } from 'react-native-maps';
import { ListItem, Text, Icon, Button } from '@ui-kitten/components';

const MapComponent: React.SFC<IMainRoute["Map"]> = ({ navigate, previous, toggleLogoHeader }) => {

  BackHandler.addEventListener("hardwareBackPress", () => {
    navigate("Map", previous);
    return true;
  });

  useEffect(() => {
    const initialMarker = {
      latitude: -9.669969,
      longitude: -35.71947,
    }
  
    const generatedMarkers: LatLng[] = []
  
    for (let i = 0; i < 20; ++i) {
      const randomLat = initialMarker.latitude + Math.random() * 0.1
      const randomLong = initialMarker.longitude +  Math.random() * -0.05
  
      generatedMarkers.push({
        latitude: randomLat,
        longitude: randomLong
      })
    }

    setMarkers(generatedMarkers)
  }, [])

  const [markers, setMarkers] = useState<LatLng[]>([])
  const [selectedMarker, setSelectedMarker] = useState<number>()
  
  const renderConfirmIcon = (props: any) => (
    <Icon
    {...props}
      name="car"
      fill="black"
    />
  );

  return (
    <View style={styles.root}>
      <MapView
            style={styles.map}
            initialRegion={{
              latitude: -9.669969,
              longitude: -35.71947,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
        >
          {markers.map((el, index) => {
            console.log(el)
            return (<Marker
            coordinate={el}
            title={`Ponto de Entrega ${index + 1}`}
            onPress={() => setSelectedMarker(index + 1)}
            /> )
          })}
        </MapView>

        <View style={styles.confirmView}>
        <ListItem
      activeOpacity={1}
      style={{...styles.listItem}}
      title={() => (
        <Text category="h4" style={{ marginLeft: 10 }}>
          {selectedMarker ? `Local ${selectedMarker}` : "Quase lá..."}
        </Text>
      )}
      description={() => (
        <Text category="s2" style={{ marginLeft: 10, color: "#858585" }}>
          {selectedMarker ? `Agendar entrega para Distribuição ${selectedMarker}?` : `Selecione um ponto de entrega`}
        </Text>
      )}
      accessoryLeft={renderConfirmIcon}
      accessoryRight={() => (
        <Button 
          onPress={() => {}}
        disabled={!selectedMarker}
        style={{
          borderRadius: 30
        }}>Confirmar</Button>
      )}
    />
        </View>
    </View>
  )
}

const { height } = Dimensions.get('screen')

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    width: '100%',
    height: height - 65,
    backgroundColor: 'red',
  },
  map: {
    flex: 1
  },
  list: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgb(247, 249, 252)",
    borderTopColor: "#e6e6e6",
    borderTopWidth: 1,
    elevation: 2,
  },
  listItem: {
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "rgb(247, 249, 252)",
  },
  itemIconRight: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
    marginRight: 5,
  },
  avatar: {
    margin: 8,
    borderRadius: 15,
  },
  confirmView: {
    width: "100%",
    backgroundColor: "rgb(247, 249, 252)",
    borderTopColor: "#e6e6e6",
    borderTopWidth: 1,
    elevation: 10,
  },
})

export default MapComponent;
