import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
import { ApiService } from 'src/app/service/api.service';
import { Booking } from 'src/app/model/booking';
@Component({
  selector: 'app-calender-view',
  templateUrl: './calender-view.component.html',
  styleUrls: ['./calender-view.component.css']
})
export class CalenderViewComponent implements OnInit {

 
  booking!: Booking
  dialogVisible = false
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();


  actions: CalendarEventAction[] = [
    {
      label: 'View',
      a11yLabel: 'View',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        
        //this.handleEvent('Edited', event);
      },
    }
    
  ];

  
  handleEvent(action: string, event: CalendarEvent): void {
    this.booking = event.meta.bookingObj
    this.dialogVisible = true
  }
  constructor(private apiService: ApiService){}

  events: CalendarEvent[] = []
  ngOnInit(): void {
      this.apiService.getBookings().subscribe(bookings=>{
        bookings.map(booking=>{
          this.events = [
            ...this.events,
            {
              start: new Date(booking.checkInDate),
              end: new Date(booking.checkOutDate),
              title: booking.unit ? booking.unit.name : booking.property?.name + ' (Entire place)' ,
              color: booking.bookingStatus == 'CONFIRMED' ? {...colors['blue']} : { ...colors['red'] },
              actions: this.actions,
              allDay: true,
              resizable: {
                beforeStart: true,
                afterEnd: true,
              },
              draggable: true,
              meta: {bookingObj: booking}
            }
          ]
        })
      })
  }
  
  activeDayIsOpen: boolean = true;



  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }
  

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
