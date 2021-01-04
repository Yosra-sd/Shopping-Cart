

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

    var addToCartButtons = document.getElementsByClassName('btn-dark')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    // event = 'click' / 'change' ..
    var heartButton = document.getElementsByClassName('like')
    for (var i = 0; i< heartButton.length; i++) {
        var button = heartButton[i]
        button.addEventListener('click', LikeHeart)
    }

    var removeCartItemButtons = document.getElementsByClassName('btn-remove')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInput = document.getElementsByClassName('quantity')
    for (var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i]
        input.addEventListener('change', quantityChanged)
    }

    document.getElementsByClassName('purchase')[0].addEventListener('click', purchaseClicked)

}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItem = document.getElementsByClassName('tablebody')[0]
    while(cartItem.hasChildNodes()){
        cartItem.removeChild(cartItem.firstChild)
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    event.preventDefault()
    var button = event.target
    var shopItem = button.parentElement.parentElement.parentElement
    var title = shopItem.getElementsByClassName('card-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('card-img-top')[0].src
    var totalEl = 
    // console.log(title, price, imageSrc)
    addItem(title, price, imageSrc)
    updateCartTotal()
}

function addItem(title, price, imageSrc) {

    var cartRow = document.createElement('tr')
    var cartItem = document.getElementsByClassName('tablebody')[0]
    var cartItemNames = cartItem.getElementsByClassName('cart-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item already exists')
            return
        }
    }
    var cartRowContents = 
    `<tr>
    <td><img class="cart-img" src="${imageSrc}" alt="Card image cap" /></td>
    <td><span class="cart-title">${title}</span></td>
    <td class="card-subtitle mb-2 text-muted card-price"><span class="cart-price">${price}</span> Dinars</td>
    <td> <input class="quantity" type="number" value="1"></td>
    <td><span class="item-total">${price}</span> Dinars</td>
    <td><button class="btn btn-remove" id="remove" type="button">Remove</button></td>
    </tr>` 
    cartRow.innerHTML = cartRowContents
    cartItem.append(cartRow)
    cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('quantity')[0].addEventListener('change', quantityChanged)
    

    //add to a table 
    //var row = cartItem.insertRow(1)
    //var img = row.insertCell(0)
    //var name = row.insertCell (1)
    //var price = row.insertCell(2)
    //img.innerText = imageSrc
    //name.innerText = title
    //price.innerText = price
}

// chaque element dans HTML a une liste de classe (classlist)
// .target recupère l'element sur lequel on a cliqué 
function LikeHeart(event) {
    event.preventDefault()
    var list = event.target.classList;
    if (list.contains('liked')){
        list.remove('liked')
    } else {
        list.add('liked')
    }
}

function removeCartItem(event) {
    event.preventDefault()
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}


function updateCartTotal() {
    var itemContainer = document.getElementsByClassName('tablebody')[0]
    var cartRows = itemContainer.getElementsByTagName('tr')
    //console.log(cartRows)
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceEl = cartRow.getElementsByClassName('cart-price')[0]
        var quantityEl = cartRow.getElementsByClassName('quantity')[0]
        var price = parseFloat(priceEl.innerText) 
        var quantity = quantityEl.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total')[0].innerText = total 
}


function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    var quantity = input.value;
    var item = event.target.parentElement.parentElement
    var itemPrice = item.getElementsByClassName('cart-price')[0].innerText;
    var itemTotalContainer = item.getElementsByClassName('item-total')[0]
    var itemTotal = quantity * parseFloat(itemPrice);
    itemTotalContainer.innerText = itemTotal
    updateCartTotal()
    
}