import React from "react";

type CustomComponentsProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
}
export type CustomComponentsProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export type TabGroup = CustomComponentsProps & {
  defaultIndex?: number;
}

export type Tab = CustomComponentsProps & {
  idx?: number;
  selected?: boolean;
  disabled?: boolean;
  onClick?: ()=>void;
}

export type TabPanel = CustomComponentsProps & {
  selected?: boolean;
}

export type PopoverPanel = CustomComponentsProps & {
  anchor?: 'top' | 'right' | 'bottom' | 'left';
  portal?: boolean
}

export type Form = CustomComponentsProps & {
  onSubmit: React.FormEventHandler<HTMLFormElement>['onSubmit'];
}

export type FormTitle = CustomComponentsProps

export type FormGroup = CustomComponentsProps

export type FormSubmit = CustomComponentsProps & {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}