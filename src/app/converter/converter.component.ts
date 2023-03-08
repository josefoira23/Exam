import { Component, OnInit } from '@angular/core';
import { ConvertService } from '../shared/services/ConvertService';
import { interval, timer } from 'rxjs';
import { Observable } from 'rxjs';
import { outputAst } from '@angular/compiler';
import { clearTimeout } from 'timers';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  constructor(private service:ConvertService) { }

  InputText:any;
  OutputText:any;
  characters:any;
  ButtonDisabled = false;
  cancelled =false;
  timeout:any;
  finished = false;
  ngOnInit(): void {
  }
  
  RealTimeConvertString(){
    var string = this.InputText;
    if(this.finished){

      this.service.ConvertString(string).subscribe({
        next: (response:any) => {
          this.OutputText = response;
  
        },
          error: (err:any) => {
            console.log(err)
          },
      })
    }
  }

  ConvertString(string:any){
    this.service.ConvertString(string).subscribe({
      next: (response:any) => {
        this.OutputText = "";
        this.characters = "";
        var chars = response.split('');

        for(var i = 0;i < response.length;i++)
        {

          this.Transaction(response,i);
        }


      },
        error: (err:any) => {
          console.log(err)
        },
    })
  }

  Transaction(response:any,index:any){
    // if(index < response.length && index != 0){

      this.timeout = setTimeout(() => {
        if(!this.cancelled){

          this.characters= response[index];
          this.OutputText += this.characters;
        }

        if(index == response.length-1){
          this.ButtonDisabled = false;
          this.finished = true;
        }
        
      },  (Math.random() + index) * (5000 - 1000) - (index *1000));
      
    // }else{
      
    //   this.characters= response[index];
    //   this.OutputText += this.characters;
    // }
  }
  
  submit(){
    this.finished = false;
    this.ButtonDisabled = true;
    this.cancelled= false;
    this.ConvertString(this.InputText);
  }
  
  cancel(){
    this.ButtonDisabled = false;
    this.finished = false;
    this.cancelled= true;
    clearTimeout(this.timeout);
    clearTimeout(this.timeout)
  }

}
