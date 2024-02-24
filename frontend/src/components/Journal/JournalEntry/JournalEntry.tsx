import { Box, Flex, Grid, Text } from '@mantine/core'
import classes from './JournalEntry.module.css'
import { data } from '../../../utils/exercises'

const JournalEntry = ({ entry }: { entry: JournalEntryType }) => {
  return (
    <Box className={classes.container}>
      <Grid>
        <Grid.Col span={4}>
          <Flex align="center" justify="center" h={'100%'}>
            {data.find((item) => item.label === entry.exerciseType).icon}
          </Flex>
        </Grid.Col>
        <Grid.Col span={4}>
          <Flex align="center" justify="center" h={'100%'}>
            <Text>{entry.exerciseType}</Text>
          </Flex>
        </Grid.Col>
        <Grid.Col span={4}>
          <Flex align="center" justify="center" h={'100%'}>
            <Text>{`${entry.totalDuration} minutes`}</Text>
          </Flex>
        </Grid.Col>
      </Grid>
    </Box>
  )
}

export default JournalEntry
