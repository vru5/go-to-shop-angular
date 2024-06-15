import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUserRequest, RegisterRequest } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private auth: AuthService, private toastr: ToastrService,  private router: Router) { }

  showRegisterForm: boolean = false;

  /**
   * Login form group
   */
  loginForm = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  });

   /**
   * Register form group
   */
   registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', Validators.required]
  });

  /**
   * On component load
   */
  ngOnInit(): void {  }

  /**
   * Checks if form is valid or not
   * @returns boolean
   */
  isFormValid(){
    if(this.loginForm.valid){
      return this.loginForm.valid == true ? false : true;
    } else{
      return this.registerForm.valid == true ? false : true;
    }
   
  }


  /**
   * Login form logic
   */
  doLogin(){
    let pass: any  = this.loginForm.controls.password.value != null ?  btoa(this.loginForm.controls.password.value) : this.loginForm.controls.password.value;

    let LoginRequest: LoginUserRequest = {
      email: this.loginForm.controls.email.value,
      password: pass

    }
    console.log("Login details: " , LoginRequest);
    this.auth.loginUser(LoginRequest).subscribe((res: any) => {
      this.toastr.success(res.message, "Success");
      this.router.navigate(['/dashboard']);
    }, (err: any) => {
      this.toastr.error(err.error.message, "Error");
    });
  }

  /**
   * Register form logic
   */
  doRegister() {

    let pass: any  = this.registerForm.controls.password.value != null ?  btoa(this.registerForm.controls.password.value) : this.registerForm.controls.password.value;

    let RegisterRequestObject: RegisterRequest = {
      username: this.registerForm.controls.name.value,
      email: this.registerForm.controls.email.value,
      password: pass

    }
    // console.log(RegisterRequestObject, atob(pass));
    this.auth.registerUser(RegisterRequestObject).subscribe((res: any)=>{
      this.toastr.success(res.message,"Sucess");
      this.showRegisterForm = false;
    }, 
    (err: any) => {
      this.toastr.error(err.error.message,"Error");
    });
  }

  


  showRegister(){
    this.showRegisterForm = true;
  }
}
