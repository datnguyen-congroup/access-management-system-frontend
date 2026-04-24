import {
  CheckboxProps,
  DatePickerProps,
  InputNumberProps,
  InputProps,
  RadioGroupProps,
  SelectProps,
  SwitchProps,
  UploadFile,
  UploadProps,
} from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import type { Rule } from 'antd/es/form';
import { TextAreaProps } from 'antd/es/input';
import dayjs from 'dayjs';
import React from 'react';

export enum FormInputEnum {
  input = 'input',
  textarea = 'textarea',
  number = 'number',
  checkbox = 'checkbox',
  switch = 'switch',
  select = 'select',
  radio = 'radio',
  date = 'date',
  dateRange = 'dateRange',
  upload = 'upload',
  custom = 'custom',
  array = 'array',
}

type InputTypeMap = {
  input: InputProps;
  number: InputNumberProps;
  select: SelectProps;
  date: DatePickerProps;
  dateRange: RangePickerProps;
  checkbox: CheckboxProps;
  radio: RadioGroupProps;
  switch: SwitchProps;
  upload: UploadProps;
  textarea: TextAreaProps;
};

type BaseField = {
  name: string;
  label?: React.ReactNode;
  rules?: Rule[];
  colSpan?: number;
};

/**
 * Enhanced branding for type-safe form values.
 * Using a unique symbol or a specific property name to link the value type to its input type.
 */
export type FormInputValue<
  T extends FormInputEnum,
  IsMultiple extends boolean = false,
> = (T extends FormInputEnum.input | FormInputEnum.textarea // text
  ? string
  : // number
    T extends FormInputEnum.number
    ? number | null
    : // switch
      T extends FormInputEnum.switch
      ? boolean
      : // checkbox (single or group)
        T extends FormInputEnum.checkbox
        ? IsMultiple extends true
          ? (string | number | boolean)[]
          : boolean
        : // select (single or multiple/tags)
          T extends FormInputEnum.select
          ? IsMultiple extends true
            ? (string | number | boolean)[]
            : string | number | boolean
          : // radio
            T extends FormInputEnum.radio
            ? string | number | boolean
            : // date (single or multiple)
              T extends FormInputEnum.date
              ? IsMultiple extends true
                ? dayjs.Dayjs[] | null
                : dayjs.Dayjs | null
              : // dateRange
                T extends FormInputEnum.dateRange
                ? [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
                : // upload
                  T extends FormInputEnum.upload
                  ? UploadFile[] | undefined
                  : unknown) & {
  /** @internal Branding to link value with its form input type */
  __formInputType?: T;
  /** @internal Branding to track if multiple values are expected */
  __isMultiple?: IsMultiple;
};

/**
 * Extracts keys from T that match the branded FormInputEnum.
 * If T is 'any' (default), it falls back to 'string'.
 */
type NamesForType<T, Enum extends FormInputEnum> = any extends T
  ? string
  : {
      [K in keyof T]: NonNullable<T[K]> extends { __formInputType?: Enum } ? K : never;
    }[keyof T] &
      string;

export type FieldSchema<T extends Record<string, any> = any> =
  | {
      [Enum in Exclude<
        FormInputEnum,
        FormInputEnum.custom | FormInputEnum.array
      >]: Enum extends keyof InputTypeMap
        ? {
            name: NamesForType<T, Enum>;
            inputType: Enum;
            inputProps?: InputTypeMap[Enum];
          } & BaseField
        : never;
    }[Exclude<FormInputEnum, FormInputEnum.custom | FormInputEnum.array>]
  | (BaseField & {
      name: string;
      inputType: FormInputEnum.custom;
      render: () => React.ReactNode;
    })
  | {
      [K in keyof T]: NonNullable<T[K]> extends (infer U)[]
        ? {
            name: K & string;
            inputType: FormInputEnum.array;
            fields: FieldSchema<U extends Record<string, any> ? U : any>[][];
          } & BaseField
        : never;
    }[keyof T];

export type FormSchema<T extends Record<string, any> = any> = FieldSchema<T>[][];
