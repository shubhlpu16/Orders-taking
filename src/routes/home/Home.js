import React, { useContext } from 'react';
import CSSModules from 'react-css-modules';
import { Context } from '../../AppContext';
import s from './Home.module.css';

const Home = () => {
  const { store } = useContext(Context);
  console.log(store); //eslint-disable-line
  return (
    <div className={s.App}>
      <header className={s.header}>
        <img src="/images/logo.svg" className={s.logo} alt="logo" />
        <p>
          A simple React Setup with routes in <code>/src/App.js</code>.<br />
          Redux is also setup with different directories of actions, reducers,
          store.
        </p>
      </header>
    </div>
  );
};

export default CSSModules(Home, s, { allowMultiple: true });
