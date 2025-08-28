import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import authReducer from "./authSlice"
import postReducer from "./postSlice"

const persistConfig = {
    key: "root",
    storage,
    stateReconciler: autoMergeLevel2
}

const rootReducer = combineReducers({
    auth: authReducer,
    post: postReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    "persist/PERSIST",
                    "persist/REHYDRATE",
                    "persist/FLUSH",
                    "persist/PAUSE",
                    "persist/PURGE",
                    "persist/REGISTER",
                ],
            }
        })
})

export const persistor = persistStore(store)