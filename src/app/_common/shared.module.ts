import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

import {
    NzGridModule,
    NzIconModule,
    NzBreadCrumbModule,
    NzListModule,
    NzFormModule,
    NzCheckboxModule,
    NzPopoverModule,
    NzStatisticModule,
    NzCardModule,
    NzTagModule,
    NzSwitchModule,
    NzSkeletonModule,
    NzTabsModule,
    NzModalModule,
    NzAvatarModule,
    NzButtonModule,
    NzInputModule,
    NzDropDownModule,
    NzPageHeaderModule,
    NzToolTipModule,
    NzTableModule,
    NzSpinModule,
    NzPopconfirmModule,
    NzSelectModule,
    NzDatePickerModule,
    NzDividerModule,
    NzBadgeModule,
    NzDescriptionsModule,
    NzNotificationModule,
    NzRadioModule,
    NzUploadModule

  } from 'ng-zorro-antd';

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule, ScrollingModule];

const NZ_MODULES = [
      NzGridModule,
      NzIconModule,
      NzBreadCrumbModule,
      NzListModule,
      NzFormModule,
      NzCheckboxModule,
      NzPopoverModule,
      NzStatisticModule,
      NzCardModule,
      NzTagModule,
      NzSwitchModule,
      NzSkeletonModule,
      NzTabsModule,
      NzModalModule,
      NzAvatarModule,
      NzDropDownModule,
      NzInputModule,
      NzToolTipModule,
      NzTableModule,
      NzSpinModule,
      NzPopconfirmModule,
      NzSelectModule,
      NzDatePickerModule,
      NzDividerModule,
      NzBadgeModule,
      NzPageHeaderModule,
      NzDescriptionsModule,
      NzButtonModule,
      NzNotificationModule,
      NzRadioModule,
      NzUploadModule
    ];

  const PIPES = [];
  const DIRECTIVES = [];
  const SHARED_COMPONENTS = [];
  @NgModule({
    declarations: [...PIPES, ...DIRECTIVES, ...SHARED_COMPONENTS],
    imports: [...BASE_MODULES, ...NZ_MODULES],
    exports: [...BASE_MODULES, ...NZ_MODULES, ...PIPES, ...DIRECTIVES, ...SHARED_COMPONENTS],
    // entryComponents: [...ENTRY_COMPONENTS],
  })

  export class SharedModule {}
