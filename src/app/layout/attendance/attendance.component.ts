import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EmployeService } from './../../shared/services/employe.service';
import { AngularCsv } from "angular7-csv/dist/Angular-csv";
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { filter, map } from "rxjs/operators";
import { SimplePlaceholderMapper } from '@angular/compiler/src/i18n/serializers/serializer';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
    countVar = 0;
    countEmp = 0;
    currMonthEmpl = [];
    limitDate = new Date().getDate() + 1;
    empl:''
    date:''
    attendance =[]
    currMonthDetail
    currMonthDetails = [];
    employees = [];
    todaydate = new Date();
    monthNo = this.todaydate.getMonth();
    noOfDays;
    days = [];
    month = this.todaydate.toString().split(' ')[1];
    year = this.todaydate.getFullYear();
    attendances = [];
    exportAttendance=[]
    attendanceType;
    show=false
    myFunction(date?: any) {
        if (date) var today = new Date(date);
        else var today = new Date();
        var month = today.getMonth();
        this.noOfDays = this.daysInMonth(month + 1, today.getFullYear()) - 1;
        this.days = new Array(this.limitDate);
        for (let i = 1; i <= this.limitDate; i++) this.days[i] = i;
        console.log(this.days);
    }
    daysInMonth(month, year) {
        return new Date(year, month, 0).getDate() + 1;
    }
    constructor(private employeService: EmployeService, private cdkRef: ChangeDetectorRef,private http:HttpClient) {}

    ngOnInit(): void {
        this.attendance = new Array(this.noOfDays)
        this.currMonthDetails;
        this.currMonthDetail = { empl: '', attendance: new Array(this.limitDate) };
        this.myFunction();
        this.employeService.getAttendance().subscribe((attendances)=>{
            this.attendances = attendances
            this.getAttendance()
            // attendances.forEach((element) => {
            // var elementMonth = new Date(element.date.split(' ')[0]).toString().split(' ')[1]
            //  if (this.month == elementMonth)
            //         this.currMonthEmpl.push(element);
            // });
            // this.countEmp = this.currMonthEmpl[0].details.length;
            // this.currMonthEmpl[0].details.forEach(detail => {
            //     this.employees.push(detail.employe._id)
            // });
            // this.employees.forEach(employe=>{
            //     this.attendanceType='';
            //     this.date=''
            //     this.empl=''
            //     this.attendance=[]
            //     var att = [];
            //     attendances.forEach(attendance => {
            //         attendance.details.forEach(detail => {
            //             if(detail.employe._id==employe){
            //             this.empl = employe
            //             this.date = attendance.date.split('/')[1]
            //             this.attendanceType = detail.attendanceType
            //             this.attendance[this.date]=this.attendanceType
            //             // console.log('attendanc tuype', this.attendance)
            //             // console.log('attendance in attendance loop',this.attendance[this.date])
            //             att = this.attendance
            //             }
            //         });
            //     });        

            //     // console.log("export attendance of a single emp",this.exportAttendance)
            //     // console.log("attendance final of a single emp", att[this.date])
            //     this.currMonthDetail = {empl:this.empl,attendance:this.attendance}
            //     //console.log('before push',this.currMonthDetail,this.attendance)
            //     this.currMonthDetails.push(this.currMonthDetail)
            //     // console.log('after push',this.currMonthDetails)
            //     this.exportAttendance = this.currMonthDetails
            //     this.show = true;
            // })
        })

            this.display();
    };
       
    
    csvOptions = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Attendance List :',
      useBom: true,
      noDownload: false,
      labels: this.days,
      headers: this.days
    };

    getAttendance(){
        this.currMonthEmpl = []
        this.employees =[]
        this.currMonthDetail = {}
        this.currMonthDetails = []
        console.log(this.attendances)
        this.attendances.forEach((element) => {
            var elementMonth = new Date(element.date.split(' ')[0]).toString().split(' ')[1]
            // console.log(elementMonth,elementMonth==this.month)
             if (this.month == elementMonth)
                    this.currMonthEmpl.push(element);
            });
            console.log(this.currMonthEmpl)
            if(this.currMonthEmpl.length>0){
                this.countEmp = this.currMonthEmpl[0].details.length;
                this.currMonthEmpl[0].details.forEach(detail => {
                    this.employees.push(detail.employe._id)
                });
            }
            this.employees.forEach(employe=>{
                this.attendanceType='';
                this.date=''
                this.empl=''
                this.attendance=[]
                var att = [];
                this.currMonthEmpl.forEach(attendance => {
                    attendance.details.forEach(detail => {
                        if(detail.employe._id==employe){
                        this.empl = employe
                        this.date = attendance.date.split('/')[1]
                        this.attendanceType = detail.attendanceType
                        this.attendance[this.date]=this.attendanceType
                        // console.log('attendanc tuype', this.attendance)
                        // console.log('attendance in attendance loop',this.attendance[this.date])
                        att = this.attendance
                        }
                    });
                });        

                // console.log("export attendance of a single emp",this.exportAttendance)
                // console.log("attendance final of a single emp", att[this.date])
                this.currMonthDetail = {empl:this.empl,attendance:this.attendance}
                //console.log('before push',this.currMonthDetail,this.attendance)
                this.currMonthDetails.push(this.currMonthDetail)
                // console.log('after push',this.currMonthDetails)
                this.exportAttendance = this.currMonthDetails
                this.show = true;
            })
    }

    downloadCSV(){
      //this.dtHolidays : JSONDATA , AttendanceList : CSV file Name, this.csvOptions : file options
      new  AngularCsv(this.exportAttendance, "AttendanceList", this.csvOptions);
    }

    changeMonth(event) {
        var date = new Date(event.target.value);
        this.monthNo = date.getMonth();
        this.month = date.toString().split(' ')[1];
        this.myFunction(date);
        this.getAttendance()
        console.log('Month', this.month);
    }
    // print(a, emp) {
    //     if (this.countVar > this.countEmp * this.noOfDays) return;
    //     console.log(this.countVar);
    //     var currdate = new Date().getDate() + 1;
    //     this.attendanceType = '-';
    //     if (a) {
    //         var date;
    //         if (a >= 0 && a < 10) date = Number('0' + a);
    //         else date = a;
    //         var localDate = new Date(this.year, this.monthNo, date);
    //         if (date < currdate) {
    //             this.currMonthEmpl.forEach(async (object) => {
    //                 var objDate = new Date(object.date.toString().split(' ')[0]);
    //                 console.log(objDate, localDate, objDate > localDate, objDate < localDate);
    //                 if (objDate > localDate == false && objDate < localDate == false) {
    //                     var employe = await object.details.find((detail) => detail.employe == emp);
    //                     if (employe) {
    //                         if (employe.attendanceType.toLowerCase() == 'present') this.attendanceType = 'present';
    //                         if (employe.attendanceType.toLowerCase() == 'absent') this.attendanceType = 'absent';
    //                     } else this.attendanceType = '-';
    //                     console.log('attType', this.attendanceType);
    //                     this.cdkRef.detectChanges();

    //                     // object.details.forEach(element => {
    //                     //     if(element.employe==emp){
    //                     //       console.log('element',element)
    //                     //       if((element.attendanceType.toLowerCase())=='present')
    //                     //       this.attendanceType = 'present'
    //                     //       if(element.attendanceType.toLowerCase()=='absent')
    //                     //       this.attendanceType='absent'
    //                     //     }
    //                     //     else
    //                     //     this.attendanceType=''
    //                     // });
    //                 }
    //             });
    //         }
    //         this.countVar += 1;
    //     }
    // }

    changeAttendance(event, day, empl) {
        if(event.target.value=='-') return
        else{
          var localDate = new Date(this.year, this.monthNo, day).toLocaleString().split(',')[0];
          this.employeService.changeAttendance(localDate, empl, event.target.value).subscribe(async (resp) => {
            if(resp.success==true){
                this.exportAttendance.forEach(emp=>{
                    if(emp.empl==empl)
                        emp.attendance[day]=event.target.value
                })
               console.log(resp);
              }
          });
        }
        // let index = this.currMonthDetails.findIndex(detail=>detail.empl=empl)
        //        this.currMonthDetails[index].attendance[day]=event.target.value
        //        console.log(this.currMonthDetails[index].attendance[day])
               
        // console.log('Type' + employe.attendanceType);
    }

    display(){

        const dataStrem = from(this.attendances)
        const ex = dataStrem.pipe(
            map((data) => {
                return data = {
                    _id: data._id,
                    date: data.date.split(' ')[0],
                    details: data.details,
                    month: '',
                    year: ''
                }
                }),
            map((data)=>{
                return data = {
                    _id: data._id,
                    date: data.date,
                    details: data.details,
                    month: data.date.split('/')[0],
                    year: data.date.split('/')[2]
                }
            }),       
            filter(data => {
                return data.month == 12 && data.year == 2020   
            }),
            )
        ex.subscribe((res) => {
            console.log(res);
        })
    }
    
}
