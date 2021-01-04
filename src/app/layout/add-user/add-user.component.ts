import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeService } from './../../shared/services/employe.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
    otherDetailForm: FormGroup;
    employe = {
        _id:'',
        personalDetails:'',
        otherDetails:{},
        familyDetails: {},
        educationDetails: {},
        experience: {},
        reference: {}
    };
    token
    personalDetail: Boolean = false;
    otherDetail: Boolean = false;
    familyDetail: Boolean = false;
    educationDetail: Boolean = false;
    experienceDetail: Boolean = false;
    referenceDetail: Boolean = false;
    personalDetails = {};
    otherDetails = {};
    familyDetails = {};
    educationDetails = {};
    experienceTable = [];
    referenceTable = [];
    newExperience = {};
    newReference = {};

    constructor(private router: Router, private employeService: EmployeService, private fb: FormBuilder) {
        this.createEmployeForm();
    }

    ngOnInit(): void {
        if (localStorage.getItem('token')) {
            this.token = localStorage.getItem('token')
            this.employeService.getEmployeByToken(this.token).subscribe(async (empl)=>{
                this.employe._id = empl.employe._id
                this.employe.personalDetails = empl.employe.personalDetails._id
                console.log(empl)
                this.personalDetails = await {
                    _id: empl.employe.personalDetails._id,
                    firstname: empl.employe.personalDetails.firstname,
                    lastname: empl.employe.personalDetails.lastname,
                    phone: empl.employe.personalDetails.phone,
                    email: empl.employe.personalDetails.username,
                    approved:empl.employe.personalDetails.approved,
                    hrApproval:empl.employe.personalDetails.hrApproval,
                    image:empl.employe.personalDetails.image,  
                };
                this.otherDetails = {
                    designation:'',
                    aadhar: '',
                    pan: '',
                    status: '',
                    doj: '',
                    address: ''
                };
                this.familyDetails = {
                    fathername: '',
                    mothername: '',
                    foccupation: '',
                    moccupation: '',
                    emergency1: '',
                    emergency2: ''
                };
                this.educationDetails = [
                    {
                        course: '10th',
                        organization: '',
                        stream: '',
                        yearofPassing: '',
                        result: ''
                    },
                    {
                        course: '12th',
                        organization: '',
                        stream: '',
                        yearofPassing: '',
                        result: ''
                    },
                    {
                        course: 'graduation',
                        organization: '',
                        stream: '',
                        yearofPassing: '',
                        result: ''
                    },
                    {
                        course: 'pg',
                        organization: '',
                        stream: '',
                        yearofPassing: '',
                        result: ''
                    }
                ];
                this.newExperience = {
                    company: '',
                    designation: '',
                    from: '',
                    to: '',
                    salary: '',
                    contact: ''
                };
                this.experienceTable.push(this.newExperience);
    
                this.newReference = {
                    name: '',
                    email: '',
                    contact: ''
                };
                this.referenceTable.push(this.newReference);
            })
        } else this.router.navigate(['/login']);
    }

    createEmployeForm() {
        this.otherDetailForm = this.fb.group({
            designation:['',[Validators.required,Validators.minLength(2)]],
            aadhar: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
            pan: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
            address: ['', [Validators.required, Validators.minLength(10)]],
            status: ['', [Validators.required]],
            doj: ['', [Validators.required]]
        });
    }

    addExperience(i) {
        this.newExperience = {
            company: '',
            designation: '',
            from: '',
            to: '',
            salary: '',
            contact: ''
        };
        this.experienceTable.push(this.newExperience);
        console.log(this.experienceTable);
    }

    deleteExperience(i) {
        if (this.experienceTable.length == 1) {
            alert('Atleast one row is required');
            return false;
        } else {
            this.experienceTable.splice(i, 1);
            alert('Row Deleted');
        }
    }
    addReference(i) {
        this.newReference = {
            name: '',
            email: '',
            contact: ''
        };
        this.referenceTable.push(this.newReference);
        console.log(this.referenceTable);
    }

    deleteReference(i) {
        if (this.referenceTable.length == 1) {
            alert('Atleast one row is required');
            return false;
        } else {
            this.referenceTable.splice(i, 1);
            alert('Row Deleted');
        }
    }

    async employeeDetails() {
        console.log(this.otherDetailForm)
        console.log('value' + this.otherDetailForm.value,this.otherDetailForm.valid);
        if (this.otherDetailForm.valid) {
            this.employe.otherDetails = this.otherDetailForm.value
            this.employe.familyDetails = this.familyDetails;
            this.employe.educationDetails = this.educationDetails;
            this.employe.experience = this.experienceTable;
            this.employe.reference = this.referenceTable;
            console.log(this.employe);
            this.employeService.createEmploye(this.employe).subscribe((employe) => {
                if (employe.success==true) this.router.navigate(['/viewemployees']);
                else console.log('Not Added');
            });
        }
    }

    hidePersonal() {
        this.personalDetail = !this.personalDetail;
    }
    hideOther() {
        this.otherDetail = !this.otherDetail;
    }
    hideFamily() {
        this.familyDetail = !this.familyDetail;
    }
    hideEducation() {
        this.educationDetail = !this.educationDetail;
    }
    hideExperience() {
        this.experienceDetail = !this.experienceDetail;
    }
    hideReference() {
        this.referenceDetail = !this.referenceDetail;
    }
}
