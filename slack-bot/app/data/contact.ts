import type { ComponentType } from "react";
import {
  IconBrandLinkedin,
  IconBrandTwitter,
  IconMail,
} from "@tabler/icons-react";

/** Contact method information */
export interface ContactInfo {
  /** Tabler icon component */
  icon: ComponentType<{ size?: number; className?: string }>;
  /** Display title */
  title: string;
  /** Display value/handle */
  value: string;
  /** Link URL */
  href: string;
}

/** Contact form field values */
export interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

/** Initial empty form state */
export const INITIAL_FORM_VALUES: ContactFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
};

/** Contact methods displayed on the contact page */
export const CONTACT_INFO: ContactInfo[] = [
  {
    icon: IconMail,
    title: "Email",
    value: "unicorn@growthmind.ai",
    href: "mailto:unicorn@growthmind.ai",
  },
  {
    icon: IconBrandTwitter,
    title: "Twitter",
    value: "@growthmind-ai",
    href: "https://twitter.com/growthmind-ai",
  },
  {
    icon: IconBrandLinkedin,
    title: "LinkedIn",
    value: "Growthmind",
    href: "https://linkedin.com/company/growthmind-inc",
  },
];

/** Page metadata */
export const CONTACT_PAGE = {
  badge: "Contact Us",
  title: "Let's talk growth",
  subtitle:
    "Have questions about how it works? Want to challenge our AI? Or just want to say hi? We're listening.",
  sidebarTitle: "Get in touch",
  sidebarDescription:
    "We're a small team of builders passionate about solving the traction gap for early-stage startups. We read every message.",
};
