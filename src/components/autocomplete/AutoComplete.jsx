import React, { forwardRef, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// import Loader from "./Loader.jsx";
import { FiEdit2 } from "react-icons/fi";
import SimpleBar from "simplebar-react";

const mergeRefs = (...refs) => {
  const filteredRefs = refs.filter(Boolean);
  if (!filteredRefs.length) return null;
  if (filteredRefs.length === 1) return filteredRefs[0];
  return (inst) => {
    for (const ref of filteredRefs) {
      if (typeof ref === "function") {
        ref(inst);
      } else if (ref) {
        ref.current = inst;
      }
    }
  };
};

const AutoComplete = forwardRef(
  (
    {
      label,
      rightIcon,
      id,
      error,
      disabled,
      onSearch,
      onChange,
      onSelect,
      results,
      selected,
      loading,
      bordered = false,
      ...props
    },
    ref
  ) => {
    const timeout = useRef(null);
    const [query, setQuery] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
      // Debounce
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        onSearch(query);
        clearTimeout(timeout.current);
        timeout.current = null;
      }, 1000);
    }, [query]);

    const handleChange = () => {
      onChange();
      setTimeout(() => {
        inputRef.current?.focus();
      });
    };

    return (
      <div className="flex flex-col mt-4">
        {!!label && (
          <label htmlFor={id} className="text-sm mb-1 text-white">
            {label}
          </label>
        )}
        {!!selected ? (
          <div
            className={classNames(
              "relative px-4 py-3 rounded-md w-full transition duration-300",
              {
                "bg-gray-400 border border-gray-400 focus:border-primary-600":
                  bordered,
              },
              {
                "bg-gray-100 focus:ring-2 ring-offset-2 ring-primary-800 ring-opacity-30":
                  !bordered,
              }
            )}
          >
            {selected}
            <button
              onClick={handleChange}
              type="button"
              disabled={disabled}
              className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 rounded-md bg-gray-900 bg-opacity-0 hover:bg-opacity-5 flex items-center justify-center"
            >
              <FiEdit2 />
            </button>
          </div>
        ) : (
          <div className="relative">
            <div className="relative">
              <input
                className={classNames(
                  "px-4 py-3 rounded-md w-full transition duration-300 bg-gray-800 border-0 focus:border-primary-900 text-white",
                  { "pr-12": !!rightIcon },
                  { "opacity-60 pointer-events-none": disabled }
                )}
                value={query}
                onInput={(e) => setQuery(e.target.value)}
                id={id}
                {...props}
                ref={mergeRefs(ref, inputRef)}
              />
              {!!rightIcon && (
                <div className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 rounded-md flex items-center justify-center">
                  {rightIcon}
                </div>
              )}
            </div>
            {(loading || !!results.length) && (
              <div className="bg-gray-800 text-white rounded-md shadow-md min-h-[50px] mt-2 overflow-hidden absolute top-full z-40 left-0 w-full">
                {loading ? (
                  <div className="flex justify-center py-6">Loading..</div>
                ) : (
                  <SimpleBar style={{ maxHeight: 350 }}>
                    <ul className="px-2 py-3">
                      {results.map((r) => (
                        <li
                          onClick={() => {
                            setQuery("");
                            onSelect(r.id);
                          }}
                          key={r.id}
                          className="hover:bg-gray-700 rounded px-3 py-2 cursor-pointer"
                        >
                          {r.display}
                        </li>
                      ))}
                    </ul>
                  </SimpleBar>
                )}
              </div>
            )}
            {!!query && !timeout.current && !loading && !results.length && (
              <p className="text-[#8C0C0C] text-xl m-4 text-center">
                No city found
              </p>
            )}
          </div>
        )}
        {!!error && <div className="text-sm text-red-500 mt-1">{error}</div>}
      </div>
    );
  }
);

AutoComplete.displayName = "AutoComplete";

AutoComplete.propTypes = {
  rightIcon: PropTypes.element,
  label: PropTypes.string,
  id: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
};

export default AutoComplete;
