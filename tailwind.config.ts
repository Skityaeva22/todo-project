/* eslint-env node */
import { getIconCollections, iconsPlugin } from '@egoist/tailwindcss-icons'
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    colors: {
      main_blue: '#409EFF',
      main_success: '#67C23A',
      main_warning: '#E6A23C',
      main_danger: '#F56C6C',
      main_info: '#909399',
      primary_text: '#303133',
      regular_text: '#606266',
      secondary_text: '#909399',
      placeholder_text: '#A8ABB2',
      disabled_text: '#C0C4CC',
      darker_border: '#CDD0D6',
      dark_border: '#D4D7DE',
      base_border: '#DCDFE6',
      light_border: '#E4E7ED',
      lighter_border: '#EBEEF5',
      extra_light_border: '#F2F6FC',
      darker_fill: '#E6E8EB',
      dark_fill: '#EBEDF0',
      base_fill: '#F0F2F5',
      light_fill: '#F5F7FA',
      lighter_fill: '#FAFAFA',
      extra_light_fill: '#FAFCFF',
      white: '#FFFFFF',
      black: '#000000',
      page_background: '#F2F3F5',
    },
    fontFamily: {
      Inter: ['Inter'],
      Manrope: ['Manrope'],
      Roboto: ['Roboto'],
      Noto: ['Noto Sans SC'],
      'DM Sans': ['DM Sans'],
    },
  },
  plugins: [
    iconsPlugin({
      collections: getIconCollections(['mdi']),
    }),
  ],
} as Config
