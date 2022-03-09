import { List, ListItem, ListItemIcon, colors, Toolbar, Divider, ListItemText, Drawer } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react'
import { useParams, Link } from 'react-router-dom';
import SettingGeneralAccount from '../organism/settings/settingGeneralStaff';
import SettingProduct from '../organism/settings/settingProduct';
import SettingHome from '../organism/settings/settingHome'
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import Header from '../organism/header';

const drawerWidth = 240;

const currentLinkStyle = {
    color: colors.blue[800],
    textDecoration: "none",
    background: colors.grey[100],
    width: "100%",
    display: "inline-block",
  };
  
  const linkStyle = {
    color: "inherit",
    textDecoration: "none",
    width: "100%",
    display: "inline-block",
  };

function Setting() {
    const { id } = useParams<{ id: string }>();

    const settingContent = () => {
      console.log(id);
      switch (id) {
        case undefined:
          return <SettingHome />;
        case "generalProduct":
          return <SettingProduct />;
        case "generalStaff":
          return <SettingGeneralAccount />;
        // case "chart":
        //   return <ViewChart />;
        default:
          return <div>404</div>;
      }
    };

    return (
        <div>
          <Header/>
          <Box sx={{ display: "flex" }}>
            <Drawer
              variant="permanent"
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
            >
              <Toolbar />
              <Box sx={{ overflow: "auto" }}>
                <List>
                  <Link
                    to="/setting"
                    style={id === "" ? currentLinkStyle : linkStyle}
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      <ListItemText primary={"設定"} />
                    </ListItem>
                  </Link>
                </List>
                <Divider />
                <List>
                  {["generalProduct", "generalStaff"].map((text, index) => (
                    <Link
                      to={`/setting/${text}`}
                      style={id === text ? currentLinkStyle : linkStyle}
                      key={index}
                    >
                        <ListItem button key={index}>
                            <ListItemIcon>
                            {index === 0 && <PrecisionManufacturingIcon />}
                            {index === 1 && <AccountCircleIcon />}
                            </ListItemIcon>
                            {index === 0 && <ListItemText primary="製品管理" />}
                            {index === 1 && <ListItemText primary="スタッフ管理" />}
                        </ListItem>
                    </Link>
                  ))}
                </List>
              </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: "100%" }}>
              <Toolbar />
              {settingContent()}
            </Box>
          </Box>
        </div>
    )
}

export default Setting
