import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppService } from './app.service';
import 'rxjs/Rx';
declare const saveAs: any;
@Component({
    selector: 'my-app',
    template: '<button type="submit" (click)="downloadFile()">download</button><img src="{{test}}"/>',
    providers: [Http]
})
export class AppComponent {
    test: string;
    constructor(public appService: AppService) {
    }

    downloadFile() {
        var reader = new FileReader();
        this.appService.downloadfile()
            .subscribe((data) => {
                let image = window.btoa(data);
                var outputImg = document.createElement('img');
                outputImg.src = 'data:image/png;base64,' + data;

                // append it to your page
                document.body.appendChild(outputImg);
            },
            error => console.log("Error downloading the file."),
            () => console.log('Completed file download.'));
        //     .subscribe((res) => {
        //         debugger;
        //         reader.readAsDataURL(res)
        //     },
        //     error => console.log("Error downloading the file."),
        //     () => console.log('Completed file download.'));

        // reader.onloadend = function (e) {
        //     debugger;
        //     window.open(reader.result, 'Excel', 'width=20,height=10,toolbar=0,menubar=0,scrollbars=no');
        // }
    }
}
