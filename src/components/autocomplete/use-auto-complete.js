import { useCallback, useState } from "react";

const useAutoComplete = ({ onSearch, onChange, onError, defaultValue }) => {
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(defaultValue);

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

  const handleSelect = (id) => {
    console.log(results, id);
    const selected = results.find((r) => r.lat === id);
    setSelected(selected);
  };

  const handleChange = () => {
    setResults([]);
    setSelected(null);
    onChange?.();
  };

  return { results, selected, handleSelect, handleChange, handleSearch };
};

export default useAutoComplete;
