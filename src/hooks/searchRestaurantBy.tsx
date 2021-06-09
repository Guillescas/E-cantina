/* eslint-disable react/destructuring-assignment */
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react';

interface IRestaurantProps {
  id: number;
  email: string;
  name: string;
  description?: string;
  category: {
    id: number;
    name: string;
  };
}

interface SearchRestaurantByContextData {
  isUserSearchingSomething: boolean;
  setIsUserSearchingSomething: (isUserSearchingSomething: boolean) => void;
  restaurants: IRestaurantProps[];
  setRestaurants: (restaurants: IRestaurantProps[]) => void;
  category: string;
  setCategory: (category: string) => void;
  searchByRestaurantName: string;
  setSearchByRestaurantName: (restaurantName: string) => void;
  isToClearFormData: boolean;
  setIsToClearFormData: (isToClearFormData: boolean) => void;
}

interface ISearchRestaurantByProviderProps {
  children: ReactNode;
}

const SearchRestaurantByContext = createContext<SearchRestaurantByContextData>(
  {} as SearchRestaurantByContextData,
);

export const SearchRestaurantByProvider = ({
  children,
}: ISearchRestaurantByProviderProps): ReactElement => {
  const [isUserSearchingSomething, setIsUserSearchingSomething] = useState(
    false,
  );

  const [restaurants, setRestaurants] = useState<IRestaurantProps[]>([]);
  const [category, setCategory] = useState('');
  const [searchByRestaurantName, setSearchByRestaurantName] = useState('');
  const [isToClearFormData, setIsToClearFormData] = useState(false);

  return (
    <SearchRestaurantByContext.Provider
      value={{
        isUserSearchingSomething,
        setIsUserSearchingSomething,
        restaurants,
        setRestaurants,
        category,
        setCategory,
        searchByRestaurantName,
        setSearchByRestaurantName,
        isToClearFormData,
        setIsToClearFormData,
      }}
    >
      {children}
    </SearchRestaurantByContext.Provider>
  );
};

export function useSearchRestaurantBy(): SearchRestaurantByContextData {
  const context = useContext(SearchRestaurantByContext);

  if (!context) {
    throw new Error(
      'useSearchRestaurantBy must be used within a SearchRestaurantByProvider',
    );
  }

  return context;
}

export default SearchRestaurantByContext;
