/// <reference types="cypress" />

class CheckoutPage {

    get navbarToggler() { return cy.get('.navbar-toggler') }
    get basketLink() { return cy.get('a[href="/basket"]') }
    get basketCount() { return cy.get('#basketCount') }
    get standardShippingCheckbox() { return cy.get('#exampleRadios2') }
    get nameInput() { return cy.get('#name').eq(0) }
    get lastNameInput() { return cy.get('label[for="lastName"]+input') }
    get emailInput() { return cy.get('#email') }
    get addressInput() { return cy.get('#address') }
    get citySelect() { return cy.get('#city') } 
    get zipInput() { return cy.get('#zip') }
    get countrySelect() { return cy.get('#country') } 
    get cardNameInput() { return cy.get('#cc-name') }
    get cardNumberInput() { return cy.get('#cc-number') }
    get cardExpDateInput() { return cy.get('#cc-expiration') }
    get cardCvvInput() { return cy.get('#cc-cvv') }

    public openNavbar() {
        this.navbarToggler.click();
    }
    
    public clickOnBasket() {
        this.basketLink.click();
    }

    public fillName(name: string) {
        this.nameInput.type(name);
    }

    public fillLastName(lastname: string) {
        this.lastNameInput.type(lastname);
    }

    public fillEmail(email: string) {
        this.emailInput.type(email);
    }

    public fillAddress(address: string) {
        this.addressInput.type(address);
    }

    public clickOnStandardShippingCheckboxAndVerifyTotalPrice(price: string) {
        this.standardShippingCheckbox.click();
        this.validateTotalTotalPrice(price)
    }

    public selectCity(city: string) {
        this.citySelect.select(city); 
    }

    public fillZip(zip: string) {
        this.zipInput.type(zip);
    }

    public selectCountry(country: string) {
        this.countrySelect.select(country); 
    }

    public fillCardName(cardName: string) {
        this.cardNameInput.type(cardName);
    }

    public fillCardNumber(cardNumber: string) {
        this.cardNumberInput.type(cardNumber);
    }

    public fillCardExpDate(cardExpDate: string) {
        this.cardExpDateInput.type(cardExpDate);
    }

    public fillCardCvv(cardCvv: string) {
        this.cardCvvInput.type(cardCvv);
    }

    public validateProductTitlePriceAndQuantity(productTitle: string, productPrice: string, quantity: string) {
        cy.contains('h6', productTitle).should('have.text', productTitle);
        cy.contains('h6', productTitle).should('be.visible');
        cy.contains('span', productPrice).should('have.text', productPrice);
        cy.contains('span', productPrice).should('be.visible');
        cy.contains('small', quantity).should('have.text', `x ${quantity}`);
        cy.contains('small', quantity).should('be.visible');
    }
    
    public validateCheckoutCurrency(currency: string) {
        cy.contains('span',`Total (${currency})`).should('have.text', `Total (${currency})`);
        cy.contains('span',`Total (${currency})`).should('be.visible');
    }
    
    public validateTotalTotalPrice(value: string) {
        cy.contains('strong', value).should('have.text', value);
        cy.contains('strong', value).should('be.visible');
    }

    public validateBasketCount(count: number) {
        this.basketCount.should('have.text', count.toString());
    }

    public clickOnCheckoutBtn() {
        cy.get('button[type="submit"]').eq(0).click();
    }
}

export const checkoutPage: CheckoutPage = new CheckoutPage();
