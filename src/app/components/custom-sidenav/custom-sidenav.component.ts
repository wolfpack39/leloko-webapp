import { Component, computed, Input, input, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatListItemTitle, MatNavList, MatListItemIcon } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

export type MenuItem = {  // Type definition
  icon: string;     
  label: string;
  route?: string;   
}

@Component({
  selector: 'custom-sidenav',
  imports: [MatIcon, MatNavList, MatListItemIcon, MatListItemTitle, RouterLink, RouterLinkActive],
  standalone: true,
  template: `
    <mat-nav-list>  
      @for (item of menuItems(); track $index) {
        <a 
          mat-list-item 
          class="menu-item"
          [routerLink]="item.route"
          routerLinkActive="selected-menu-item"
          #rla="routerLinkActive"
          [class.active]="rla.isActive"
        >
          <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
          <span matListItemTitle [class.hide-sidenav-text]="collapsed">{{ item.label }}</span>
        </a>
      }
    </mat-nav-list>
  `,
  styles: `

    :host * {
      transition: all 500ms ease-in-out;
    }
    mat-nav-list {
      display: flex;
      flex-direction: column;
      padding: 0;
    }
    a {
      display: flex;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 14px;
      text-decoration: none;
      color: var(--mat-sys-on-background);
    }
    a:hover {
      background-color: #ccc;
    } 

    mat-icon {
      margin: 0 8px 0 0;
      
    }
    span {
        font-size: 1em;
        font-weight: 600;
      }

      .active {
        background-color: #ccc;
      }

      .hide-sidenav-text {
        opacity: 0;   
      }

      .menu-item {
        border-left: 5px solid rgba(0, 0, 0, 0);
        transition: all 500ms ease-in-out;
      }

      .selected-menu-item {
        border-left: 5px solid var(--mat-sys-on-background);     
        background-color: rgba(0, 0, 0, 0.1);
      }
  `

})
export class CustomSidenavComponent {

  sideNavCollapsed = signal(false);
  @Input() set collapsed(value: boolean) {
    this.sideNavCollapsed.set(value);
  }

  get collapsed() {
    return this.sideNavCollapsed();
  }

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32px' : '100');

  menuItems = signal<MenuItem[]>([
    { icon: 'home', label: 'Home', route: 'home' },
    { icon: 'menu', label: 'Manage Shipping', route: 'shipping' },
    { icon: 'person', label: 'Driver Management', route: 'driver-management' },
  ]);
}
