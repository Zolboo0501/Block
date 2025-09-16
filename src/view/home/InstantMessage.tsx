/* eslint-disable react-native/no-inline-styles */
import TextView from 'components/TextView';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const InstantMessage: React.FC<any> = ({ data, onSend }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.center}>
        <TextView center>
          Charon, your personal concierge – How may I assist you today?
        </TextView>
      </View>
      <View style={styles.column}>
        {data.map((item: any, index: number) => (
          <TouchableOpacity
            key={index}
            style={styles.select}
            onPress={() =>
              onSend(
                item?.config?.conditions?.[0]?.conditions?.[0]?.keywords?.[0]
                  ?.text,
              )
            }
          >
            <TextView>
              {
                item?.config?.conditions?.[0]?.conditions?.[0]?.keywords?.[0]
                  ?.text
              }
            </TextView>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default InstantMessage;

const styles = StyleSheet.create({
  center: { alignSelf: 'center', width: '80%' },
  column: {
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '8%',
  },
  select: {
    backgroundColor: '#333333',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 18,
  },
});
