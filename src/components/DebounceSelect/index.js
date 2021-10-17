import React from 'react';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import {
  Select,
  Spin
} from 'antd';

const DebounceSelect = ({ fetchOptions, debounceTimeout = 800, optionInit = [], ...props }) => {
  const [fetching, setFetching] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const fetchRef = React.useRef(0);
  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options.length > 0 ? options : optionInit}
    />
  );
};

DebounceSelect.propTypes = {
  fetchOptions: PropTypes.func,
  debounceTimeout: PropTypes.number,
  optionInit: PropTypes.array,
};

export default DebounceSelect;
