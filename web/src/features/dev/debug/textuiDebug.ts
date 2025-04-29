import { TextUiProps } from '../../dev/types/textuiTypes';
import { debugData } from '../../../utils/debugData';

export const debugTextUI = () => {
  debugData<TextUiProps>([
    {
      action: 'textUi',
      data: {
        keybind: 'E',
        text: 'Access locker inventory',
        position: 'right',
      },
    },
  ]);
};