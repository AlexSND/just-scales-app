import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import {IForNoteScale} from "./shared/interfaces/forNoteScale";
import {IScale} from "./shared/interfaces/scale";
import {IKey} from "./shared/interfaces/key";
import {KEYS} from "./shared/const/keys";

export interface INoteSelectorState {
  mainNote: IKey | null;
  scales: IForNoteScale[];
  selectedKeyboardKeys: IKey[];
  selectedScales: Omit<IScale, 'ranges'>[];
  scaleDetection: boolean;
  compactView: boolean;
}

const initialState: INoteSelectorState = {
  mainNote: null,
  selectedKeyboardKeys: [],
  scales: [],
  selectedScales: [],
  scaleDetection: false,
  compactView: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setScales: (state, action: PayloadAction<IForNoteScale[]>) => {
      return {
        ...state,
        scales: action.payload,
      };
    },
    selectNoteFromKeyboard: (state, action: PayloadAction<IKey>) => {
      if (!state.mainNote) {
        state.mainNote = KEYS[0];
      }

      state.scaleDetection = true;

      const selectedKeyboardKeys = () => {
        if (state.selectedKeyboardKeys.some(scale => scale.note === action.payload.note)) {
          return state.selectedKeyboardKeys.filter(scale => scale.note !== action.payload.note)
        } else {
          return [...state.selectedKeyboardKeys, action.payload]
        }
      }

      state.selectedKeyboardKeys = selectedKeyboardKeys();

      if (!state.selectedKeyboardKeys.length) {
        state.selectedScales = [];
      } else  {
        state.selectedScales = state.scales
          .filter(scale => state.selectedKeyboardKeys
            .every(selectedKey => scale.notes.some(key => key.note === selectedKey.note)) &&
            scale.mainNote === state.mainNote?.note
          );
      }
    },

    selectMainNote: (state, action: PayloadAction<IKey>) => {
      if (!state.selectedKeyboardKeys.length) {
        state.scaleDetection = false;
      }

      state.mainNote = action.payload;

      if (state.scaleDetection) {
        state.selectedScales = state.scales
        .filter(scale => state.selectedKeyboardKeys
          .every(selectedKey => scale.notes.some(key => key.note === selectedKey.note)) &&
          scale.mainNote === state.mainNote?.note
        );
      } else {
        state.selectedKeyboardKeys = getScaleKeys(state.mainNote!, state.selectedScales, state.scales);
      }
    },

    selectScale: (state, action: PayloadAction<IScale>) => {
      if (!state.mainNote) {
        state.mainNote = KEYS[0];
      }

      state.selectedScales = [action.payload];
      state.scaleDetection = false;
      state.selectedKeyboardKeys = getScaleKeys(state.mainNote!, state.selectedScales, state.scales);
    },

    setCompactView: (state, action: PayloadAction<boolean>) => {
      state.compactView = action.payload;
    }
  }
})

  const getScaleKeys = (mainNote: IKey, selectedScales: Omit<IScale, 'ranges'>[], scales: IForNoteScale[]) => {
    const notes = new Set<IKey>();

    scales.filter(scale => scale.mainNote === mainNote.note).filter(scale => selectedScales.some(selectedScale => selectedScale.name === scale.name)).forEach(scale => {
      for (const note of scale.notes) {
        notes.add(note);
      }
    });

    return Array.from(new Set(notes));
  }

export const {selectNoteFromKeyboard, selectMainNote, selectScale, setScales, setCompactView} = appSlice.actions;
export default appSlice.reducer;