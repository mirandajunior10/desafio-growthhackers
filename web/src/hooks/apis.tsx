import axios, { AxiosInstance } from 'axios';
import React, { createContext, useState, useContext, useMemo } from 'react';

interface APIsContextData {
  externalAPI: AxiosInstance;
  updateApi: React.Dispatch<React.SetStateAction<string>>;
  apiList: APIsList[];
  selectedAPI: string;
}

enum APISEnum {
  'Rick and Morty' = 'https://rickandmortyapi.com/api',
  'Pokemon' = 'https://pokeapi.co/api/v2/',
  'Artic' = 'https://api.artic.edu/api/v1/',
}

interface APIsList {
  label: string;
  url: string;
}

const APIsContext = createContext<APIsContextData>({} as APIsContextData);

const APIsProvider: React.FC = ({ children }) => {
  const [selectedAPI, setSelectedAPI] = useState('Rick and Morty');

  const apiList = useMemo(
    () => [
      {
        label: 'Rick and Morty',
        url: APISEnum['Rick and Morty'],
      },
      {
        label: 'Pokemon',
        url: APISEnum['Rick and Morty'],
      },
      {
        label: 'Artic',
        url: APISEnum.Artic,
      },
    ],
    [],
  );

  const externalAPI = useMemo(() => {
    return axios.create({
      baseURL: APISEnum[selectedAPI as keyof typeof APISEnum],
    });
  }, [selectedAPI]);

  return (
    <APIsContext.Provider
      value={{ externalAPI, updateApi: setSelectedAPI, apiList, selectedAPI }}
    >
      {children}
    </APIsContext.Provider>
  );
};

function useAPI(): APIsContextData {
  const context = useContext(APIsContext);

  return context;
}

export { APIsProvider, useAPI };
