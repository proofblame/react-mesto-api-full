import React from "react";
import { Route } from "react-router-dom";

const MainRoute = (props) => {
    return (
        <Route>
            {() => (props.isChecked ? props.children : <p>Загрузка...</p>)}
        </Route>
    );
};

export default MainRoute;
