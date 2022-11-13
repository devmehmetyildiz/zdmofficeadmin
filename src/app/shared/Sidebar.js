import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Trans } from 'react-i18next';
class Sidebar extends Component {

  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: '/Categories', state: 'SettingsMenuOpen' },
      { path: '/Subategories', state: 'SettingsMenuOpen' },
      { path: '/Productgroups', state: 'SettingsMenuOpen' },
      { path: '/Products', state: 'SettingsMenuOpen' },
      { path: '/Files', state: 'SettingsMenuOpen' },
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true })
      }
    }));

  }

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center text-center justify-content-center fixed-top">
         ZDM PANEL
        </div>
        <ul className="nav">

          <li className={this.isPathActive('/Categories') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/Categories">
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
              <span className="menu-title"><Trans>Kategoriler</Trans></span>
            </Link>
          </li>
          <li className={this.isPathActive('/Subcategories') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/Subcategories">
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
              <span className="menu-title"><Trans>Alt Kategoriler</Trans></span>
            </Link>
          </li>
          <li className={this.isPathActive('/Productgroups') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/Productgroups">
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
              <span className="menu-title"><Trans>Ürün Grupları</Trans></span>
            </Link>
          </li>
          <li className={this.isPathActive('/Companies') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/Companies">
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
              <span className="menu-title"><Trans>Firmalar</Trans></span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);