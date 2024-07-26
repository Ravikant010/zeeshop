export const metadata_obj = {
    size: "",
    quantity: 0,
    setSize: function(size:string) {
        this.size = size;
        console.log("Size selected:", size);
    },
    setQuantity: function(quantity:number) {
        this.quantity = quantity;
        console.log("Quantity selected:", quantity);
    }
};