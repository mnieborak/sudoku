import { useState } from "react";

export const MODE_EDITING = "MODE_EDITING";
export const MODE_SOLVING = "MODE_SOLVING";
export const MODES = [MODE_EDITING, MODE_SOLVING];

export const useMode = () => useState(MODE_EDITING);
