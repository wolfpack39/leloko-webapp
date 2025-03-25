import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { CustomSidenavComponent } from "./components/custom-sidenav/custom-sidenav.component";
import { MatCard } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent, MatInputModule, RouterOutlet, MatToolbarModule, MatIconButton, MatIcon, MatSidenavContainer, MatSidenav, MatSidenavContent, CustomSidenavComponent],
  template: `
    <mat-toolbar>
        <mat-toolbar-row>
          <button mat-icon-button (click)="collapsed.set(!collapsed())">
            <mat-icon>menu</mat-icon>
          </button>

          <div class="nav-start">
          
            <a class="logo" href="/">
              <img src="./assets/img/LELOKO_LOKO.png"
              height="30"
              alt="African Vision Logo"
            />
            </a>
            <ul>
              <li>
                
              </li>
            </ul>
      
          </div>

          <div class="nav-end">
              <form class="search" role="search">
                <input type="search" name="search" placeholder="Search"/>
              </form>
              
              <ng-content select=".logout-class"></ng-content>
            </div>
        </mat-toolbar-row>
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

      :host {
        overflow-x: hidden;
      }
    
      mat-toolbar {
        display: flex;
        align-items: center;
        --primary-color: var(--mat-sys-primary);
        --dark-grey: #333333;
        --light-brown: #2D475D;
        --medium-grey: #636363;
        --light-grey: #F7F7F7; /* #eeeeee */
        --light-blue: #F7F9FC;
        --ash: #f4f4f4;
        --white: white;
        --border: 1px solid var(--light-grey);
        --shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
          rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

          mat-toolbar-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #edf2fb; //var(--mat-sys-inverse-primary);
          //padding: 0 4em;
          //border-bottom: 1px solid var(--light-grey);
          height: 4em;

          .nav-start {
            display: flex;
            align-items: center;

            ul {
              height: 40px;
                display: flex;
                //justify-content: space-between;
                padding: 0;
                list-style: none;
                width: 100%;
                padding: 0 1em;
                align-items: center;
                a {
                  text-decoration: none;
                  color: var(--medium-grey);
                  font-size: 1.0em;
                  font-weight: 600;
                  img {
                    position: absolute;
                    left: 20%;
                  }
                }    

                  
            }
              
            ul > li {
                display: inline-block;
            }

            .nav-link {
                font-size: 1.0rem;
                font-weight: 500;
                letter-spacing: -0.6px;
                padding: 0.3rem;
                min-width: 60px;
                margin: 0 0.6rem;
                color: var(--medium-grey);
            }
            
            .nav-link:hover {
            color: var(--primary-color);
            }
              
          }

          .nav-end {
              display: flex;
              justify-content: space-around;
              align-items: center;
              width: 28%;
              .search input {
                  background-color: var(--ash);
                  border: none;
                  border-radius: 6px;
                  padding: 0.7rem;
                  padding-left: 2.4rem;
                  font-size: 16px;
                  width: 100%;
                  border: var(--border);
                }
                
                .search .bx-search {
                  position: absolute;
                  left: 10px;
                  top: 50%;
                  font-size: 1.3rem;
                  transform: translateY(-50%);
                  opacity: 0.6;
                }

                p {
                  border: 1px solid red;
                  font-size: 1em;
                  width: 40px;
                  height: 40px;
                  color: #000;
                  background-color: #fff;
                }

            }   

            

          }
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
  loggedIn = false;

  collapsed = signal(false);

  sidenavWidth = computed(() => this.collapsed() ? '64px' : '240px');

  login(val: boolean) {
    this.loggedIn = val;
  }
}
