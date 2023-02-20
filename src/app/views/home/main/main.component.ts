import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { map,  Subject, Subscription} from "rxjs";
import {ProductService} from "../../../shared/services/product.service";
import {CartService} from "../../../shared/services/cart.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PopupComponent} from "../../../shared/components/popup/popup.component";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit,OnDestroy,AfterViewInit{
  // private observable:Observable<number>;
  private subscription:Subscription | null =null;
  private subject:Subject<number>;
  constructor(private productService:ProductService,public cartService:CartService,private modalService: NgbModal) {
    // this.observable=from([1,2,3,4,5]);
    this.subject=new Subject<number>();
    let count:number=0;
    const interval= setInterval(()=>{this.subject.next(count++);},1000);
    const timeout1= setTimeout(()=>{this.subject.complete();},4000);

   //
   // this.observable= new Observable((observer)=>{
   //   let count:number=0;
   //   const interval= setInterval(()=>{observer.next(count++);},1000);
   //   const timeout1= setTimeout(()=>{observer.complete();},4000);
   //   const timeout2= setTimeout(()=>{observer.error('world')},5000);
   //    return {
   //      unsubscribe() {
   //        clearInterval(interval);
   //        clearTimeout(timeout1);
   //        clearTimeout(timeout2);
   //      }
   //    }
   //  })
  }
@ViewChild(PopupComponent)
private popupComponent!:PopupComponent;
ngOnInit() {

  // const myModalAlternative = new bootstrap.Modal('#myModal', {});
  // myModalAlternative.show();

  this.subscription=this.subject
    .subscribe(
    {
      next:(param:number)=>{
        console.log('subsciber 1',param);
      },
      error:(error:string)=>{
        console.log('Error'+error);
      }
    }
  )
}
ngAfterViewInit() {
  this.popupComponent.open();
  // this.modalService.open(this.popup, {});
  // const modalRef = this.modalService.open(PopupComponent);
  // modalRef.componentInstance.data="Main component";
}

  ngOnDestroy() {
    this.subscription?.unsubscribe();
}

  test(){

  this.subject
    .pipe(
      map(number=>{
        return 'number: '+number
      })
    )
    .subscribe((param:string)=>{
    console.log('subsciber 2',param);
  })
}
}
