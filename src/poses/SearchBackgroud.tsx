import posed from 'react-pose';

interface IAnimatedProps {
  bg: string;
  num: number;
}

export const SearchBackground = posed.div({
  onFocus: {
    // background: ({ bg }: IAnimatedProps) => `rgba(176,87,0,${bg})`,
    // width: '100%',
    height: '100%'
  },
  onBlur: {
    // background: ({ bg }: IAnimatedProps) => `rgba(176,87,0,${bg})`,
    // width: 0,
    height: 0
  }
});
