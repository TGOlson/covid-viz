import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const link = (url, text) => (
  <Link
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    color="textSecondary"
    variant="body2"
    style={{ fontSize: '12px' }}
  >
    {text}
  </Link>
);

const NavHeader = () => (
  <div style={{ display: 'flex' }}>
    <div style={{
      height: '58px',
      paddingLeft: '16px',
      paddingTop: '6px',
    }}
    >
      <Link component={RouterLink} to="/" color="textSecondary" variant="h6" style={{ marginTop: '6px' }}>Covid Dashboard</Link>
      <div>
        {link('https://twitter.com/TyGuyO', '@tyguyo')}
        <Typography component="span" color="textSecondary" variant="body2" style={{ fontSize: '12px' }}> / </Typography>
        {link('https://github.com/TGOlson/covid-viz', 'GitHub')}
      </div>
    </div>
  </div>
);

export default NavHeader;
