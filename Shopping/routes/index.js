import {createAppContainer, NavigationActions} from "react-navigation";
import AuthNavigator from "./AuthNavigator";
import React, {useEffect, useRef} from "react";
import {useSelector} from "react-redux";

const MainNavigator = createAppContainer(AuthNavigator);

export default () => {
  const isAuth = useSelector(state => !!state.auth.token);
  const navRef = useRef();
  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(NavigationActions.navigate({routeName: 'Auth'}))
    }
  }, [isAuth]);
  return <MainNavigator ref={navRef}/>
}

