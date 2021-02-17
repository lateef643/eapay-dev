import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';


export const useMediaQueries = (scale, value) => {
    const theme = useTheme();
    if(scale === 'up') {
        const matches = useMediaQuery(theme.breakpoints.up(value))
        return matches
    } 
    if (scale === 'down') {
        const matches = useMediaQuery(theme.breakpoints.down(value))
        return matches
    }

    return matches
}