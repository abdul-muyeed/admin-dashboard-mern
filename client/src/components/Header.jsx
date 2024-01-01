import { Box, Typography, useTheme } from "@mui/material"


// eslint-disable-next-line react/prop-types
export default function Header({title, subtitle}) {
    const theme = useTheme()
  return (
    <Box textAlign={'left'}>
        <Typography variant="h2" color={theme.palette.secondary[100]} fontWeight={'bold'} sx={{mb: '5px'}}>
            {title}
        </Typography>
        <Typography variant="h5" color={theme.palette.secondary[300]} fontWeight={'bold'}>
            {subtitle}
        </Typography>
    </Box>
  )
}
