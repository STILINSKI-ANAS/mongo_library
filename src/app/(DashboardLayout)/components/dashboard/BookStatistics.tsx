import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar, Card, CardContent } from '@mui/material';
import { IconBook, IconNews, IconArrowUpLeft } from '@tabler/icons-react';

const StatisticsCard = ({ title, count, icon, growth }) => {
  const theme = useTheme();
  const successlight = theme.palette.success.light;

  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: successlight, width: 56, height: 56 }}>
            {icon}
          </Avatar>
          <Stack>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="h3" fontWeight="700">
              {count}
            </Typography>
            <Stack direction="row" spacing={1} mt={1} alignItems="center">
              <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
                <IconArrowUpLeft width={20} color="#39B69A" />
              </Avatar>
              <Typography variant="subtitle2" fontWeight="600">
                {growth.toFixed(2)}%
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                since last 24 hours
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

const BookStatistics = ({ statistics }) => {
  if (!statistics) {
    return <div></div>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <StatisticsCard
          title="Total Books"
          count={statistics.totalBooks}
          icon={<IconBook width={40} color="#39B69A" />}
          growth={statistics.growth.books}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatisticsCard
          title="Total Periodicals"
          count={statistics.totalPeriodicals}
          icon={<IconNews width={40} color="#39B69A" />}
          growth={statistics.growth.periodicals}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatisticsCard
          title="Recent Additions"
          count={statistics.recentAdditions}
          icon={<IconBook width={40} color="#39B69A" />}
          growth={statistics.growth.additions}
        />
      </Grid>
    </Grid>
  );
};

export default BookStatistics;
