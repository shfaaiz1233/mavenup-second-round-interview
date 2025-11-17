import { Feather } from "@expo/vector-icons";
type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

export type ValueWithFeather = {
  icon?: FeatherIconName;
  value: string;
  label: string;
};

export type SegmentedControlButtonProps = {
  values: ValueWithFeather[];
  selectedValue: string;
  setSelectedValue: (val: string) => void;
  disabled?: boolean;
};
