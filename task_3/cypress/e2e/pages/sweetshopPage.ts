/// <reference types="cypress" />

class SweetshopPage {

    get navbarToggler() { return cy.get('.navbar-toggler') }
    get basketLink() { return cy.get('a[href="/basket"]') }




    public launchApplication() {
        cy.visit('/')
    }

    public addToBasket(index: number = 0) { 
        return cy.get(`[data-id="${index}"]`).click().wait(500);
    }
    
    public openNavbar() {
        this.navbarToggler.click()
    }
    
    public clickOnBasket() {
        this.basketLink.click()
    }
    
    public validateProductTitlePriceAndQuantity(productTitle: string,productPrice: string, quantity: string) {
        cy.contains('h6', productTitle).should('have.text', productTitle);
        cy.contains('h6', productTitle).should('be.visible');
        cy.contains('span', productPrice).should('have.text', productPrice);
        cy.contains('span', productPrice).should('be.visible');
        cy.contains('small', quantity).should('have.text', quantity);
        cy.contains('small', quantity).should('be.visible');
    }
}

export const sweetshopPage: SweetshopPage = new SweetshopPage()