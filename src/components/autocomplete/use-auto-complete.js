import { useCallback, useState } from "react";

const useAutoComplete = ({ onSearch, onChange, onError, defaultValue }) => {
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(defaultValue);

  // fetch city name on every user input
  const handleSearch = useCallback(
    async (q) => {
      if (!q) return setResults([]);
      try {
        const results = await onSearch(q);
        setResults(results);
      } catch (e) {
        onError?.(e);
      }
    },
    [onError, onSearch]
  );

  // assign the value of input field to the selected item from the list of cities
  const handleSelect = (id) => {
    console.log(results, id);
    const selected = results.find((r) => r.lat === id);
    setSelected(selected);
  };

  // reset the auto complete to begin a new search
  const handleChange = () => {
    setResults([]);
    setSelected(null);
    onChange?.();
  };

  return { results, selected, handleSelect, handleChange, handleSearch };
};

export default useAutoComplete;
