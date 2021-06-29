import { Component, OnInit } from '@angular/core';
import { Stripe } from '@ionic-native/stripe/ngx';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.page.html',
  styleUrls: ['./stripe.page.scss'],
})
export class StripePage implements OnInit {
  


  constructor(private stripe: Stripe) { }

  ngOnInit() {
   
  }


  payWithStripe() {
    this.stripe.setPublishableKey('pk_test_51HGqE4G3pOmckPlpEdILzdMTlhULHvXzJiiIetA8oNEmNEx7Lp6Of6qe7E5DMjRowG1sjgoFdc35Bq1FleAAPTeU00L2K9FG6I');

let card = {
 number: '4242424242424242',
 expMonth: 12,
 expYear: 2020,
 cvc: '220'
}

this.stripe.createCardToken(card)
   .then(token => console.log(token.id))
   .catch(error => console.error(error));

}


}
