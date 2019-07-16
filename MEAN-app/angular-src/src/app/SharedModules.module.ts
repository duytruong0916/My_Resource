import { NgModule } from '@angular/core';
import {MatButtonModule,
        MatCheckboxModule,
        MatBadgeModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        MatToolbarModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatSelectModule,
        MatListModule,
        MatExpansionModule,
        MatDialogModule} from '@angular/material';

const MaterialsModules = [MatButtonModule,
                          MatCheckboxModule,
                          MatBadgeModule,
                          MatIconModule,
                          MatMenuModule,
                          MatDividerModule,
                          MatToolbarModule,
                          MatSidenavModule,
                          MatFormFieldModule,
                          MatSelectModule,
                          MatListModule,
                          MatExpansionModule,
                          MatDialogModule];

@NgModule({
  imports: [MaterialsModules],
  exports: [MaterialsModules]
})
export class MyOwnCustomMaterialModule { }
