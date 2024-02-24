import {
  Box,
  Grid,
  Title,
  Flex,
  Center,
  Group,
  ActionIcon,
} from '@mantine/core'
import { useState, useEffect, useContext } from 'react'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'

import { AuthContext } from '../../context/AuthContextProvider'
import DateSelect from '../DateSelect'
import classes from './Journal.module.css'
import { fetchExercises } from '../../utils/requests'
import JournalEntry from './JournalEntry'
import Spinner from '../Spinner'
import moment from 'moment'

const Journal = () => {
  const defaultDateValue = new Date()
  defaultDateValue.setDate(defaultDateValue.getDate() - 7)
  const [value, setValue] = useState<[Date | null, Date | null]>([
    moment().subtract(7, 'days').toDate(),
    new Date(),
  ])
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const { currentUser } = useContext(AuthContext)
  const incrementDate = () => {
    const newStartDate = moment(value[0]).add(7, 'days').toDate()
    const newEndDate = moment(newStartDate).add(7, 'days').toDate()
    setValue([newStartDate, newEndDate])
  }
  const decrementDate = () => {
    const newStartDate = moment(value[0]).subtract(7, 'days').toDate()
    const newEndDate = moment(newStartDate).subtract(7, 'days').toDate()
    setValue([newStartDate, newEndDate])
  }

  const JournalEntries = data.map((item, index) => {
    return <JournalEntry entry={item} />
  })

  useEffect(() => {
    setLoading(true)
    fetchExercises(value[0], value[1], currentUser).then((data) => {
      setData(data)
      setLoading(false)
    })
  }, [value, currentUser])

  return (
    <Box className={classes.container}>
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
  )
}

export default Journal
