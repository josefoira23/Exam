import { Component, OnInit } from '@angular/core';
import { ConvertService } from '../shared/services/ConvertService';

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
  timeoutArray:number[] = [];
  ForCancelArray:number[] = [];

  ngOnInit(): void {
  }
  
  RealTimeConvertString(){
    var string = this.InputText;
    if(this.finished && !this.cancelled){

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
    alert("Processing")
    this.timeoutArray = [];
    this.ForCancelArray = [];
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

      this.timeoutArray.push(this.timeout)
      console.log(this.timeoutArray)
  }
  
  submit(){
    this.finished = false;
    this.ButtonDisabled = true;
    this.cancelled= false;
    this.ConvertString(this.InputText);
  }
  
  cancel(){
    this.cancelled= true;   
    for(var i = 0;i < this.timeoutArray.length;i++)
    {
      clearTimeout(this.timeoutArray[i]);
      

      // const index = this.timeoutArray.indexOf(this.timeoutArray[i], 0);
      // if (index > -1) {
      
      this.ForCancelArray.push(this.timeoutArray[i])
      // }
      this.CancelTask();
    }

  }

  CancelTask(){

    if(this.timeoutArray.length ==this.ForCancelArray.length){

      this.ButtonDisabled = false;
      this.finished = false;
      alert("Cancelled")
    } 

  }
    

}
