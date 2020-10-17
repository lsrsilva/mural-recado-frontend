import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../services/message.service';
import {Message} from '../interfaces/message';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-task-item-form',
  templateUrl: './task-item-form.component.html',
  styleUrls: ['./task-item-form.component.css']
})
export class TaskItemFormComponent implements OnInit {

  @Input() task: Message = {} as Message;
  @Output() taskSaved: EventEmitter<Message> = new EventEmitter<Message>();
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;
  showLoader: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<TaskItemFormComponent>,
    private toastrService: ToastrService,
    private taskService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        title: new FormControl('', [Validators.required]),
        description: new FormControl(''),
      }
    );
    if (this.data && this.data.message) {
      this.form.patchValue({
        title: this.data.message.title,
        description: this.data.message.description,
      });

      this.task = this.data.message;
    }
  }

  save(): void {
    if (this.form.valid && !this.showLoader) {
      this.showLoader = true;
      const task: Message = {
        title: this.form.get('title').value,
        description: this.form.get('description').value,
      };
      if (this.task.id) {
        task.id = this.task.id;
        this.taskService.update(task).subscribe(
          (response) => {
            if (response.status === 200) {
              this.toastrService.success(response.message);
              this.dialogRef.close({
                saved: true,
                task: response.data
              });
            } else {
              this.toastrService.error(response.message);
            }

            this.showLoader = false;
          },
          error => {
            this.showLoader = false;
            this.toastrService.error('Ocorreu um erro ao editar a tarefa!');
          }
        );
      } else {
        this.taskService.save(task).subscribe(
          (response) => {
            if (response.status === 200) {
              this.toastrService.success(response.message);
              this.dialogRef.close({
                saved: true,
                task: response.data
              });
            } else {
              this.toastrService.error(response.message);
            }

            this.showLoader = false;
          },
          error => {
            this.showLoader = false;
            this.toastrService.error('Ocorreu um erro ao salvar a tarefa!');
          }
        );
      }

    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
