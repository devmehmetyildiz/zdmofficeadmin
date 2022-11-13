import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import { withRouter } from 'react-router-dom';

class Footer extends Component {
  render () {
    return (
      <footer className="footer">
        <div className="d-sm-flex justify-content-center justify-content-sm-between">
          <span className="text-muted text-center text-sm-left d-block d-sm-inline-block"><Trans>Copyright</Trans> © 2022 <a href="https://www.armsteknoloji.com/" target="_blank" rel="noopener noreferrer">ARMS TEKNOLOJİ</a>. <Trans>TÜM HAKLAR SAKLIDIR</Trans>.</span>
          <span className="text-muted float-none float-sm-right d-block mt-1 mt-sm-0 text-center"><Trans>ARMS</Trans> & <Trans>FARKIYLA</Trans> <i className="mdi mdi-heart text-danger"></i></span>
        </div>
      </footer>
    );
  }
}

export default withRouter(Footer);