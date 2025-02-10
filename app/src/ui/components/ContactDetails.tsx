import React from "react";
import { AiOutlineMail, AiOutlineSlack, AiOutlinePhone } from "react-icons/ai";
import { Text, Icon, ExternalLink, VStack, HStack, Box } from "./index";

const ContactDetails = ({ contacts, ...rest }) => {
  return (
    <VStack {...rest}>
      {contacts.map((c, index) => {
        return (
          <Box css={{ my: "2px" }} key={index}>
            <ContactEntry contact={c} />
          </Box>
        );
      })}
    </VStack>
  );
};

const ContactEntry = ({ contact }) => {
  const Entry = entryTypes[contact.type] || UnkownEntry;
  return <Entry contact={contact} />;
};

const EmailEntry = ({ contact }) => {
  return (
    <LinkEntry
      icon={AiOutlineMail}
      link={`mailto:${contact.value}`}
      text={contact.value}
    />
  );
};
const SlackEntry = ({ contact }) => {
  const pieces = contact.value.split("@");
  const username = pieces[pieces.length - 1];
  return (
    <LinkEntry icon={AiOutlineSlack} link={contact.value} text={username} />
  );
};

const PhoneEntry = ({ contact }) => {
  return (
    <LinkEntry
      icon={AiOutlinePhone}
      link={`tel:+${contact.value}`}
      text={`+ ${contact.value}`}
    />
  );
};

const LinkEntry = ({ icon, link, text }) => {
  return (
    <Text.Small>
      <HStack>
        <Box css={{ width: "30px" }}>
          <Icon icon={icon} css={{ mr: "$1" }} />
        </Box>
        <Box>
          <ExternalLink link={link} target="_blank">
            {text}
          </ExternalLink>
        </Box>
      </HStack>
    </Text.Small>
  );
};

const UnkownEntry = ({ contact }) => {
  return <Text.Small>{contact.value}</Text.Small>;
};

const entryTypes = {
  email: EmailEntry,
  slack: SlackEntry,
  phone: PhoneEntry,
};

export default ContactDetails;
