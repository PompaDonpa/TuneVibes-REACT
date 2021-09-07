
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
// import SongDetails from '../components/SongDetails'

import Drawer from '../components/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { theme } from '../pages/theme'
import Box from '@material-ui/core/Box'

// const Accordion = withStyles({
//   root: {
//     border: '1px solid rgba(0, 0, 0, .125)',
//     boxShadow: 'none',
//     '&:not(:last-child)': {
//       borderBottom: 0,
//     },
//     '&:before': {
//       display: 'none',
//     },
//     '&$expanded': {
//       margin: 'auto',
//     },
//   },
//   expanded: {},
// })(MuiAccordion);

// const AccordionSummary = withStyles({
//   root: {
//     backgroundColor: 'rgba(0, 0, 0, .03)',
//     borderBottom: '1px solid rgba(0, 0, 0, .125)',
//     marginBottom: -1,
//     minHeight: 56,
//     '&$expanded': {
//       minHeight: 56,
//     },
//   },
//   content: {
//     '&$expanded': {
//       margin: '12px 0',
//     },
//   },
//   expanded: {},
// })(MuiAccordionSummary);

// const AccordionDetails = withStyles((theme) => ({
//   root: {
//     padding: theme.spacing(2),
//   },
// }))(MuiAccordionDetails);



const useStyles = makeStyles(theme => ({
    root: { display: 'flex' },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      width: '840px',
      padding: theme.spacing(3, 8, 3, 0)
    },
    child: {
      alignSelf: 'center'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch'
    },
    accordion: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    accordionDetails: {
      padding: theme.spacing(2),
    },
    divEdit: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    buttonEdit: {
      width: '40%',
      margin: 5
    },

  }))



const ShowSong = ({ songs }) => {
  const classes = useStyles()
  let { id } = useParams()
  const [ song ] = useState(songs[id])




  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };


  return (
    <div className={classes.root}>
      <Drawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        

        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container
            maxWidth='lg'
            style={{
              boxShadow: '0 0 10px #2196f3, 0 0 20px #2196f3, 0 0 20px #2196f3',
              borderRadius: '20px'
            }}
          >
            <Box color="primary">
              <br />

<Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className={classes.accordion}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Collapsible Group Item #1</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Collapsible Group Item #2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Collapsible Group Item #3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>


      </Box>
      <br />
      <div className={classes.divEdit}>
            <Button 
              // onClick={()=>{history.push(`/transactions/${id}/edit`)}} 
              variant='contained' color='primary' 
              className={classes.buttonEdit} 
              type='Link'
            >
            Edit
            </Button>
            <Button 
              className={classes.buttonEdit} 
              // onClick={handleDelete} 
              variant='contained' 
              color='primary' 
              type='Link' 
            >
            Delete
            </Button>
          </div>

          <div style={{ margin: 0, padding: 14 }}>
            <Button 
              // onClick={()=>history.push("/transactions")}
              variant='contained' 
              color='primary' 
              type='Link' 
              fullWidth
            >
            Back
            </Button>
          </div>
        </Container>
        </ThemeProvider>
      </main>
    </div>
  )
}

export default ShowSong
