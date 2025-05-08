import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuType:String='default';
  constructor(private route:Router)
  {}
   ngOnInit()
   {
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        console.log(val.url)
        if (localStorage.getItem('seller') && val.url.includes('seller'))
          this.menuType="seller"
      
        else
        this.menuType="default"
      }
    })
   }
}
