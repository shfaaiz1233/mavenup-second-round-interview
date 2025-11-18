import type { ThemeColors } from '@/theme/types';
import { StyleSheet } from 'react-native';

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    inputLabel: {
      paddingBottom: 4,
      fontWeight: '600',
      fontSize: 15,
      color: colors.onPrimary,
      alignSelf: 'flex-start',
    },
    inputContent: {
      height: 55,
      color: colors.onPrimary,
    },
    inputText: {
      fontSize: 13,
      fontWeight: '600',
      height: 48,
      borderRadius: 10,
      color: 'red',
      textAlignVertical: 'center',
      textAlign: 'left',
    },
    errorText: {
      fontSize: 12,
      marginTop: 4,
      textAlign: 'left',
    },
  });
export default createStyles;
