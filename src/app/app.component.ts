import { Component, ElementRef, ViewChild } from '@angular/core';
import raports from './files/raport.json';
import jsPDF from 'jspdf';
import  'jspdf-autotable';
import * as XLSX from 'xlsx';
import { fontString } from './font/font';
import html2canvas from 'html2canvas';



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

  sums: number[] = Array.from({length: 13}, () => 0);

  count() {
    this.sums[0] = this.raportList.reduce((acc, val) => acc + parseFloat(val.redemptionOfRepayments), 0.00);
  }
  count2() {
    this.sums[1] = this.raportList.reduce((acc, val) => acc + parseFloat(val.sumOfRepayments), 0.00);
  }
  count3() {
    this.sums[2] = this.raportList.reduce((acc, val) => acc + parseFloat(val.capital), 0.00);
  }
  count4() {
    this.sums[3] = this.raportList.reduce((acc, val) => acc + parseFloat(val.contractualTermInterest), 0.00);
  }
  count5() {
    this.sums[4] = this.raportList.reduce((acc, val) =>  acc + parseFloat(val.overdueContractualInterest), 0.00);
  }
  count6() {
    this.sums[5] = this.raportList.reduce((acc, val) => acc + parseFloat(val.sumOfContractualInterest), 0.00);
  }
  count7() {
    this.sums[6] = this.raportList.reduce((acc, val) => acc + parseFloat(val.penaltyInterest), 0.00);
  }
  count8() {
    this.sums[7] = this.raportList.reduce((acc, val) => acc + parseFloat(val.interestInCourt), 0.00);
  }
  count9() {
    this.sums[8] = this.raportList.reduce((acc, val) => acc + parseFloat(val.totalInterest), 0.00);
  }
  count10() {
    this.sums[9] = this.raportList.reduce((acc, val) => acc + parseFloat(val.commission), 0.00);
  }
  count11() {
    this.sums[10] = this.raportList.reduce((acc, val) => acc + parseFloat(val.bailiffCommission), 0.00);
  }
  count12() {
    this.sums[11] = this.raportList.reduce((acc, val) => acc + parseFloat(val.overpaymentOfCapitalPeriod), 0.00);
  }
  count13() {
    this.sums[12] = this.raportList.reduce((acc, val) => acc + parseFloat(val.othersInCourt), 0.00);
  }

  @ViewChild('content', {static:false}) el!: ElementRef

  downloadFile() {
    const data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.raportList));
    const a = document.createElement('a');
    a.href = 'data:' + data;
    a.download = 'raport.json';
    a.click();
  }

    makePdf2() {
      const date = new Date().toLocaleString();
      const element = document.getElementById('pdf')!;
      html2canvas(element, { scale: 3 }).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jsPDF("landscape", "mm", [350, 210]);
        var width = pdf.internal.pageSize.getWidth();
        var height = canvas.height * width / canvas.width;
        pdf.addFileToVFS("Abha.ttf", fontString);
        pdf.addFont('Abha.ttf', 'Abha', 'normal', 'Identity-H');
        pdf.setFont('Abha');
        pdf.setFontSize(12);
        pdf.text('Raport spłat klientów (PBaza) Prog. 20T_07 utworzony', 110, 15);
        pdf.text(date, 210, 15);
        pdf.text('Za okres: Od włącznie 2022-12-02 Do 2022-12-21 włącznie' , 125, 30);
        pdf.addImage(contentDataURL, 'PNG', 0, 50, width, height);
        pdf.text('Sprawdził..................................', 15, 100);
        pdf.text('Zatwierdził..................................', 15, 115);
        pdf.save('table.pdf'); 
       
      });
    }
  
  makeExcel() : void 
  {
    let element = document.getElementById('content');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, "table.xlsx");
  }
}

