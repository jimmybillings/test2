import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../../shared/services/orders.service';
import { UrlParams } from '../../../shared/interfaces/common.interface';
import { Orders } from '../../../shared/interfaces/commerce.interface';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'orders-component',
  templateUrl: 'orders.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OrdersComponent implements OnInit {
  public ordersPerPage: string = '20';
  private params: UrlParams;
  constructor(
    public ordersService: OrdersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ordersPerPage = params['n'] || '20';
    });
  }

  public get orders(): Observable<Orders> {
    return this.ordersService.data;
  }

  public changePage(i: number): void {
    this.buildRouteParams({ i });
    this.router.navigate(['/orders', this.params]);
  }

  public onSearch(query: { q: string }) {
    this.ordersService.getOrders(query).subscribe();
  }

  private buildRouteParams(params: UrlParams) {
    this.params = Object.assign({}, this.params, { n: this.ordersPerPage }, params);
  }
}
