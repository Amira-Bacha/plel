import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import { darken, fade, lighten } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import classNames from 'clsx';
import {
  Scheduler,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  Resources,
  DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';
import WorkIcon from '@mui/icons-material/Work';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarIcon from '@mui/icons-material/Star';
import { withStyles } from '@material-ui/core/styles';
import { owners } from './demo-data/tasks';
import ColorLens from '@material-ui/icons/ColorLens';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import user from './index.jsx'

// const trains = JSON.parse(localStorage.getItem("calendarData"))? JSON.parse(localStorage.getItem("calendarData")): []

const Data = JSON.parse(localStorage.getItem("calendarData"))?  JSON.parse(localStorage.getItem("calendarData")).map(c=>{
  return {
    id: c._id,
    title: c.Title,
    startDate: new Date(c.Date[0][0]),
    endDate: new Date(c.Date[0][1]),
    ownerId: 0,

  }
}): []


const appointments = [
  {
    id: 0,
    title: 'Watercolor Landscape',
    startDate: new Date(2022, 5, 23, 9, 30),
    endDate: new Date(2022, 5, 25, 11, 30),
    ownerId: 1,
  },  {
    id: 2,
    title: 'Recruiting students',
    startDate: new Date(2022, 1, 9, 12, 0),
    endDate: new Date(2022, 1, 9, 13, 0),
    ownerId: 2,
  }, {
    id: 3,
    title: 'Oil Painting',
    startDate: new Date(2022, 1, 18, 14, 30),
    endDate: new Date(2022, 1, 18, 15, 30),
    ownerId: 2,
  }, {
    id: 4,
    title: 'Open Day',
    startDate: new Date(2022, 1, 20, 12, 0),
    endDate: new Date(2022, 1, 20, 13, 35),
    ownerId: 6,
  }, {
    id: 5,
    title: 'Watercolor Landscape',
    startDate: new Date(2022, 1, 6, 13, 0),
    endDate: new Date(2022, 1, 6, 14, 0),
    
    ownerId: 2,
  }, {
    id: 6,
    title: 'Meeting of Instructors',
    startDate: new Date(2022, 0, 28, 12, 0),
    endDate: new Date(2022, 0, 28, 12, 30),
    
    ownerId: 5,
  }, {
    id: 7,
    title: 'Oil Painting for Beginners',
    startDate: new Date(2022, 1, 3, 11, 0),
    endDate: new Date(2022, 1, 3, 12, 0),
    
    ownerId: 3,
  }, {
    id: 8,
    title: 'Watercolor Workshop',
    startDate: new Date(2022, 1, 9, 11, 0),
    endDate: new Date(2022, 1, 9, 12, 0),
    ownerId: 3,
  },{
    id: 9,
    title: 'test calendar',
    startDate: new Date(2022, 1, 2, 9, 30),
    endDate: new Date(2022, 1, 4, 11, 30),
    ownerId: 1,
}, {
  id: 10,
  title: 'test calendar',
  startDate: new Date(2022, 0, 26, 14, 30),
  endDate: new Date(2022, 1, 27, 16, 0),
  ownerId: 1,
}, 
{
  id: 11,
  title: 'test calendar',
  startDate: new Date(2022, 0, 1, 14, 30),
  endDate: new Date(2022, 0, 1, 16, 0),
  ownerId: 1,
}, 
{
  id: 12,
  title: 'test calendar',
  startDate: new Date(2022, 0, 1, 14, 30),
  endDate: new Date(2022, 0, 1, 16, 0),
  ownerId: 1,
},{
  id: 13,
  title: 'test calendar',
  startDate: new Date(2022, 0, 1, 14, 30),
  endDate: new Date(2022, 0, 1, 16, 0),
  ownerId: 1,
},  {
  id: 14,
  title: 'Watercolor Landscape',
  startDate: new Date(2022, 1, 6, 13, 0),
  endDate: new Date(2022, 1, 6, 14, 0),
  
  ownerId: 2,
}, {
  id: 15,
  title: 'Watercolor Landscape',
  startDate: new Date(2022, 1, 6, 13, 0),
  endDate: new Date(2022, 1, 6, 14, 0),
  
  ownerId: 2,
},
];

const resources = [{
  fieldName: 'ownerId',
  title: 'Owners',
  instances: owners,
}];

const getBorder = theme => (`1px solid ${
  theme.palette.type === 'light'
    ? lighten(fade(theme.palette.divider, 1), 0.88)
    : darken(fade(theme.palette.divider, 1), 0.68)
}`);

const DayScaleCell = props => (
  <MonthView.DayScaleCell {...props} style={{ textAlign: 'center', fontWeight: 'bold' }} />
);

const styles = theme => ({
  cell: {
    color: '#78909C!important',
    position: 'relative',
    userSelect: 'none',
    verticalAlign: 'top',
    padding: 0,
    height: 100,
    borderLeft: getBorder(theme),
    '&:first-child': {
      borderLeft: 'none',
    },
    '&:last-child': {
      paddingRight: 0,
    },
    'tr:last-child &': {
      borderBottom: 'none',
    },
    '&:hover': {
      backgroundColor: 'white',
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
  },
  text: {
    padding: '0.5em',
    textAlign: 'center',
  },
  nothing: {
    color: '#A9A9A9',
  },
  nothingBack: {
    backgroundColor: '#E1E1E1',
  },
  workHard: {
    color: '#FF5858',
  },
  workMedium: {
    color: '#4B9EFF',
  },
  empty: {
    color: '#A9A9A9',
  },
  workHardBack: {
    border:'.5px solid white',

    backgroundColor: '#FFE7E7',
  },
  workMediumBack: {
    border:'.5px solid white',

    backgroundColor: '#C2DEFF',
  },
  emptyBack: {
    border:'.5px solid white',
    backgroundColor: '#E1E1E1',
  },
  opacity: {
    opacity: '0.5',
  },
  appointment: {
    borderRadius: '10px',
    '&:hover': {
      opacity: 0.6,
    },
  },
  apptContent: {
    '&>div>div': {
      whiteSpace: 'normal !important',
      lineHeight: 1.2,
    },
  },
  flexibleSpace: {
    flex: 'none',
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  tooltipContent: {
    padding: theme.spacing(3, 1),
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
    boxSizing: 'border-box',
    width: '400px',
  },
  tooltipText: {
    ...theme.typography.body2,
    display: 'inline-block',
  },
  title: {
    ...theme.typography.h6,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  icon: {
    color: theme.palette.action.active,
    verticalAlign: 'middle',
  },
  circle: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    verticalAlign: 'super',
  },
  textCenter: {
    textAlign: 'center',
  },
  dateAndTitle: {
    lineHeight: 1.1,
  },
  titleContainer: {
    paddingBottom: theme.spacing(2),
  },
  container: {
    paddingBottom: theme.spacing(1.5),
  },
});

const DayState = ({ classes, id }) => {
  if(id===0)
      return <CalendarTodayIcon className={classes.empty} fontSize="large" />;
  if(id<=2 && id>=1)
      return <WorkIcon className={classes.workMedium} fontSize="large" />;
  if(id>2)
      return <WorkIcon className={classes.workHard} fontSize="large" />;
  
};



// #FOLD_BLOCK
const CellBase = React.memo(({
  classes,
  startDate,
  formatDate,
  otherMonth,
  // #FOLD_BLOCK
}) => {
  var courseNbDay = 0
  Data.map(op=>{
   
    if(( (startDate>op.startDate) && (startDate<op.endDate) ) || (startDate.getDate()===op.startDate.getDate() && startDate.getMonth()===op.startDate.getMonth()) || (startDate.getDate()===op.endDate.getDate() && startDate.getMonth()===op.endDate.getMonth()) ){
      courseNbDay+=1
      console.log('op.startDate.getDate(): ',op.startDate.getDate())
      console.log('startDate.getDate(): ',startDate.getDate())
      console.log('startDate : ',typeof(startDate))
      console.log('otherMonth: ',otherMonth)
    }
  })
  const iconId = courseNbDay;
  console.log(iconId)
  const isFirstMonthDay = startDate.getDate() === 1;
  const formatOptions = isFirstMonthDay
    ? { day: 'numeric', month: 'long' }
    : { day: 'numeric' };
  
  return (
    <TableCell
      tabIndex={0}
      className={classNames({
        [classes.cell]: true,
        [classes.emptyBack]: iconId === 0,
        [classes.workMediumBack]: iconId <=2 && iconId>0,
        [classes.workHardBack]: iconId >2,
        [classes.opacity]: otherMonth,
      })}
    >
      <div className={classes.content}>
        <DayState classes={classes} id={iconId} />
      </div>
      <div className={classes.text}>
        {formatDate(startDate, formatOptions)}
      </div>
    </TableCell>
  );
  courseNbDay = 0

});

const TimeTableCell = withStyles(styles, { name: 'Cell' })(CellBase);

const Appointment = withStyles(styles, { name: 'Appointment' })(({ classes, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    className={classes.appointment}
  />
));

const AppointmentContent = withStyles(styles, { name: 'AppointmentContent' })(({ classes, ...restProps }) => (
  <Appointments.AppointmentContent {...restProps} className={classes.apptContent} />
));

const FlexibleSpace = withStyles(styles, { name: 'ToolbarRoot' })(({ classes, ...restProps }) => (
  <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
    {/* <div className={classes.flexContainer}>
      <AccountCircleIcon fontSize="large" htmlColor="#FF7043" />
      <Typography variant="h5" style={{ marginLeft: '10px' }}><user/></Typography>
    </div> */}
  </Toolbar.FlexibleSpace>
));

export default class Demo extends React.PureComponent {
  // #FOLD_BLOCK
  constructor(props) {
    super(props);

    this.state = {
      data: Data,
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

  // #FOLD_BLOCK
  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }
  
  render() {
    const { data } = this.state;
    const date = (new Date()).getFullYear()+'-'+((new Date()).getMonth()+1)+'-'+(new Date()).getDate()
    return (
      <Paper>
        <Scheduler
          data={data}
        >
          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <ViewState
            defaultCurrentDate={date}
          />

          <MonthView
            timeTableCellComponent={TimeTableCell}
            dayScaleCellComponent={DayScaleCell}
          />

          <Appointments
            appointmentComponent={Appointment}
            appointmentContentComponent={AppointmentContent}
          />
          <Resources
            data={resources}
          />

          <Toolbar
            flexibleSpaceComponent={FlexibleSpace}
          
          />
          <DateNavigator />

          <EditRecurrenceMenu />
          <AppointmentTooltip
            showCloseButton
            showDeleteButton
            showOpenButton
          />
          <AppointmentForm />
          <DragDropProvider />
        </Scheduler>
      </Paper>
    );
  }
}
