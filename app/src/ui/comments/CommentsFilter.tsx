import React, { useState } from "react";

import {
  Panel,
  VStack,
  HStack,
  Text,
  Select,
  Icon,
  Checkbox,
  HRule,
  Button,
  CollapsibleSection,
} from "../components";
import Icons from "../app/Icons";

const CommentsFilter = ({ touchpoints, experienceThemes, onChange }) => {
  return (
    <Select
      css={{ zIndex: 100 }}
      trigger={() => {
        return <SelectTrigger />;
      }}
      content={(onClose) => {
        return (
          <Filter
            touchpoints={touchpoints}
            experienceThemes={experienceThemes}
            onApply={() => {
              onClose();
            }}
            onChange={onChange}
          />
        );
      }}
    />
  );
};

const SelectTrigger = ({}) => {
  return (
    <HStack
      css={{
        cursor: "pointer",
        color: "$ppForest",
        padding: "$1",
        width: "100px",
        boxSizing: "border-box",
        gap: "$2",
      }}
    >
      <Icon
        icon={Icons.Slider}
        css={{ fontSize: "15px", display: "inline-block", mx: "$1" }}
      />

      <Text css={{ color: "$ppForest" }}>Filter</Text>
    </HStack>
  );
};

const Filter = ({ touchpoints, experienceThemes, onApply, onChange }) => {
  const [touchpointISChecked, setTouchpointISChecked] = useState(true);
  const [overallISChecked, setOverallISChecked] = useState(true);
  const [threeWordsISChecked, setThreeWordsISChecked] = useState(true);

  const [localTouchpoints, setLocalTouchpoints] = useState(touchpoints);
  const [localExperienceThemes, setLocalExperienceThemes] =
    useState(experienceThemes);

  React.useEffect(() => {
    handleChange();
  }, [
    localTouchpoints,
    localExperienceThemes,
    touchpointISChecked,
    overallISChecked,
    threeWordsISChecked,
  ]);

  const handleChange = () => {
    onChange({
      overall: overallISChecked,
      threeWords: threeWordsISChecked,
      includeTouchpoints: touchpointISChecked,
      touchpoints: localTouchpoints.filter((tp) => tp.checked),
      experienceThemes: localExperienceThemes.filter((et) => et.checked),
    });
  };

  const handleClearFilters = () => {
    setTouchpointISChecked(true);
    setOverallISChecked(true);
    setThreeWordsISChecked(true);
    handleAllChange(localTouchpoints, true, setLocalTouchpoints);
    handleAllChange(localExperienceThemes, true, setLocalExperienceThemes);
  };

  const handleAllChange = (arr, checked, setMethod) => {
    const newArray = arr.map((v) => {
      return {
        ...v,
        checked,
      };
    });
    setMethod(newArray);
  };

  const handleAllTouchpoints = (checked: boolean) => {
    handleAllChange(localTouchpoints, checked, setLocalTouchpoints);
  };

  const handleAllExperienceThemes = (checked: boolean) => {
    handleAllChange(localExperienceThemes, checked, setLocalExperienceThemes);
  };

  const handleCheckboxSetChange = (value, checked, arr, setMethod) => {
    let newArr = arr.map((v) => {
      if (v.value === value) {
        return { ...v, checked };
      }
      return v;
    });
    setMethod(newArr);
  };

  const handleTouchpointChange = (value, checked) => {
    handleCheckboxSetChange(
      value,
      checked,
      localTouchpoints,
      setLocalTouchpoints
    );
  };

  const handleExperienceThemeChange = (value, checked) => {
    handleCheckboxSetChange(
      value,
      checked,
      localExperienceThemes,
      setLocalExperienceThemes
    );
  };

  return (
    <Panel
      css={{
        position: "absolute",
        top: "30px",
        right: "-100px",
        width: "400px",
        p: "$3",
        zIndex: 100,
      }}
    >
      <VStack css={{ gap: "$4" }}>
        <Text.H3>Filter comments</Text.H3>
        <VStack>
          <Checkbox
            label="Touchpoint improvement suggestion"
            checked={touchpointISChecked}
            onCheckedChange={(checked) => {
              setTouchpointISChecked(checked);
            }}
          />

          <CollapsibleSection
            open={touchpointISChecked}
            css={{ marginLeft: "$5" }}
          >
            <CheckboxSection
              title="Touchpoints"
              options={localTouchpoints}
              handleAllChange={handleAllTouchpoints}
              handleOneChange={handleTouchpointChange}
            />
            <CheckboxSection
              title="Experience Themes"
              options={localExperienceThemes}
              handleAllChange={handleAllExperienceThemes}
              handleOneChange={handleExperienceThemeChange}
            />
          </CollapsibleSection>
        </VStack>
        <Checkbox
          label="Overall improvement suggestion"
          checked={overallISChecked}
          onCheckedChange={(checked) => {
            setOverallISChecked(checked);
          }}
        />
        <Checkbox
          label="What are 3 words to describe your experience?"
          checked={threeWordsISChecked}
          onCheckedChange={(checked) => {
            setThreeWordsISChecked(checked);
          }}
        />
        <HRule />
        <HStack css={{ justifyContent: "end", gap: "$2" }}>
          <Button css={{ width: "120px" }} onClick={handleClearFilters}>
            Clear Filters
          </Button>
          <Button.Primary
            css={{ width: "120px" }}
            onClick={() => {
              onApply();
            }}
          >
            Done
          </Button.Primary>
        </HStack>
      </VStack>
    </Panel>
  );
};

const CheckboxSection = ({
  title,
  options,
  handleAllChange,
  handleOneChange,
}) => {
  return (
    <>
      <HStack
        css={{
          justifyContent: "space-between",
          borderBottom: "1px solid $grey2",
          my: "$2",
        }}
      >
        <Text.H4>{title}</Text.H4>
        <HStack css={{ gap: "$2" }}>
          <Button.Link
            onClick={() => {
              handleAllChange(true);
            }}
          >
            Select All
          </Button.Link>
          |
          <Button.Link
            onClick={() => {
              handleAllChange(false);
            }}
          >
            Deselect All
          </Button.Link>
        </HStack>
      </HStack>
      <CheckboxSet
        options={options}
        onChange={(value, checked) => {
          handleOneChange(value, checked);
        }}
        css={{ maxHeight: "150px", marginLeft: "$3" }}
      />
    </>
  );
};

const CheckboxSet = ({ options, onChange, css = {} }) => {
  return (
    <VStack
      css={{ gap: "$2", maxHeight: "200px", overflowY: "scroll", ...css }}
    >
      {options.map((option) => {
        return (
          <React.Fragment key={option.value}>
            <Checkbox
              label={option.label}
              checked={option.checked}
              onCheckedChange={(checked) => {
                onChange(option.value, checked);
              }}
            />
          </React.Fragment>
        );
      })}
    </VStack>
  );
};

export default CommentsFilter;
