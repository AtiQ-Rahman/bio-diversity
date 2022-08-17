import * as React from 'react';

import { List , ListItem , listItemButtonClasses,listItemClasses , ListItemButton , Box , Typography , Button ,IconButton, Grid } from '@mui/material';
import ReceiptLong from '@mui/icons-material/ReceiptLong';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
export default function ExampleCollapsibleList() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  return (
    <Box
      sx={{
        width: 320,
        pl: '24px',
      }}
    >

      <List
        size="sm"
        sx={(theme) => ({
          // Gatsby colors
          '--joy-palette-primary-plainColor': '#8a4baf',
          '--joy-palette-neutral-plainHoverBg': 'transparent',
          '--joy-palette-neutral-plainActiveBg': 'transparent',
          '--joy-palette-primary-plainHoverBg': 'transparent',
          '--joy-palette-primary-plainActiveBg': 'transparent',

          '--List-insetStart': '32px',
          '--List-item-paddingY': '0px',
          '--List-item-paddingRight': '16px',
          '--List-item-paddingLeft': '21px',
          '--List-item-startActionWidth': '0px',
          '--List-item-startActionTranslateX': '-50%',

          [`& .${listItemButtonClasses.root}`]: {
            borderLeft: '1px solid',
            borderColor: 'divider',
          },
          [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]: {
            borderColor: 'currentColor',
          },
          [`& .${listItemClasses.nested} > .${listItemButtonClasses.root}`]: {
            border: 'none',
          },
          '& [class*="startAction"]': {
            color: 'var(--joy-palette-text-tertiary)',
          },
        })}
      >
        <Grid item xs ={12}>
        <ListItemButton 
              onClick={() => setOpen(!open)}
              endIcon={<KeyboardArrowDown sx={{ transform: open ? 'initial' : 'rotate(-90deg)' }} />} >
            <Typography
              level="inherit"
              sx={{
                fontWeight: open ? 'bold' : undefined,
                color: open ? 'text.primary' : 'inherit',
              }}
            >
              Species
            </Typography>
            <Typography component="span" level="body3" sx={{ ml: 1 }}>
              9
            </Typography>
          </ListItemButton>
          {open && (
            <List sx={{ '--List-item-paddingY': '8px' }}>
              <ListItem>
                <ListItemButton>Overview</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  0. Set Up Your Development Environment
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  1. Create and Deploy Your First Gatsby Site
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>2. Use and Style React components</ListItemButton>
              </ListItem>
            </List>
          )}
        </Grid>

  
                
     <ListItemButton 
              onClick={() => setOpen2(!open2)}
              endIcon={<KeyboardArrowDown sx={{ transform: open2 ? 'initial' : 'rotate(-90deg)' }} />} >
            <Typography
              level="inherit"
              sx={{
                fontWeight: open ? 'bold' : undefined,
                color: open ? 'text.primary' : 'inherit',
              }}
            >
              Genera
            </Typography>
            <Typography component="span" level="body3" sx={{ ml: 1 }}>
              32
            </Typography>
          </ListItemButton>
          {open2 && (
            <List sx={{ '--List-item-paddingY': '8px' }}>
              <ListItem>
                <ListItemButton>Overview</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Local Development</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Routing</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Styling</ListItemButton>
              </ListItem>
            </List>
          )}

</List>
    </Box>
  );
}
