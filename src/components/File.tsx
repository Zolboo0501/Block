/* eslint-disable react-native/no-inline-styles */
import { ExcelIcon, FileIcon, PdfIcon, WordIcon } from '@icons';
import { getAttachmentUrl } from '@utils';
import React from 'react';
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import TextView from './TextView';
import useAlert from 'hooks/useAlert';

const File: React.FC<any> = ({ att }) => {
  const alert = useAlert();
  const url = getAttachmentUrl(att?.url);
  const renderIcon = () => {
    if (att?.type?.includes('pdf')) {
      return <PdfIcon />;
    }
    if (att?.type?.includes('word')) {
      return <WordIcon />;
    }
    if (att?.type?.includes('excel')) {
      return <ExcelIcon />;
    }
    return <FileIcon />;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        Linking.openURL(url).catch(err => alert.onError(err.message))
      }
    >
      <View style={styles.icon}>{renderIcon()}</View>
      <View style={{ gap: 5 }}>
        <TextView fontSize={14}>{att?.name}</TextView>
        <TextView fontSize={13} fontWeight={'500'}>
          {(att?.size / 1024).toFixed(2) + ' KB'}
        </TextView>
      </View>
    </TouchableOpacity>
  );
};

export default File;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 5,
    backgroundColor: '',
  },
  icon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: '#EAECF0',
  },
});
