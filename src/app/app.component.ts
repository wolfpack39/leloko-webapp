import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { CustomSidenavComponent } from "./components/custom-sidenav/custom-sidenav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbar, MatIconButton, MatIcon, MatSidenavContainer, MatSidenav, MatSidenavContent, CustomSidenavComponent],
  template: `
    <mat-toolbar>
      <button mat-icon-button (click)="collapsed.set(!collapsed())">
        <mat-icon>menu</mat-icon>
      </button>
    </mat-toolbar>

    <mat-sidenav-container>
      <mat-sidenav #sidenav mode="side" opened [style.width]="sidenavWidth()">
        <custom-sidenav [collapsed]="collapsed()"></custom-sidenav>
      </mat-sidenav>
      <mat-sidenav-content class="content" [style.margin-left]="sidenavWidth()">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    ` 
      mat-toolbar {
        position: relative;
        height: 64px;
        border-bottom: 1px solid #ccc;
        z-index: 1000;

        mat-icon {
          color: white;
        }
      }

      .content {
        display: flex;
        padding: 24px;
      }

      mat-sidenav-container {
        height: calc(100% - 64px);
      }

      mat-sidenav {
        border-radius: 0;
      }

      mat-side-nav, 
      mat-sidenav-content {
        transition: all 500ms ease-in-out;
      }
     
    `
  ],
})  // End of @Component
export class AppComponent {
  collapsed = signal(false);

  sidenavWidth = computed(() => this.collapsed() ? '64px' : '240px');
}
