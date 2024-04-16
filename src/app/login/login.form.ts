import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { LoginCredentials } from "../model/login-credentials";

@Injectable()
export class LoginForm {
  form!: FormGroup<{
    username: FormControl<string | null>
    password: FormControl<string | null>
  }>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: this.fb.control<string | null>(null, Validators.required),
      password: this.fb.control<string | null>(null, Validators.required),
    });
  }

  get value(): LoginCredentials {
    return this.form.value as LoginCredentials;
  }
}
