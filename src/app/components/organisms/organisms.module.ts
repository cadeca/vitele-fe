import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {HeaderComponent} from './header/header.component';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {PrimitivesModule} from '../primitives/primitives.module';
import {WeasyLearnRoutingModule} from '../../weasy-learn-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {ProvidersModule} from '../../providers/providers.module';
import {SubjectsListComponent} from './subjects-list/subjects-list.component';
import {CreateEditSubjectComponent} from './create-edit-subject/create-edit-subject.component';
import {DirectivesModule} from '../../directives/directives.module';
import {UsersListComponent} from './users-list/users-list.component';

const components = [
  HeaderComponent,
  SideMenuComponent,
  SubjectsListComponent,
  CreateEditSubjectComponent,
  UsersListComponent
];

@NgModule({
  declarations: components,
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PrimitivesModule,
    WeasyLearnRoutingModule,
    TranslateModule,
    ProvidersModule,
    DirectivesModule
  ],
  exports: components
})
export class OrganismsModule {
}
