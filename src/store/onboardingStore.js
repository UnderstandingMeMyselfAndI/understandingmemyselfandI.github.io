import { create } from 'zustand';
import { openDB } from 'idb';

const DB_NAME = 'OnboardingDB';
const STORE_NAME = 'responses';
const VERSION = 1;
const RESPONSES_KEY = 'responses';

const initDB = async () => {
  return openDB(DB_NAME, VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    },
  });
};

const getFromDB = async (key) => {
  const db = await initDB();
  const result = await db.get(STORE_NAME, key);
  return result ? result.value : null;
};

const setToDB = async (key, value) => {
  const db = await initDB();
  await db.put(STORE_NAME, { key, value });
};

export const useOnboardingStore = create((set, get) => ({
  phase: 'phase1',
  currentQuestionIndex: 0,
  responses: {},
  loadResponses: async () => {
    const savedResponses = await getFromDB(RESPONSES_KEY);
    if (savedResponses) {
      set({ responses: savedResponses });
    }
  },
  setResponse: (question, answer) => {
    const newResponses = { ...get().responses, [question]: answer };
    set({ responses: newResponses });
    setToDB(RESPONSES_KEY, newResponses);
  },
  nextQuestion: () => {
    set({ currentQuestionIndex: get().currentQuestionIndex + 1 });
  },
  nextPhase: (newPhase) => {
    set({ phase: newPhase, currentQuestionIndex: 0 });
  },
  // Add logic here if needed to check phase completion based on responses
}));