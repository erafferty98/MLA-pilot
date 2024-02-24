import { Box, Flex, Grid, Progress, Text, px } from '@mantine/core'
import { exercises } from '../../../utils/exercises'
import classes from './ProgressBar.module.css'

const ProgressBar = ({ entry, max, index }) => {
  const exercise = exercises.find((item) => item.label === entry.exerciseType)
  return (
    <Box className={classes.container} key={`progress-${index}`}>
      <Grid>
        <Grid.Col span={4}>
          <Flex align="center" justify="center" h={'100%'}>
            {<exercise.icon color="white" size={'32px'} />}
          </Flex>
        </Grid.Col>
        <Grid.Col span={4}>
          <Flex align="center" justify="center" h={'100%'}>
            <Box w={'100%'}>
              <Progress
                value={(entry.totalDuration / max) * 100}
                color={exercise.color}
              />
            </Box>
          </Flex>
        </Grid.Col>
        <Grid.Col span={4}>
          <Flex align="center" justify="center" h={'100%'}>
            <Text c="white" fw={500}>{`${entry.totalDuration} minutes`}</Text>
          </Flex>
        </Grid.Col>
      </Grid>
    </Box>
  )
}

export default ProgressBar
