import React from 'react'
import { useHistory } from 'react-router-dom'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import TablePagination from '@material-ui/core/TablePagination'
import { lighten, makeStyles, ThemeProvider } from '@material-ui/core/styles'
import TableContainer from '@material-ui/core/TableContainer'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import FilterNoneIcon from '@material-ui/icons/FilterNone'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import DeleteIcon from '@material-ui/icons/Delete'
import Checkbox from '@material-ui/core/Checkbox'
import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'
import Toolbar from '@material-ui/core/Toolbar'
import Switch from '@material-ui/core/Switch'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { theme } from '../pages/theme'


function descendingComparator (a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator (order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort (array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

const headCells = [
  { id: 'is_favorite', numeric: false, disablePadding: false, label: 'Fav'},
  { id: 'name', numeric: false, disablePadding: false, label: 'Song' },
  { id: 'artist', numeric: false, disablePadding: false, label: 'Artist' },
  { id: 'time', numeric: false, disablePadding: false, label: 'Time' },
]

function EnhancedTableHead (props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead >
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all transactions' }}
            style={{color:'white'}}
          />
        </TableCell>
          {headCells.map(headCell => (
          <TableCell
            style={{ fontSize: 'large' }}
            key={headCell.id}
            align='left'
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
          <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : 'asc'}
            onClick={createSortHandler(headCell.id)}
          >
          {headCell.label}
          {orderBy === headCell.id ? (
              <span className={classes.visuallyHidden}>
              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
    ? {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85)
    }:{
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.dark
    },
  title: {
    flex: '1 1 100%'
  }
}))

const EnhancedTableToolbar = props => {

  const classes = useToolbarStyles()
  const tunes = ['Beastage Tunes', 'Slamming Rhythms', 'Buzzin Vibes']
  const { numSelected, selectedArray, deleteTransaction , setSelected, history} = props

  const handleDeleteIcon = () =>{
    setSelected([])
    // deleteTransaction(selectedArray)
    history.push("/songs")
  }
  return (
    <Toolbar
      className={clsx(classes.root, {
      [classes.highlight]: numSelected > 0
      })}
    >
    {numSelected > 0 ? (
    <Typography
      className={classes.title}
      color='inherit'
      variant='subtitle1'
      component='div'
    >
    {numSelected} selected
    </Typography>
    ) : (
    <Typography
      className={classes.title}
      variant='h6'
      id='tableTitle'
      component='div'
    >
      {tunes[Math.floor(Math.random()*tunes.length)]}

    </Typography>
    )}
    {numSelected > 0 ? (
    <Tooltip title='Delete' style={{color:'#2196f3'}}>
      <IconButton aria-label='delete'>
        <DeleteIcon type="button" onClick={handleDeleteIcon}/>
      </IconButton>
    </Tooltip>
    ) : (
    <Tooltip title='Select to delete' style={{color:'#2196f3'}}>
      <IconButton aria-label='select-delete'>
        <FilterNoneIcon />
      </IconButton>
    </Tooltip>
    )}
  </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    width: 780
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}))



//  ================================
//            MAIN FUNCTION
//  ================================

export default function EnhancedTable ({ songs }) {

  const   rows  = songs
  const history = useHistory()

  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [orderBy, setOrderBy] = React.useState('name')
  const [selected, setSelected] = React.useState([])
  const [order, setOrder] = React.useState('asc')
  const [dense, setDense] = React.useState(false)
  const [page, setPage] = React.useState(0)
  const classes = useStyles()

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, id) => {

    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = event => {
    setDense(event.target.checked)
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)
  const isSelected = id => selected.indexOf(id) !== -1

  return (
    <ThemeProvider theme={theme}>
    <div className={classes.root} >
      <Paper className={classes.paper}>
        <div style={{ boxShadow: '0 0 10px #2196f3, 0 0 20px #2196f3, 0 0 20px #2196f3',borderRadius: '10px'}}>
        <EnhancedTableToolbar 
          // deleteTransaction={deleteTransaction} 
          numSelected={selected.length} 
          setSelected={setSelected}
          selectedArray={selected} 
          history={history}
        />
        <TableContainer>
          <Table
            size={dense ? 'small' : 'medium'}
            aria-labelledby='tableTitle'
            aria-label='enhanced table'
            className={classes.table}
          >
          <EnhancedTableHead
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            numSelected={selected.length}
            rowCount={rows.length}
            classes={classes}
            orderBy={orderBy}
            order={order}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id)
                const labelId = `enhanced-table-checkbox-${index}`
                const colorSong = (Math.random() > 0.5) ? '#02075d' : 'white'
                const colorTime = (Math.random() > 0.5) ? '#42A4AE' : 'gold'
                const favorite = row.is_favorite === false ? '☆': '★'
                return (
                <TableRow
                    hover
                    onChange={event => handleClick(event, row.id)}
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.transactionId}
                    selected={isItemSelected}
                >
                  <TableCell padding='checkbox'>
                    <Checkbox
                      checked={isItemSelected}
                      inputProps={{ 'aria-labelledby': labelId }}
                      style={{color:'white'}}
                    />
                  </TableCell>
                  <TableCell
                    align='left'
                    style={{ color: 'yellow' }}
                  >
                    {favorite}
                  </TableCell>
          
                  <TableCell
                    component='th'
                    align='left'
                    id={labelId}
                    scope='row'
                    padding='none'
                  >
                  <a href={`/songs/${row.id}`} style={{color: `${colorSong}`, fontSize: '13px',textAlign:'left'}}>
                    {row.name}
                  </a>
                  </TableCell>
                  <TableCell align='left' style={{ color: '#C8F8F0' }}>
                    {row.artist}
                  </TableCell>
                  <TableCell
                    align='rigth'
                    style={{ color: `${colorTime}`, fontSize: '12px' }}
                  >
                    {row.time}
                  </TableCell>
                  {/* <TableCell
                    align='left'
                    style={{ color: '#1a1c1e', fontSize: '12px' }}
                  >
                    {row.date}
                  </TableCell> */}
                </TableRow>
                )
              })}
            {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
            )}
          </TableBody>
         </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} color="primary"/>}
        label='Dense padding'
      />
    </div>
    </ThemeProvider>
  )
}

