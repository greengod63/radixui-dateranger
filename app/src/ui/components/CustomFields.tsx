import React from "react";
import { Text, Icon, ExternalLink } from "./index";

import { GrLocation } from "react-icons/gr";
import { AiOutlineLink } from "react-icons/ai";
import { IoMdTime } from "react-icons/io";

const CustomFields = ({ fields }) => {
  return (
    <>
      {fields.map((field, index) => {
        return <CustomField field={field} key={index} />;
      })}
    </>
  );
};

const CustomField = ({ field, ...rest }) => {
  const Field = fieldTypes[field.type];
  if (Field) {
    return (
      <Text.Small css={{ my: "$1" }}>
        <Field field={field} />
      </Text.Small>
    );
  }
};

const LocationField = ({ field }) => {
  const { name, lat, lng } = field.value;
  return (
    <ExternalLink link={`https://maps.google.com/?q=${lat},${lng},10z`}>
      <FieldLabel label={field.label} />
      <Icon icon={GrLocation} css={{ mx: "$1" }} />
      {name}
    </ExternalLink>
  );
};

const TextField = ({ field }) => {
  return (
    <>
      <FieldLabel label={field.label} />
      {field.value}
    </>
  );
};

const LinkField = ({ field }) => {
  return (
    <ExternalLink link={field.value}>
      <FieldLabel label={field.label} />
      <Icon icon={AiOutlineLink} css={{ mx: "$1" }} />
      {field.value}
    </ExternalLink>
  );
};

const TimezoneField = ({ field }) => {
  let { label, offset } = field.value;
  const prefix = offset < 0 ? "-" : "+";
  let now = new Date();
  now = new Date(
    Date.now() + now.getTimezoneOffset() * 60 * 1000 + offset * 60 * 60 * 1000
  );
  const timeString = `${now.getHours()}:${now.getMinutes()}`;
  let off: any = Math.abs(offset);
  if (off % 1 === 0.5) {
    off = `${Math.round(off)}:30`;
  } else {
    off = Math.round(off);
  }
  const val = `${"Current Time"}: ${timeString}, ${label} GMT${prefix}(${off})`;
  return (
    <>
      <FieldLabel label={"Timezone"} />
      <Icon
        icon={IoMdTime}
        css={{ mr: "$1", position: "relative", top: "4px" }}
      />
      {val}
    </>
  );
};

const FieldLabel = ({ label }) => {
  return (label && label.lengt > 0 && <strong>{label}: </strong>) || null;
};

const fieldTypes = {
  location: LocationField,
  text: TextField,
  link: LinkField,
  timezone: TimezoneField,
};

export { LocationField, TextField, LinkField, TimezoneField };

export default CustomFields;
