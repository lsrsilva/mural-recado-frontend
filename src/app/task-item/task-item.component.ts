import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {MessageService} from './services/message.service';
import {Message} from './interfaces/message';
import {TaskItemFormComponent} from './task-item-form/task-item-form.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  @Input() message: Message = {} as Message;
  @Output() messageDeleted: EventEmitter<Message> = new EventEmitter<Message>();
  @Output() messageEdited: EventEmitter<any> = new EventEmitter<any>();
  showLoader: boolean;

  constructor(
    private toastrService: ToastrService,
    private messageService: MessageService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  delete(id: number): void {
    this.showLoader = true;
    this.messageService.delete(id).subscribe(
      (response) => {
        if (response.status === 200) {
          this.toastrService.success(response.message);
          this.messageDeleted.emit(this.message);
        } else {
          this.toastrService.error(response.message);
        }

        this.showLoader = false;
      },
      error => {
        this.showLoader = false;
        this.toastrService.error('Ocorreu um erro ao excluir a tarefa!');
      }
    );
  }


  edit(): void {
    this.dialog.open(TaskItemFormComponent, {
      data: {message: this.message}
    }).afterClosed().subscribe(
      (data) => {
        if (data.saved) {
          this.messageEdited.emit({
            saved: true
          });
        }
      }
    );
  }

}
