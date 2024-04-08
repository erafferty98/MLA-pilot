import { useState } from 'react'
import { UnstyledButton, Menu, Group, Text, Flex } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { exercises } from '../../utils/exercises';
import React from 'react'; // Add this line to import React

import classes from './ExercisePicker.module.css';

const ExercisePicker = ({ setValue, name }: any) => { // Add type annotation to the 'item' parameter

  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(exercises[0]);

  const handleSelect = (item: any) => { // Add type annotation to the 'item' parameter
    setSelected(item.label || item);
    setValue(name, item.label || item);
    setOpened(false);
  };

  const renderItems = () => {
    const items = exercises; // Replace 'exerciseTypes' with 'exercises'
    return items.map((item: any) => ( // Add type annotation to the 'item' parameter
      <Menu.Item
        onClick={() => handleSelect(item)}
        key={item.label || item}
      >
        <Group gap="xs">
          {item.icon && React.createElement(item.icon)}
        </Group>
      </Menu.Item>
    ));
  };

return (
  <>
    <Flex justify="flex-start" w={'100%'} pt={'1rem'}>
      <Text className={classes.label}>Select Exercise</Text>
    </Flex>
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={classes.control}
          data-expanded={opened || undefined}
        >
          <Group gap="xs">
            {selected.icon && React.createElement(selected.icon)}
            <span className={classes.label}>{selected.label}</span>
          </Group>
          <IconChevronDown
            size="1rem"
            className={classes.icon}
            stroke={1.5}
          />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{renderItems()}</Menu.Dropdown>
    </Menu>
  </>
);
};
export default ExercisePicker;
