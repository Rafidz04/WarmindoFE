import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { refresh } from '../stores';
import { useSelector, useDispatch } from 'react-redux';
// react-bootstrap components
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Pagination,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

// core components
import Sidebar from 'components/Sidebar/Sidebar.js';
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import AdminFooter from 'components/Footers/AdminFooter.js';
import FixedPlugin from 'components/FixedPlugin/FixedPlugin.js';

// dinamically create dashboard routes
import routes from 'routes.js';

import image1 from 'assets/img/full-screen-image-1.jpg';
import image2 from 'assets/img/full-screen-image-2.jpg';
import image3 from 'assets/img/full-screen-image-3.jpg';
import image4 from 'assets/img/full-screen-image-4.jpg';

function Admin() {
  const [sidebarImage, setSidebarImage] = React.useState(image3);
  const [sidebarBackground, setSidebarBackground] = React.useState('black');
  const auth = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            key={key}
            component={prop.component}
          />
        );
      } else {
        return null;
      }
    });
  };
  React.useEffect(() => {
    if (!auth.username) {
      refresh(dispatch);
    }
  }, []);
  return (
    <>
      <div className='wrapper'>
        <Sidebar
          routes={routes}
          image={sidebarImage}
          background={sidebarBackground}
        />
        <div className='main-panel'>
          <AdminNavbar />
          <div className='content'>
            <Switch>{getRoutes(routes)}</Switch>
          </div>
          {/* <AdminFooter /> */}
          <div
            className='close-layer'
            onClick={() =>
              document.documentElement.classList.toggle('nav-open')
            }
          />
        </div>
      </div>
    </>
  );
}

export default Admin;
