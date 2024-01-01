
import { Box, Button, Card, CardActions, CardContent, Collapse, Rating, Typography, useMediaQuery } from '@mui/material';
import Header from '../components/Header.jsx';
import { useGetProductsQuery } from '../state/api.js';
import { useTheme } from '@mui/material'
import { useState } from 'react';

const Product = ({
    _id,
    name,
    description,
    price,
    rating,
    category,
    supply,
    stats

}) => {
    const theme =  useTheme()
    const [isExpanded, setIsExpanded] = useState(false)
    return(
        <Card
        sx={{
            backgroundImage:"none",
            backgroundColor: theme.palette.background.alt,
            borderRadius: "0.55rem"
        }}
        >
            <CardContent>
                
            <Typography sx={{fontSize: 14}} color={theme.palette.secondary[700]} gutterBottom>
                    {category}
                </Typography>
                <Typography variant='h5' component={'div'}>
                    {name}
                </Typography>
                <Typography sx={{md: "1.5rem"}} color={theme.palette.secondary[400]}>
                    ${Number(price).toFixed(2)}
                </Typography>
                <Rating value={rating} readOnly></Rating>
                <Typography variant='body2' font>
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant='primary'
                    size='small'
                    onClick={()=> setIsExpanded(!isExpanded)}
                >See More</Button>
            </CardActions>
            <Collapse
                in={isExpanded}
                timeout={'auto'}
                unmountOnExit
                sx={{
                    color: theme.palette.neutral[300]
                }}
            >
            <CardContent>
                <Typography>id: {_id}</Typography>
                <Typography>Supply Left: {supply}</Typography>
                <Typography>Yearly Sales This Year: {stats[0].yearlySalesTotal}</Typography>
                <Typography>Yearly Units Sold This Year: {stats[0].yearlyTotalSoldUnits}</Typography>
                
            </CardContent>

            </Collapse>

        </Card>
    )
}
export default function Products() {
    const {data, isLoading} = useGetProductsQuery()
    const isNonMobile = useMediaQuery('(min-width:1000px)');

    if( !data || isLoading) return <div>Loading...</div>
    console.log('data', data[0]);

    
  return (
    <Box m={'1.5rem 2.5 rem'}>
        <Header title={"Products"} subtitle={"See your list of products."}></Header>
        <Box mt={'20px'} display={'grid'} gridTemplateColumns={'repeat(4,minmax(0, 1fr))'} justifyContent={'space-between'} rowGap={'20px'} columnGap={'1.33%'} sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : 'span 4'}
        }}>
            {data.map(({
                _id,
                name,
                description,
                price,
                rating,
                category,
                supply,
                stats
            })=> (<Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stats={stats}
                />))}
        </Box>
    </Box>
  )
}
