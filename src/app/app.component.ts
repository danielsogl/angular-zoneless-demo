import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  protected counter = 0;

  public incrementCounter(): void {
    this.counter++;
  }

  protected interval = 0;
  private readonly cdr = inject(ChangeDetectorRef);

  public startInterval(): void {
    setInterval(() => {
      this.interval++;
      this.cdr.markForCheck();
    }, 1_000);
  }

  protected signalInterval = signal(0);

  public startSignalInterval(): void {
    setInterval(() => {
      this.signalInterval.update((value) => value + 1);
    }, 1_000);
  }

  private readonly http = inject(HttpClient);

  protected post = {};

  public loadPost() {
    this.http
      .get('https://jsonplaceholder.typicode.com/posts/1')
      .subscribe((post) => {
        this.post = post;
        this.cdr.markForCheck();
      });
  }

  protected readonly post$ = this.http.get(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  protected readonly postSignal = toSignal(this.post$);
}
