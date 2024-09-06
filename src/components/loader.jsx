import { lazy } from "react";

export const lload = (path) => {
    return lazy(() => import(path))
}