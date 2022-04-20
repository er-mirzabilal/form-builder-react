import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(theme => ({
  titleCenter: {
    flexGrow: 1,
    textAlign: 'center',
  },
  titleWithAction: {
    flexGrow: 1,
  },
  drawerPaper: {
    width: '32%',
  }
}));

export default function PersistentDrawerRight(props) {
  const classes = useStyles();

  useEffect(() => {
    window.onscroll = function() {fixToolbar()};
  });

  const fixToolbar = () => {
    let header = document.getElementById("toolbar-main");
    let sticky = header.offsetTop;
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }

  return (
    <div className="ahfb-toolbar-main" id="toolbar-main">
      <AppBar className="ahfb-position-static">
        <Toolbar>
          <Typography variant="h6" noWrap className={!!(props.rightIcon) ? classes.titleWithAction : classes.titleCenter + " toolBarTitle"}>
            {props.title}
            {!!(props.rightIcon) ? (
              <span className="ahfb-pull-right ahfb-cursor-pointer">{props.rightIcon}</span>
            ) : ""}
          </Typography>
        </Toolbar>
      </AppBar>
      <Divider />
      <div className={(props.type === 'fields') ? "ahfb-toolbar-inner-paper ahfb-toolbar-field-types" : "ahfb-toolbar-inner-paper"}>
        {props.children}
      </div>
    </div>
  );
}