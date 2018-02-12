import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { OrdersService } from '../../../shared/services/orders.service';
import { OrdersApiResponse } from '../../../shared/interfaces/commerce.interface';
import { Common } from '../../../shared/utilities/common.functions';

@Injectable()
export class OrdersResolver implements Resolve<OrdersApiResponse> {
  constructor(
    private ordersService: OrdersService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OrdersApiResponse> {
    return this.ordersService.getOrders(Common.clone(route.params));
  }
}
