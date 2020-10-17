import {Component, OnInit} from '@angular/core';
import {MessageService} from './task-item/services/message.service';
import {Message} from './task-item/interfaces/message';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {TaskItemFormComponent} from './task-item/task-item-form/task-item-form.component';
import {Task} from 'protractor/built/taskScheduler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: Array<Message> = new Array<Message>();
  showLoader: boolean;
  searchText: string;

  constructor(
    private taskService: MessageService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): any {
    this.list();
  }

  list(): void {
    this.showLoader = true;
    this.taskService.list().subscribe(
      (response) => {
        if (response && response.length > 0) {
          this.tasks = response;
        }
        this.showLoader = false;
      },
      (error) => {
        this.showLoader = false;
        this.toastrService.error('Erro ao realizar listagem');
      }
    );
  }

  openForm(): void {
    this.dialog.open(TaskItemFormComponent, {}).afterClosed().subscribe(
      (data) => {
        if (data.saved) {
          this.list();
        }
      }
    );
  }

  onDeleted(task: Message): void {
    let index;
    this.tasks.find(
      (value, i) => {
        if (value.id === task.id) {
          index = i;
        }
      }
    );
    if (index >= 0) {
      this.tasks.splice(index, 1);
    }
  }

  onEdited(event): void {
    if (event.saved) {
      this.list();
    }
  }
}
