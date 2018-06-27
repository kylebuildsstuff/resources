import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Blockchain } from '../blockchain/blockchain.models';
import { AppState } from '../app.models';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit {
  constructor(private store: Store<AppState>) {}
  coins: Observable<Blockchain[]>;

  ngOnInit() {
    this.coins = this.store.select(state => state.blockchain);
  }
}
