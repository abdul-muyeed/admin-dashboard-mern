
import { useGetGeographyQuery } from "../state/api"
import Header from "../components/Header"
import { geoData } from "../state/geoData"
import { Box, useTheme } from "@mui/material"
import { ResponsiveChoropleth } from '@nivo/geo'

export default function Geography() {
    const theme =  useTheme()
    const {data, isLoading} = useGetGeographyQuery()
    console.log('data', data);
    if(isLoading && !data) return <div>Loading...</div>
  return (
    <Box m='1.5rem 2.5rem'>
        <Header title={"GEOGRAPHY"} subtitle={'Find your location'}></Header>
        <Box mt={'40px'} 
            height={'75vh'}
            border={`1px solid ${theme.palette.secondary[200]}`}
            borderRadius={'4px'}



        >
         <ResponsiveChoropleth
        data={data}
        theme={{
            axis:{
                domain:{
                    line:{
                        stroke: theme.palette.secondary[200]
                    }
                },
                legend:{
                    text:{
                        fill: theme.palette.secondary[200]
                    }
                }
            }
        }}
        features={geoData.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        domain={[ 0, 1000000 ]}
        unknownColor="#aaaaaa"
        label="properties.name"
        valueFormat=".2s"
        projectionScale={140}
        projectionTranslation={[ 0.5, 0.5 ]}
        projectionRotation={[ 0, 0, 0 ]}
        enableGraticule={true}

        borderWidth={0.5}
        borderColor="#ffffff"
        
        
        legends={[
            {
                anchor: 'bottom-left',
                direction: 'column',
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: '#444444',
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: 'black',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />   
        </Box>

    </Box>
  )
}
