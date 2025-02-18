// imports
import { useEffect, useLayoutEffect, useRef, useState, createContext, useContext} from "react"

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  
    return (
      <GameContext.Provider value={null}>
        {children}
      </GameContext.Provider>
    );
  };

export const useGameContext = () => useContext(GameContext);