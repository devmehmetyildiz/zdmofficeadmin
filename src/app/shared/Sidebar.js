import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Trans } from 'react-i18next';
class Sidebar extends Component {

  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({[i]: false});
      });
      this.setState({[menuState] : true}); 
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
      this.setState({[i]: false});
    });

    const dropdownPaths = [
      {path:'Setting', state: 'SettingsMenuOpen'},
      {path:'/Categories', state: 'SettingsMenuOpen'},
      {path:'/Subategories', state: 'SettingsMenuOpen'},
      {path:'/Productgroups', state: 'SettingsMenuOpen'},
      {path:'/Products', state: 'SettingsMenuOpen'},
      {path:'/Files', state: 'SettingsMenuOpen'},
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({[obj.state] : true})
      }
    }));
 
  }

  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a className="sidebar-brand brand-logo" href="index.html"><img src={require('../../assets/images/logo.svg')} alt="logo" /></a>
          <a className="sidebar-brand brand-logo-mini" href="index.html"><img src={require('../../assets/images/logo-mini.svg')} alt="logo" /></a>
        </div>
        <ul className="nav">
                
          <li className={ this.isPathActive('/dashboard') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <Link className="nav-link" to="/dashboard">
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
              <span className="menu-title"><Trans>Dashboard</Trans></span>
            </Link>
          </li>  
          <li className={ this.isPathActive('/ActivePatients') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.ActivePatientsPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('ActivePatientsPagesMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-lock"></i>
              </span>
              <span className="menu-title"><Trans>Aktif Hastalarım</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.ActivePatientsPagesMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/Activepatients') ? 'nav-link active' : 'nav-link' } to="/Activepatients">Aktif Hastalar</Link></li>
                </ul>
              </div>
            </Collapse>
          </li>          
          <li className={ this.isPathActive('/ActiveStocks') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.StockPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('StockPagesMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-lock"></i>
              </span>
              <span className="menu-title"><Trans>Aktif Stoklar</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.StockPagesMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/ActiveStocks') ? 'nav-link active' : 'nav-link' } to="/ActiveStocks">Stoklar</Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/DeactiveStocks') ? 'nav-link active' : 'nav-link' } to="/DeactiveStocks">İtlaf Edilenler</Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/Stockmovements') ? 'nav-link active' : 'nav-link' } to="/Stockmovements">Genel Hareketlerim</Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/StockmovementNewSelect') ? 'nav-link active' : 'nav-link' } to="/StockmovementNewSelect">Ürün Hareketi</Link></li>
                </ul>
              </div>
            </Collapse>
          </li>          
          <li className={ this.isPathActive('/error-pages') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.errorPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('errorPagesMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-lock"></i>
              </span>
              <span className="menu-title"><Trans>Error Pages</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.errorPagesMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/error-pages/error-404') ? 'nav-link active' : 'nav-link' } to="/error-pages/error-404">404</Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/error-pages/error-500') ? 'nav-link active' : 'nav-link' } to="/error-pages/error-500">500</Link></li>
                </ul>
              </div>
            </Collapse>
          </li>    
          <li className={ this.isPathActive('Setting') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.SettingsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('SettingsMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-lock"></i>
              </span>
              <span className="menu-title"><Trans>Ayarlar</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.SettingsMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/Categories') ? 'nav-link active' : 'nav-link' } to="/Categories">Kategoriler</Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/Subcategories') ? 'nav-link active' : 'nav-link' } to="/Subcategories">Alt Kategoriler</Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/Productgroups') ? 'nav-link active' : 'nav-link' } to="/Productgroups">Ürün Grupları</Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/Products') ? 'nav-link active' : 'nav-link' } to="/Products">Ürünleri</Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/Files') ? 'nav-link active' : 'nav-link' } to="/Files">Dosyalar</Link></li>
                </ul>
              </div>
            </Collapse>
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
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);