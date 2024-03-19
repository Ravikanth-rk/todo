
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Itask } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm !: FormGroup;
  tasks : Itask [] = [];
  inprogress : Itask [] = [];
  done: Itask [] =[];

  updateIndex !: any;
  isEditEnable : boolean = false;


  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item :['', Validators.required]
    })
  }

  // add tasks
  addTask(){
    this.tasks.push({
      description: this.todoForm.value.item,
      done:false,
    })
    this.todoForm.reset();
  }

  onEdit(item:Itask, i : number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnable = true;
  }

  editTask(){
    this.tasks[this.updateIndex].description = this.todoForm.value.item;
    this.tasks[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnable = false;
  }
  // delete task
  deleteTask(i: number){
    this.tasks.splice(i,1)
  }

  deleteProgTask(i:number){
    this.inprogress.splice(i,1)
  }

  deleteDoneTask(i:number){
    this.done.splice(i,1)
  }

  drop(event: CdkDragDrop<Itask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
