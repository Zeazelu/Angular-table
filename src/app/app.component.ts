import { Component, ElementRef, ViewChild } from '@angular/core';
import raports from './files/raport.json';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tabelka';
  ngOnInit(){
    this.count()
    this.count2()
    this.count3()
    this.count4()
    this.count5()
    this.count6()
    this.count7()
    this.count8()
    this.count9()
    this.count10()
    this.count11()
    this.count12()
    this.count13()
  }
  raportList:
  {
    lp: string,
    id: string,
    client: string,
    contractNumber: string,
    fkNumber: string,
    redemptionOfRepayments: string,
    sumOfRepayments: string,
    capital: string,
    contractualTermInterest: string,
    overdueContractualInterest: string,
    sumOfContractualInterest: string,
    penaltyInterest: string,
    interestInCourt: string,
    totalInterest: string,
    commission: string,
    bailiffCommission: string,
    overpaymentOfCapitalPeriod: string,
    othersInCourt: string

  } [] = raports;
  selectedColumns: string[] = []; 

  sum1 = 0.00;
  sum2 = 0.00;
  sum3 = 0.00;
  sum4 = 0.00;
  sum5 = 0.00;
  sum6 = 0.00;
  sum7 = 0.00;
  sum8 = 0.00;
  sum9 = 0.00;
  sum10 = 0.00;
  sum11 = 0.00;
  sum12 = 0.00;
  sum13 = 0.00;

  count() {
    this.sum1 = this.raportList.reduce((acc, val) => {
      return acc + parseFloat(val.redemptionOfRepayments);
    }, 0.00);
  }
  count2() {
    this.sum2 = this.raportList.reduce((acc, val) => {
      return acc + parseFloat(val.sumOfRepayments);
    }, 0.00);
  }
  count3() {
    this.sum3 = this.raportList.reduce((acc, val) => {
      return acc + parseFloat(val.capital);
    }, 0.00);
  }
  count4() {
    this.sum4 = this.raportList.reduce((acc, val) => {
      return acc + parseFloat(val.contractualTermInterest);
    }, 0.00);
  }
  count5() {
    this.sum5 = this.raportList.reduce((acc, val) => {
      return acc + parseFloat(val.overdueContractualInterest);
    }, 0.00);
  }
  count6() {
    this.sum6 = this.raportList.reduce((acc, val) => {
      return acc + parseFloat(val.sumOfContractualInterest);
    }, 0.00);
  }
  count7() {
    this.sum7 = this.raportList.reduce((acc, val) => {
      return acc + parseFloat(val.penaltyInterest);
    }, 0.00);
  }
  count8() {
    this.sum8 = this.raportList.reduce((acc, val) => {
      return acc + parseFloat(val.interestInCourt);
    }, 0.00);
  }
  count9() {
    this.sum9 = this.raportList.reduce((acc, val) => {
      return acc + parseFloat(val.totalInterest);
    }, 0.00);
  }
  count10() {
    this.sum10 = this.raportList.reduce((acc, val) => {
      return acc + parseFloat(val.commission);
    }, 0.00);
  }
  count11() {
    this.sum11 = this.raportList.reduce((acc, val) => {
      return acc + parseFloat(val.bailiffCommission);
    }, 0.00);
  }
  count12() {
    this.sum12 = this.raportList.reduce((acc, val) => {
      return acc + parseFloat(val.overpaymentOfCapitalPeriod);
    }, 0.00);
  }
  count13() {
    this.sum13 = this.raportList.reduce((acc, val) => {
      return acc + parseFloat(val.othersInCourt);
    }, 0.00);
  }

  @ViewChild('content', {static:false}) el!: ElementRef

  downloadFile() {
    const data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.raportList));
    const a = document.createElement('a');
    a.href = 'data:' + data;
    a.download = 'raport.json';
    a.click();
  }
  
makePdf() {
  const date = new Date().toLocaleString();
  if(this.selectedColumns.length > 5) {
    const pdf = new jsPDF("landscape", "mm", [350, 210]);
    const header = function(data: any) {
      pdf.setFontSize(12);
      pdf.text('Raport splat klientow (PBaza) Prog. 20T_07 utworzony', 110, 15);
      pdf.text(date, 215, 15);
      pdf.text('Za okres: Od wlacznie 2022-12-02 Do 2022-12-21 wlacznie' , 125, 30);
      pdf.text('Sprawdzil..................................', 15, 100);
      pdf.text('Zatwierdzil..................................', 15, 115);
    };
    
    (pdf as any).autoTable({ html: '#content', didDrawPage: header, startY: 40, });
    pdf.save('table.pdf');
    } else {
    const pdf = new jsPDF();
    const header = function(data: any) {
      pdf.setFontSize(12);
      pdf.text('Raport splat klientow (PBaza) Prog. 20T_07 utworzony' , 40, 15);
      pdf.text(date, 145, 15);
      pdf.text('Za okres: Od wlacznie 2022-12-02 Do 2022-12-21 wlacznie' , 50, 20);
      pdf.text('Sprawdzil..................................', 15, 100);
      pdf.text('Zatwierdzil..................................', 15, 115);
    };
    
    (pdf as any).autoTable({ html: '#content', didDrawPage: header, startY: 40, });
    pdf.save('table.pdf');
    }
  }
  excelHeaders:string[] = ["Name","Age","Email","Contact Number","Location"];
  makeExcel() : void 
  {
    let element = document.getElementById('content');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, "table.xlsx");
  }
}

