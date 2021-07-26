import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {
  previo;
  constructor(public route: ActivatedRoute,  public router: Router) { }

  ngOnInit() {

    this.previo = this.route.snapshot.paramMap.get('previo');
  }

  back(){
    this.router.navigate([this.previo]);
  
  }

}
