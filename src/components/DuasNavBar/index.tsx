import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

interface DuasNavBarProps {
  toggleDuas: string;
  setToggleDuas: (value: string) => void;
  setActiveIndex: (value: number) => void;
}

const DuasNavBar: React.FC<DuasNavBarProps> = ({
  toggleDuas,
  setToggleDuas,
  setActiveIndex,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      }}>
      <View
        style={{
          borderRadius: 10,
          width: 70,
          alignItems: 'center',
          height: 30,
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor:
            toggleDuas === 'duas'
              ? 'rgba(255,255,255,0.3)'
              : 'rgba(255,255,255,0)',
        }}>
        <TouchableOpacity
          onPress={() => {
            setToggleDuas('duas');
            setActiveIndex(0);
          }}>
          <Text style={styles.menuText}>Duas</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: 90,
          alignItems: 'center',
          height: 30,
          borderRadius: 10,
          overflow: 'hidden',
          backgroundColor:
            toggleDuas === 'dhikr'
              ? 'rgba(255,255,255,0.3)'
              : 'rgba(255,255,255,0)',
        }}>
        <TouchableOpacity
          onPress={() => {
            setToggleDuas('dhikr');
            setActiveIndex(0);
          }}>
          <Text style={styles.menuText}>Dhikr</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuText: {
    fontSize: 23,
    fontFamily: 'Righteous_400Regular',
    color: 'white',
    textAlign: 'center',
  },
  separatorMain: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginTop: 5,
    width: 30,
    alignSelf: 'center',
    transform: [{rotate: '90deg'}],
  },
});

export default DuasNavBar;
