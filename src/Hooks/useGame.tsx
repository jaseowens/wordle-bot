import { useContext } from "react";
import { GameContext } from "../Contexts/Game";

export const useGame = () => useContext(GameContext);
