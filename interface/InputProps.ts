import React, { ChangeEvent } from "react";

export interface inputProps {
    label?: string; 
    name: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e:ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
  }
  