'use client'
import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, Title, Flex, Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { getCurrentUser } from '../../utils/sessionStorage';
import { UpdateContext } from '../../context/UpdateContextProvider';
import classes from './Progress.module.css';
import { fetchStatistics } from '../../utils/requests';
import Spinner from '../Spinner';
import ProgressBar, { EmptyProgressBar } from './ProgressBar';

const Progress = ({ height }) => {
  const [data, setData] = useState<any[]>([]); // Add type annotation for data array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [maxDuration, setMaxDuration] = useState(0);
  const { update } = useContext(UpdateContext);

  const ProgressBars =
    data.length !== 0 ? (
      data.map((item, index) => {
        return <ProgressBar key={index} entry={item} max={maxDuration} index={index} />;
      })
    ) : (
      <EmptyProgressBar />
    );

  useEffect(() => {
    setMaxDuration(
      data.reduce(
        (acc, item) => (acc > item.totalDuration ? acc : item.totalDuration),
        0
      )
    );
  }, [data]);

  useEffect(() => {
    const currentUser = getCurrentUser();
  
    // Check if currentUser is not null before proceeding
    if (currentUser != null) {
      setLoading(true);
      setError(false);
  
      fetchStatistics(currentUser)
        .then((data) => {
          if (data === undefined) {
            setData([]);
            setError(true);
          } else if (data.length === 0) {
            setData([]);
          } else {
            setData(data[0].exercises);
          }
        })
        .catch((error) => {
          console.error('Error fetching statistics:', error);
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [getCurrentUser(), update]);
  
  

  return (
    <Box className={classes.container} h={height}>
      <Grid justify="center">
        <Grid.Col span={{ base: 0, sm: 1, md: 4 }}></Grid.Col>
        <Grid.Col span={{ base: 5, sm: 5, md: 4 }} h={'5rem'}>
          <Flex align={'center'} h={'100%'} w={'100%'} justify={'center'}>
            <Title order={2} pt={'1rem'} className={classes.title}>
              Progress
            </Title>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 0, sm: 1, md: 4 }}></Grid.Col>
      </Grid>

      <Flex direction="column" align="center">
        {loading ? <Spinner /> : ProgressBars}
        {error && (
          <Alert
            variant="light"
            color="white"
            title="An error occurred"
            icon={<IconInfoCircle />}
            classNames={{
              root: classes.alertRoot,
              message: classes.alertMessage,
            }}
            w={'80%'}
          >
            Looks like there was an error fetching your data. Please try
            refreshing the page.
          </Alert>
        )}
      </Flex>
    </Box>
  );
};

export default Progress;
