import { NavLink, Route, Switch } from "react-router-dom";

import LayoutStoreHome from "layouts/StoreHome";
import useAuth from "hooks/useAuth";

const Options = () => {
  const { logOut } = useAuth();

  return (
    <LayoutStoreHome>
      <Row>
        <Col md={4}>
          <ul className="list-unstyled">
            <li className="my-2">
              <NavLink className="text-small" to="/account/orders">
                Orders
              </NavLink>
            </li>
            <li className="text-upper">
              <span to="/" onClick={logOut}>
                Log Out
              </span>
            </li>
          </ul>
        </Col>
        <Col md={4}>
          <Switch>
            <Route path="/account/orders" component={Orders} />
          </Switch>
        </Col>
      </Row>
    </LayoutStoreHome>
  );
};

export default Options;
