import {Link, Route, Switch} from "react-router-dom";
import logo from "../images/logo.svg";

function Header(props) {

    return (
        <header className="header section">
            <img
                className="header__logo"
                src={logo}
                alt="Логотип Mesto Russia"
            />
            <Switch>
                <Route exact path="/sign-in">
                    <Link className="header__link" to="/sign-up">
                        Регистрация
                    </Link>
                </Route>
                <Route exact path="/sign-up">
                    <Link className="header__link" to="/sign-in">
                        Войти
                    </Link>
                </Route>
                <Route path="/">
                    <div className="header__right-block">
                        {props.loggedIn && (
                            <p className="header__email">{props.email}</p>
                        )}
                        {props.email && (
                            <Link
                                className="header__sign-out"
                                to="/sign-up"
                                onClick={props.onSignOut}
                            >
                                Выйти
                            </Link>
                        )}
                    </div>
                </Route>
            </Switch>
        </header>
    );
}

export default Header;
