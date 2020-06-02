import posed from 'react-pose';

interface IAnimatedProps {
    num: number
}

const BottomeSlideUp = posed.div({
    hide: {
        bottom: ({ num }: IAnimatedProps) => -200 + num,
    },
    show: {
        bottom: ({ num }: IAnimatedProps) => 0 + num,
    }
})

export default BottomeSlideUp;