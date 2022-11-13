import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import DefaultCounterCard from './Home/DefaultCounterCard';
import BiotechIcon from '@mui/icons-material/Biotech';
export const SpecicesCounter = (props) => (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent >
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
       
           <DefaultCounterCard
           
            count={props.counter}
            suffix="+"
            title="Species"
            description="From teknaf to tetulia"
            // actionIcon={
            //   <IconButton 
            //   sx={{ color: "white" }}
            //   >
            //     < BiotechIcon   sx={{ fontSize: "40px" }} />
            //   </IconButton>
            // }
            // backgroundColor="#0f4c39"
          
          />
{/*        
       <DefaultCounterCard
            
            count={2000}
            suffix="+"
            // title="Species"
            // description="From teknaf to tetulia"
            // actionIcon={
            //   <IconButton 
            //   sx={{ color: "white" }}
            //   >
            //     < BiotechIcon   sx={{ fontSize: "40px" }} />
            //   </IconButton>
            // }
            // backgroundColor="#0f4c39"
          
          /> */}
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'white',
              height: 70,
              width: 70
            }}
          >
            <BiotechIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ArrowDownwardIcon color="error" />
        <Typography
          color="error"
          sx={{
            mr: 1
          }}
          variant="body2"
        >
          12%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
);