import { useState } from 'react'
import { UnstyledButton, Menu, Group, Text, Flex, Box } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import { exercises } from '../../utils/exercises'
import classes from './ExercisePicker.module.css'

const ExercisePicker = ({ onChange, name, value }) => {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(exercises[0]);

  const setSelectedWider = (value) => {
    setSelected(value);
    onChange(value); // Call the onChange prop with the selected value
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelected(subcategory);
    onChange(subcategory); // Call the onChange prop with the selected value
    setOpened(false); // Close the dropdown after selecting a subcategory
  };

  const renderSubcategories = () => {
    if (selected.subsections && selected.subsections.length > 0) {
      return selected.subsections.map((subsection) => (
        <Menu.Item
          onClick={() => handleSubcategorySelect(subsection)}
          key={subsection.label}
        >
          {subsection.label}
        </Menu.Item>
      ));
    }
    return null;
  };

  const items = exercises.map((item) => (
    <Menu.Item
      leftSection={React.createElement(item.icon)} // Dynamically create the icon component
      onClick={() => setSelectedWider(item)}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));


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
              {selected.icon && <selected.icon />}
              <span className={classes.label}>{selected.label}</span>
            </Group>
            <IconChevronDown
              size="1rem"
              className={classes.icon}
              stroke={1.5}
            />
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          {items}
          {renderSubcategories()}
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default ExercisePicker;
