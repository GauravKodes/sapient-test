import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FilterComponent } from './filter/filter.component';
import { HomeComponent } from './home/home.component';
import { LaunchListComponent } from './launch-list/launch-list.component';

@NgModule({
  declarations: [FilterComponent, LaunchListComponent, HomeComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
