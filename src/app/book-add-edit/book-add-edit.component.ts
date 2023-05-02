import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BooksService } from '../services/books.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-book-add-edit',
  templateUrl: './book-add-edit.component.html',
  styleUrls: ['./book-add-edit.component.css']
})
export class BookAddEditComponent implements OnInit{
  bookForm: FormGroup;

  ngOnInit(): void {
    this.bookForm.patchValue(this.data)
  }

  type: string[] = [
    'Tragedy',
    'Romance',
    'Fantasty',
    'Horror',
    'Fantasty',
    'Comedy'
  ];

  constructor(private _fb: FormBuilder, private _bookService: BooksService, private _dialogRef: DialogRef<BookAddEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any){
    this.bookForm = this._fb.group({
      title: '',
      author: '',
      year_of_publication: '',
      type: ''
    })
  }

  onFormSubmit(){
    if(this.bookForm.valid){
      if(this.data){
        this._bookService.editBook(this.data.id,this.bookForm.value).subscribe({
          next: (val: any) => {
            alert("Book edited successfully!");
            this._dialogRef.close();
            location.reload();
          },
          error: (err: any) =>{
            console.log(err);
          }
        })
      } else{
        this._bookService.addBook(this.bookForm.value).subscribe({
          next: (val: any) => {
            alert("Book added successfully!");
            this._dialogRef.close();
            location.reload();
          },
          error: (err: any) =>{
            console.log(err);
          }
        })
      }
    }
  }
}
