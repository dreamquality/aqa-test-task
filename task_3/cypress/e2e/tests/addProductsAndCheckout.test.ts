import { sweetshopPage } from '../pages/sweetshopPage'
import { checkoutPage } from '../pages/checkoutPage'
const products = [
    { name: "Chocolate Cups", quantity: "1", price:"£1.00" },
    { name: "Sherbert Straws", quantity: "1", price:"£0.75" },
    { name: "Sherbet Discs", quantity: "1", price:"£0.95" },
    { name: "Strawberry Bon Bons", quantity: "1", price:"£1.00" },
];


function calculateTotalPrice(items: any) {
    return items.reduce((total: any, item: any) => {
        const price = parseFloat(item.price.replace('£', ''));
        const quantity = parseInt(item.quantity, 10);
        return total + price * quantity;
    }, 0).toFixed(2); 
}


describe("SweetShop Basket and Checkout Tests", () => {
    beforeEach(() => {
        sweetshopPage.launchApplication();
    });

    it("Add different products to basket and verify them on the checkout page, switch delivery to standard shipping", () => {
        products.forEach((product, index) => {
            sweetshopPage.addToBasket(index+1);
        });
        sweetshopPage.clickOnBasket()
        products.forEach((product) => {
            checkoutPage.validateProductTitlePriceAndQuantity(product.name,product.price,product.quantity);
        });
        checkoutPage.validateBasketCount(products.length)
        checkoutPage.validateCheckoutCurrency("GBP")
        checkoutPage.validateTotalTotalPrice(`£${calculateTotalPrice(products)}`)
        checkoutPage.clickOnStandardShippingCheckboxAndVerifyTotalPrice(`£${calculateTotalPrice(products)}`)
    });


    it("Add different products to basket, verify them on the checkout page, and fill in checkout details", () => {
        products.forEach((product, index) => {
            sweetshopPage.addToBasket(index + 1);
        });
    
        sweetshopPage.clickOnBasket();
    
        products.forEach((product) => {
            checkoutPage.validateProductTitlePriceAndQuantity(product.name, product.price, product.quantity);
        });
    
        checkoutPage.validateBasketCount(products.length);
        checkoutPage.validateCheckoutCurrency("GBP");
    
        checkoutPage.validateTotalTotalPrice(`£${calculateTotalPrice(products)}`);
    
        checkoutPage.fillName("John");
        checkoutPage.fillLastName("Doe");
        checkoutPage.fillEmail("johndoe@example.com");
        checkoutPage.fillAddress("123 Example Street");
        checkoutPage.selectCity("Bristol");
        checkoutPage.fillZip("12345");
        checkoutPage.selectCountry("United Kingdom");
        checkoutPage.fillCardName("John Doe");
        checkoutPage.fillCardNumber("4111111111111111");
        checkoutPage.fillCardExpDate("12/24");
        checkoutPage.fillCardCvv("123");
    
        checkoutPage.clickOnCheckoutBtn();
    });

});
