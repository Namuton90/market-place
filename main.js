// class listing{
//     costructor(id,name,description,price,image){
//         this.id=id;
//         this.name=name;
//         this.description=description;
//         this.price=price;
//         this.image=image;
//     }
//     // renders the listings HTML

//     render(){
//         const div=document.createElement('div')
//             div.classList.add('listing-item');
//         div.innerHTML=` <img src= "${this.name}" alt="${this.name}"
    
//         <divclass="listing-detail">
        
//         </div>
        
        
//         `
// }


class Listing {
    constructor(id, name, description, price, image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }

    // Renders the listing's HTML
    render() {
        const div = document.createElement('div');
        div.classList.add('listing-item');

        div.innerHTML = `
            <img src="${this.image}" alt="${this.name}">
            <div class="listing-details">
                <span>${this.name}</span>
                <span>KES ${this.price}</span>
                <p>${this.description}</p>
            </div>
            <div class="actions">
                <button onclick="listingManager.editListing(${this.id})">Edit</button>
                <button onclick="listingManager.deleteListing(${this.id})">Delete</button>
            </div>
        `;
        return div;
    }
}

class ListingManager {
    constructor() {
        this.listings = [];
        this.listingItems = document.getElementById('listing-items');
        this.form = document.getElementById('listing-form');
        this.currentEditingId = null; // Track current editing ID

        // Bind event handlers
        this.form.addEventListener('submit', (e) => this.addListing(e));
    }

    addListing(event) {
        event.preventDefault();

        const itemName = document.getElementById('item-name').value;
        const itemDescription = document.getElementById('item-description').value;
        const itemPrice = document.getElementById('item-price').value;
        const itemImage = document.getElementById('item-image').files[0];

        const reader = new FileReader();
        reader.onload = () => {
            const imageSrc = reader.result;
            const newItem = new Listing(Date.now(), itemName, itemDescription, itemPrice, imageSrc);

            if (this.currentEditingId) {
                // Update existing listing
                const index = this.listings.findIndex(item => item.id === this.currentEditingId);
                if (index !== -1) {
                    this.listings[index] = newItem; // Update the listing
                    this.currentEditingId = null; // Reset editing state
                }
            } else {
                this.listings.push(newItem); // Add new listing
            }

            this.form.reset(); // Clear form
            this.renderListings(); // Update UI
        };

        reader.readAsDataURL(itemImage);
    }

    renderListings() {
        this.listingItems.innerHTML = ''; // Clear current listings

        if (this.listings.length === 0) {
            this.listingItems.innerHTML = '<p>No listings available yet.</p>';
            return;
        }

        this.listings.forEach(item => {
            const listingElement = item.render();
            this.listingItems.appendChild(listingElement);
        });
    }

    deleteListing(id) {
        this.listings = this.listings.filter(item => item.id !== id);
        this.renderListings();
    }

    editListing(id) {
        const itemToEdit = this.listings.find(item => item.id === id);
        if (itemToEdit) {
            document.getElementById('item-name').value = itemToEdit.name;
            document.getElementById('item-description').value = itemToEdit.description;
            document.getElementById('item-price').value = itemToEdit.price;
            this.currentEditingId = id; // Set the current editing ID
        }
    }
}

// Initialize the listing manager
const listingManager = new ListingManager();

