import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalLayoutComponent } from './components/modal-layout/modal-layout.component';
import { BodyLayoutComponent } from './components/body-layout/body-layout.component';

@NgModule({
  declarations: [ModalLayoutComponent, BodyLayoutComponent],
  imports: [CommonModule],
  exports: [ModalLayoutComponent, BodyLayoutComponent],
})
export class SharedModule {}
