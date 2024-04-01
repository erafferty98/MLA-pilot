'use client'
import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Grid,
  Title,
  Flex,
  Center,
  Group,
  ActionIcon,
  Alert,
} from '@mantine/core';
import {
  IconArrowLeft,
  IconArrowRight,
  IconInfoCircle,
} from '@tabler/icons-react';
import moment from 'moment';
import { UpdateContext } from '../../context/UpdateContextProvider';
import DateSelect from '../DateSelect';
import classes from './Journal.module.css';
import { fetchExercises } from '../../utils/requests';
import JournalEntry, { EmptyJournalEntry } from './JournalEntry';
import Spinner from '../Spinner';
import { getCurrentUser } from '../../utils/sessionStorage';

const Journal = ({ height }) => {
  const defaultDateValue = new Date();
  defaultDateValue.setDate(defaultDateValue.getDate() - 7);
  const [value, setValue] = useState<[Date | null, Date | null]>([
    moment().subtract(7, 'days').toDate(),
    new Date(),
  ]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { update } = useContext(UpdateContext);

  const incrementDate = () => {
    const newStartDate = moment(value[0]).add(7, 'days').toDate();
    const newEndDate = moment(newStartDate).add(7, 'days').toDate();
    setValue([newStartDate, newEndDate]);
  };

  const decrementDate = () => {
    const newStartDate = moment(value[0]).subtract(7, 'days').toDate();
    const newEndDate = moment(newStartDate).add(7, 'days').toDate();
    setValue([newStartDate, newEndDate]);
  };

  useEffect(() => {
    const startDate = value[0];
    const endDate = value[1];
    const currentUser = getCurrentUser();
  
    // Define a boolean variable to check if all necessary values are present
    const shouldFetchData = startDate != null && endDate != null && currentUser != null;
  
    if (shouldFetchData) {
      setLoading(true);
      setError(false);
  
      // Fetch exercises only if all required values are present
      fetchExercises(startDate, endDate, currentUser)
        .then((data) => {
          if (data === undefined) {
            setData([]);
            setError(true);
          } else {
            setData(data);
          }
        })
        .catch((error) => {
          console.error('Error fetching exercises:', error);
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [value, getCurrentUser(), update]);
  
  const JournalEntries =
    data.length !== 0 ? (
      data.map((item, index) => {
        return <JournalEntry key={index} entry={item} />;
      })
    ) : (
      <EmptyJournalEntry />
    );

  return (
    <Box className={classes.container} h={height}>
      <Grid justify="center">
        <Grid.Col span={{ base: 0, sm: 1, md: 4 }}></Grid.Col>
        <Grid.Col span={{ base: 5, sm: 5, md: 4 }} h={'8rem'}>
          <Flex align={'center'} h={'100%'} w={'100%'} justify={'center'}>
            <Title order={2} className={classes.title}>
              Journal
            </Title>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 6, sm: 5, md: 4 }}>
          <Flex align={'center'} h={'100%'} w={'100%'} justify={'center'}>
            <DateSelect value={value} setValue={setValue} />
          </Flex>
        </Grid.Col>
      </Grid>
      <Center>
        <hr className={classes.horizontalDivider} />
      </Center>

      <Flex direction="column" align="center">
        {loading ? <Spinner /> : JournalEntries}
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
      <Group className={classes.navArrowsGroup}>
        <ActionIcon variant="transparent" size={36} onClick={decrementDate}>
          <IconArrowLeft size={36} color="white" />
        </ActionIcon>
        <ActionIcon variant="transparent" size={36} onClick={incrementDate}>
          <IconArrowRight size={36} color="white" />
        </ActionIcon>
      </Group>
    </Box>
  );
};

export default Journal;