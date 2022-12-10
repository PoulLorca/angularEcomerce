import { Component, OnInit } from '@angular/core';

import { onExit } from 'src/app/guards/exit.guard';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, onExit {

  constructor() { }

  ngOnInit(): void {
  }

  onExit(){
    const confirm = Swal.fire({
      title: 'Are you sure?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      }
      return false
    });
    return confirm
  }
}
