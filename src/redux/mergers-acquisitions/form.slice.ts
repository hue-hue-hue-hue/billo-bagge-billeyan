import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";

interface FormState {
  companyALegalDocuments: File[];
  companyBLegalDocuments: File[];
  companyAFinancialStatements: File[];
  companyBFinancialStatements: File[];
  specificRequirements: string;
}

const initialState: FormState = {
  companyALegalDocuments: [],
  companyBLegalDocuments: [],
  companyAFinancialStatements: [],
  companyBFinancialStatements: [],
  specificRequirements: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFiles(
      state,
      action: PayloadAction<{ field: keyof FormState; files: File[] }>
    ) {
      const field = action.payload.field;

      // Narrow the type to ensure the field is `File[]`
      if (Array.isArray(state[field])) {
        state[field] = action.payload.files as WritableDraft<File[]> & string; // Ensure compatibility with Immer's WritableDraft type
      }
    },
    updateField(
      state,
      action: PayloadAction<{ field: keyof FormState; value: string }>
    ) {
      const field = action.payload.field;
      if (typeof state[field] === "string") {
        state[field] = action.payload.value as WritableDraft<File[]> & string;
      }
    },
    resetForm(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { updateFiles, updateField, resetForm } = formSlice.actions;
export default formSlice.reducer;
