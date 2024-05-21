import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,20}$')]],
      lasttName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,20}$')]],
      photo: [null, Validators.required, Validators.pattern('^[0-9]{10}$')],
      email: ['',[Validators.required, Validators.email]],
      age: [0, Validators.required],
      interest: [''],
      addressType: ['home'],
      address1: [''],
      address2: [''],
      companyAddress1: [''],
      companyAddress2: ['']
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width === 310 && img.height === 325) {
          this.selectedFile = file;
          this.registrationForm.patchValue({ photo: file });
        } else {
          alert('Invalid photo dimensions. Required: 310x325 px');
        }
      };
    }
  }

  // onSubmit() {
  //   if (this.registrationForm.valid) {
  //     this.userService.addUser(this.registrationForm.value).subscribe((user: { id: any; }) => {
  //       this.router.navigate(['/profile', { id: user.id }]);
  //     }, (error: any) => {
  //       console.error('Error adding user:', error);
  //     });
  //   }
  // }


  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.userService.addUser(this.registrationForm.value).subscribe(
        (user: { id: any; }) => {
          this.router.navigate(['/profile', { id: user.id }]);
        },
        (error: any) => {
          console.error('Error adding user:', error);
        }
      );
    }
  }
}

