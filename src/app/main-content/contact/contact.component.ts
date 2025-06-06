import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm  }   from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  private http = inject(HttpClient);

  contactData = {
    name: "",
    email: "",
    message: "",
    privacyChecked: false,
  }

  
  // Flag, um anzuzeigen, dass der Nutzer einmal auf "Say Hello" geklickt hat
  formSubmitted = false;
  mailSent = true;
  isLoading = false; 

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


  onSubmit(form: NgForm) {
    // Markiere, dass das Formular abgeschickt wurde:
    this.formSubmitted = true;
    if (form.invalid) {
      // (Optional) Alle Felder als "touched" markieren, 
      // damit auch unberührte Felder sofort validiert aussehen:
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    this.isLoading = true;
    this.http.post(
        this.post.endPoint,
        this.post.body(this.contactData),
        this.post.options
    ).subscribe({
      next: (response) => {
        // Mail erfolgreich gesendet, z.B. form resetten
        form.resetForm();
        this.formSubmitted = false;
        this.mailSent = true;
      },
      error: (error) => {
        console.error(error);
        this.mailSent = false;
      },
      complete: () => {
        this.isLoading = false;
        console.info('send post complete');
      }
    });
  }
}
