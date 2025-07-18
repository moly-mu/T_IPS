import { createContext, useContext, useState, useEffect } from "react";

// Interfaz del usuario (puedes mover esto a types/UserData.ts si prefieres)
export interface UserData {
  id: number;
  name: string;
  email: string;
  role: {
    name: string;
  };
  specialist?: {
    specialty: string;
  };
  patient?: {
    history: string;
  };
}

interface UserDataContextType {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
  clearUserData: () => void;
}

const UserDataContext = createContext<UserDataContextType>({
  userData: null,
  setUserData: () => {},
  clearUserData: () => {},
});

export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserDataState] = useState<UserData | null>(null);

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      try {
        setUserDataState(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("userData");
      }
    }
  }, []);

  // Actualiza el estado y guarda en localStorage
  const setUserData = (data: UserData | null) => {
    if (data) {
      localStorage.setItem("userData", JSON.stringify(data));
    } else {
      localStorage.removeItem("userData");
    }
    setUserDataState(data);
  };

  const clearUserData = () => {
    localStorage.removeItem("userData");
    setUserDataState(null);
  };

  return (
    <UserDataContext.Provider value={{ userData, setUserData, clearUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
