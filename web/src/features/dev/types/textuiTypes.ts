import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { IconAnimation } from '../../../components/LibIcon';

export type TextUiPosition = 'right' | 'left';

export interface TextUiProps {
  keybind: string;
  text: string;
  position?: TextUiPosition;
  style?: React.CSSProperties;
}