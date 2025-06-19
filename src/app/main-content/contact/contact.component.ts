import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm  }   from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core'; 

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  private http = inject(HttpClient);
  private translate = inject(TranslateService);

  contactData = {
    name: "",
    email: "",
    message: "",
    privacyChecked: false,
  }

  
  formSubmitted = false;
  mailSent = false;
  mailError = false;
  isLoading = false; 

  /**
 * Configuration for sending a POST request to the contact form endpoint.
 * @property {string} endPoint - The URL to which the POST request is sent.
 * @property {function} body - Serializes the payload as a JSON string.
 * @property {object} options - HTTP headers and response type settings.
 */
  post = {
    endPoint: 'https://diesch-dev.com/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'json' as const
    }
  };

/**
 * Handles the form submission for the contact section.
 * Marks all fields as touched if invalid and sends the form data via POST request if valid.
 * @param {NgForm} form - The contact form to be validated and submitted.
 */
  onSubmit(form: NgForm) {
    this.formSubmitted = true;
    if (form.invalid) {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    this.isLoading = true;
    this.http
  .post(
    this.post.endPoint,
    this.post.body(this.contactData),
    this.post.options
  )
  .subscribe({
    next: response => this.handleResponse(response, form),
    error: err => {
      console.error(err);
      this.mailError = true;
      setTimeout(() => this.mailError = false, 10000);
      this.isLoading = false;
    }
  });

  }

  /**
 * Handles the response of the contact form submission.
 * Resets the form on success, sets status flags, and logs errors if any occur.
 * @param {any} response - The response returned from the POST request.
 * @param {NgForm} form - The contact form to reset after successful submission.
 */
  private handleResponse(response: any, form: NgForm): void {
    try {
      form.resetForm();
      this.formSubmitted = false;
      this.mailSent = true;
      setTimeout(() => this.mailSent = false, 10000);
    } catch (error) {
      console.error(error);
      this.mailSent = false;
      this.mailError = true;
      setTimeout(() => this.mailError = false, 10000);
    } finally {
      this.isLoading = false;
      console.info('send post complete');
    }
  }
}
