import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppService } from './app.service';
import { Registration } from './registration.model';
import 'rxjs/Rx';
declare const escape: any;
declare const saveAs: any;
@Component({
    selector: 'my-app',
    template: '<button type="submit" (click)="downloadFile()">Download registration data in CSV</button><img src="{{test}}"/>',
    providers: [Http]
})
export class AppComponent {
    test: string;
    registration: Registration;
    registrationArray: any = [];
    header = [];
    constructor(public appService: AppService) {
        this.registration = new Registration();
    }

    downloadFile() {
        var reader = new FileReader();

        this.appService.getAll()
            .subscribe((res) => {
                res.forEach((obj: any) => {
                    // // TRIAL NUMBER
                    // if (obj.hasOwnProperty('playerID')) {
                    //     this.registration.playerID = obj.playerID;
                    // }
                    // Age Group
                    if (obj.hasOwnProperty('ageGroup')) {
                        this.registration.ageGroup = obj.ageGroup;
                    }
                    // Reg'n Number
                    if (obj.hasOwnProperty('_id')) {
                        this.registration._id = obj._id;
                    }
                    // Date Of Application
                    if (obj.hasOwnProperty('dateOfApplication')) {
                        this.registration.dateOfApplication = obj.dateOfApplication;
                    }
                    // First Name
                    // Family Name
                    if (obj.hasOwnProperty('playerName')) {

                        let name = obj.playerName.split(" ");
                        let fname = "";
                        let lname = " ";
                        if (name.length > 0) {
                            name.forEach(function (item: any, i: any) {
                                if (i == 0) {
                                    fname = item;
                                }
                                else {
                                    lname = lname + " " + item;
                                }
                            });
                        }
                        this.registration.givenName = fname;
                        this.registration.familyName = lname.trim();
                    }
                    // Date Of Birth
                    if (obj.hasOwnProperty('birthDate')) {
                        this.registration.birthDate = obj.birthDate;
                    }
                    // FFA Registration Number
                    if (obj.hasOwnProperty('fFANumber')) {
                        this.registration.fFANumber = obj.fFANumber;
                    }

                    // Preferred Playing Position
                    if (obj.hasOwnProperty('preferredPlayingPosition')) {
                        this.registration.preferredPlayingPosition = this.getPreferredPlayingPosition(obj.preferredPlayingPosition);
                    }

                    // Previous Club (2016 - Name And Division)
                    // Previous Club (2015 - Name And Division)
                    // Details Of Current Suspensions
                    // Details Of Injuries    
                    if (obj.hasOwnProperty('playingHistory') && obj.playingHistory != null) {
                        if (obj.playingHistory.hasOwnProperty('previousClub2016')) {
                            if (obj.playingHistory.previousClub2016) {
                                this.registration.previousClub2016 = obj.playingHistory.previousClub2016.replace(/,/g, " ");
                            }
                        }
                        if (obj.playingHistory.hasOwnProperty('previousClub2015')) {
                            if (obj.playingHistory.previousClub2015) {
                                this.registration.previousClub2015 = obj.playingHistory.previousClub2015.replace(/,/g, " ");
                            }
                        }
                        if (obj.playingHistory.hasOwnProperty('suspensionsDetails')) {
                            if (obj.playingHistory.suspensionsDetails) {
                                this.registration.suspensionsDetails = obj.playingHistory.suspensionsDetails.replace(/[\n\r]/g, "").replace(/,/g, " ");
                            }
                        }
                        if (obj.playingHistory.hasOwnProperty('injuriesDetails')) {
                            if (obj.playingHistory.injuriesDetails) {
                                this.registration.injuriesDetails = obj.playingHistory.injuriesDetails.replace(/[\n\r]/g, "").replace(/,/g, " ");
                            }
                        }
                    }

                    // Player Residential Address
                    if (obj.hasOwnProperty('residentialAddress')) {
                        if (obj.residentialAddress) {
                            this.registration.residentialAddress = obj.residentialAddress.replace(/,/g, " ");
                        }
                    }
                    // Player Home Number
                    if (obj.hasOwnProperty('homeNumber')) {
                        this.registration.homeNumber = obj.homeNumber;
                    }
                    // Player Mobile Number
                    if (obj.hasOwnProperty('mobileNumber')) {
                        this.registration.mobileNumber = obj.mobileNumber;
                    }
                    // Player Email Adress
                    if (obj.hasOwnProperty('email')) {
                        this.registration.email = obj.email;
                    }

                    // Contact Person Name (1)
                    // Relationship (1)
                    // Contact Number (1)
                    // Email Address (1)
                    if (obj.hasOwnProperty('contactPerson1') && obj.contactPerson1 != null) {
                        if (obj.contactPerson1.hasOwnProperty('personName')) {
                            this.registration.contact1_personName = obj.contactPerson1.personName;
                        }
                        if (obj.contactPerson1.hasOwnProperty('relationship')) {
                            this.registration.contact1_relationship = obj.contactPerson1.relationship;
                        }
                        if (obj.contactPerson1.hasOwnProperty('contactNumber')) {
                            this.registration.contact1_contactNumber = obj.contactPerson1.contactNumber;
                        }
                        if (obj.contactPerson1.hasOwnProperty('email')) {
                            this.registration.contact1_email = obj.contactPerson1.email;
                        }
                    }

                    // Contact Person Name (1)
                    // Relationship (1)
                    // Contact Number (1)
                    // Email Address (1)
                    if (obj.hasOwnProperty('contactPerson2') && obj.contactPerson2 != null) {
                        if (obj.contactPerson2.hasOwnProperty('personName')) {
                            this.registration.contact2_personName = obj.contactPerson2.personName;
                        }
                        if (obj.contactPerson2.hasOwnProperty('relationship')) {
                            this.registration.contact2_relationship = obj.contactPerson2.relationship;
                        }
                        if (obj.contactPerson2.hasOwnProperty('contactNumber')) {
                            this.registration.contact2_contactNumber = obj.contactPerson2.contactNumber;
                        }
                        if (obj.contactPerson2.hasOwnProperty('email')) {
                            this.registration.contact2_email = obj.contactPerson2.email;
                        }
                    }

                    // Player Gender
                    if (obj.hasOwnProperty('gender')) {
                        this.registration.gender = obj.gender;
                    }

                    // Briefly State Your Objectives And Ambitions
                    if (obj.hasOwnProperty('objectivesAmbitions')) {
                        if (obj.objectivesAmbitions) {
                            this.registration.objectivesAmbitions = obj.objectivesAmbitions.replace(/[\n\r]/g, "").replace(/,/g, " ");
                        }
                    }

                    // Details Of School
                    // Details Of Employment
                    if (obj.hasOwnProperty('studyWorkDetails') && obj.studyWorkDetails != null) {
                        if (obj.studyWorkDetails.hasOwnProperty('schoolDetails')) {
                            if (obj.studyWorkDetails.schoolDetails) {
                                this.registration.schoolDetails = obj.studyWorkDetails.schoolDetails.replace(/[\n\r]/g, "").replace(/,/g, " ");
                            }
                        }
                        if (obj.studyWorkDetails.hasOwnProperty('employementDetails')) {
                            if (obj.studyWorkDetails.employementDetails) {
                                this.registration.employementDetails = obj.studyWorkDetails.employementDetails.replace(/[\n\r]/g, "").replace(/,/g, " ");
                            }
                        }
                    }

                    // Academy And:or Trainer - Head Coach Name
                    // Contact Details. (Phone And Or Email)
                    // Details Of Football Trips Arranged By
                    // Destination
                    // Purpose Of Trip
                    // Number Of Sessions Per Week                
                    if (obj.hasOwnProperty('footballAcademyDetails') && obj.footballAcademyDetails != null) {
                        if (obj.footballAcademyDetails.hasOwnProperty('headCoachName')) {
                            this.registration.headCoachName = obj.footballAcademyDetails.headCoachName;
                        }
                        if (obj.footballAcademyDetails.hasOwnProperty('contactDetails')) {
                            if (obj.footballAcademyDetails.contactDetails) {
                                this.registration.contactDetails = obj.footballAcademyDetails.contactDetails.replace(/,/g, " ");
                            }
                        }
                        if (obj.footballAcademyDetails.hasOwnProperty('academicSessionPerWeekCount')) {
                            this.registration.academicSessionPerWeekCount = obj.footballAcademyDetails.academicSessionPerWeekCount;
                        }
                        if (obj.footballAcademyDetails.hasOwnProperty('arrangedBy')) {
                            this.registration.arrangedBy = obj.footballAcademyDetails.arrangedBy;
                        }
                        if (obj.footballAcademyDetails.hasOwnProperty('destination')) {
                            this.registration.destination = obj.footballAcademyDetails.destination;
                        }
                        if (obj.footballAcademyDetails.hasOwnProperty('purposeOfTrip')) {
                            if (obj.footballAcademyDetails.purposeOfTrip) {
                                this.registration.purposeOfTrip = obj.footballAcademyDetails.purposeOfTrip.replace(/[\n\r]/g, "").replace(/,/g, " ");
                            }
                        }
                    }
                    let registrationRow = {};
                    registrationRow = {
                        // playerID: this.registration.playerID,
                        ageGroup: this.registration.ageGroup || " ",
                        _id: this.registration._id || " ",
                        dateOfApplication: this.registration.dateOfApplication || " ",
                        givenName: this.registration.givenName || " ",
                        familyName: this.registration.familyName || " ",
                        birthDate: this.registration.birthDate || " ",
                        fFANumber: this.registration.fFANumber || " ",
                        preferredPlayingPosition: this.registration.preferredPlayingPosition || " ",

                        previousClub2016: this.registration.previousClub2016 || " ",
                        previousClub2015: this.registration.previousClub2015 || " ",
                        suspensionsDetails: this.registration.suspensionsDetails || " ",
                        injuriesDetails: this.registration.injuriesDetails || " ",

                        residentialAddress: this.registration.residentialAddress || " ",
                        homeNumber: this.registration.homeNumber || " ",
                        mobileNumber: this.registration.mobileNumber || " ",
                        email: this.registration.email || " ",

                        contact1_personName: this.registration.contact1_personName || " ",
                        contact1_relationship: this.registration.contact1_relationship || " ",
                        contact1_contactNumber: this.registration.contact2_contactNumber || " ",
                        contact1_email: this.registration.contact2_email || " ",

                        contact2_personName: this.registration.contact2_personName || " ",
                        contact2_relationship: this.registration.contact2_relationship || " ",
                        contact2_contactNumber: this.registration.contact2_contactNumber || " ",
                        contact2_email: this.registration.contact2_email || " ",

                        gender: this.registration.gender || " ",
                        objectivesAmbitions: this.registration.objectivesAmbitions || " ",

                        schoolDetails: this.registration.schoolDetails || " ",
                        employementDetails: this.registration.employementDetails || " ",

                        headCoachName: this.registration.headCoachName || " ",
                        contactDetails: this.registration.contactDetails || " ",
                        arrangedBy: this.registration.arrangedBy || " ",
                        destination: this.registration.destination || " ",
                        purposeOfTrip: this.registration.purposeOfTrip || " ",
                        academicSessionPerWeekCount: this.registration.academicSessionPerWeekCount || " "
                    }
                    this.registrationArray.push(registrationRow);
                });

                // Set header
                this.header.push("Age Group");
                this.header.push("Reg'n Number");
                this.header.push("Date Of Application");
                this.header.push("First Name");
                this.header.push("Family Name");
                this.header.push("Date Of Birth");
                this.header.push("FFA Registration Number");
                this.header.push("Preferred Playing Position");
                this.header.push("Previous Club (2016 - Name And Division)");
                this.header.push("Previous Club (2015 - Name And Division)");
                this.header.push("Details Of Current Suspensions");
                this.header.push("Details Of Injuries");
                this.header.push("Player Residential Address");
                this.header.push("Player Home Number");
                this.header.push("Player Mobile Number");
                this.header.push("Player Email Adress");
                this.header.push("Contact Person Name (1)");
                this.header.push("Relationship (1)");
                this.header.push("Contact Number (1)");
                this.header.push("Email Address (1)");
                this.header.push("Contact Person Name (2)");
                this.header.push("Relationship (2)");
                this.header.push("Contact Number (2)");
                this.header.push("Email Address (2)");
                this.header.push("Player Gender");
                this.header.push("Briefly State Your Objectives And Ambitions");
                this.header.push("Details Of School");
                this.header.push("Details Of Employment");
                this.header.push("Academy And:or Trainer - Head Coach Name");
                this.header.push("Contact Details. (Phone And Or Email)");
                this.header.push("Details Of Football Trips Arranged By");
                this.header.push("Destination");
                this.header.push("Purpose Of Trip");
                this.header.push("Number Of Sessions Per Week");


                console.log("this.registration");
                console.log(this.registrationArray);
                let jsonData = this.ConvertToCSV(this.registrationArray);
                let header = this.header;
                console.log("header");
                console.log(header);
                let joinHeader = header.join();
                let blob = new Blob([joinHeader + "\r\n" + jsonData], { type: 'text/csv' })
                let a = document.createElement('a');
                a.download = 'Registration.csv';
                a.href = window.URL.createObjectURL(blob);
                a.style.display = "none";
                a.click();
            },
            error => console.log("Error downloading the file."),
            () => console.log('Completed file download.'));
    }

    getPreferredPlayingPosition(position) {
        switch (position) {
            case 1:
                return "#1 : Goal Keeper";
            case 2:
                return "#2 : Defence";
            case 3:
                return "#3 : Defence";
            case 4:
                return "#4 : Defence";
            case 5:
                return "#5 : Defence";
            case 6:
                return "#6 : Midfield";
            case 7:
                return "#7 : Attack";
            case 8:
                return "#8 : Midfield";
            case 9:
                return "#9 : Attack";
            case 10:
                return "#10 : Midfield";
            case 11:
                return "#11 : Attack";
            default:
                return "No Position";
        }
    }

    ConvertToCSV(objArray: any) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') {
                    line += ','
                }

                line += array[i][index];
            }

            str += line + '\r\n';
        }

        return str;
    }
}
