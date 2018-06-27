import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AppState } from '../app.models';
import { Blockchain } from './blockchain.models';

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.css'],
})
export class BlockchainComponent implements OnInit {
  constructor(private store: Store<AppState>, private fb: FormBuilder) {}
  angForm: FormGroup;

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  addCoin(name, price) {
    this.store.dispatch({
      type: 'ADD_COIN',
      payload: <Blockchain>{
        name: name,
        price: price,
      },
    });
  }
}
