'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import BookStatistics from './components/dashboard/BookStatistics';
import OuvrageList from './components/dashboard/OuvrageList';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          
          <Grid item xs={12} lg={12}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <BookStatistics />
              </Grid>
              
            </Grid>
          </Grid>
          
          <Grid item xs={12} lg={12}>
            <OuvrageList />
          </Grid>
       
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
