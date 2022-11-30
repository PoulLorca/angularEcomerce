import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit {

  @Input ()  img: any;

  constructor() {
    
   }

  ngOnInit(): void {
  }

}
