import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Context = React.createContext();

function ContextProvider(props) {
  const { store } = props.value;
  const [data, setData] = useState('');
  useEffect(() => {
    // fetch any necessary data to send for context
    setData('Context data');
  }, []);
  return (
    <Context.Provider value={{ data, store }}>
      {props.children}
    </Context.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.object.isRequired,
};

export { ContextProvider, Context };
