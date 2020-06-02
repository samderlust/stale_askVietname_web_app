
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { themes } from '../context/ThemeContext'

interface IProps {
    theme: themes
}
export const ThemeToggleButton = styled.button<any>`
    background-color: ${({ theme }: IProps) => theme === themes.light ? 'white' : 'black'};
`