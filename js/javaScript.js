var productName = document.getElementById("productName");
var productCategory = document.getElementById("productCategory");
var productPrice = document.getElementById("productPrice");
var productDescription = document.getElementById("productDesc");
var addBtn = document.getElementById("addBtn");
var searchByNamee = document.getElementById("search");
var allProducts;

var regExProductName = /^[a-zA-Z\s]{1,12}$/;
var regExProductCaregory = /^[a-zA-Z\s]{1,12}$/;
var regExProductPrice = /^([1-9]\d{0,3}|1\d{4}|2[0-4]\d{3}|25000)$/;
var regExProductDesc = /^[a-zA-Z0-9\s]{1,120}$/;


if(localStorage.getItem("myProducts")==null)
    allProducts=[];
else
{
    allProducts=JSON.parse(localStorage.getItem("myProducts"));
    displayProducts();
}

addBtn.addEventListener("click",function(){
    if (addBtn.innerHTML=="Add Product")
        addProduct();
    else
        saveChanges();
});
searchByNamee.addEventListener("keyup",function(){
    searchByName(this.value);
});

productName.addEventListener("keyup",validateProductName);
productCategory.addEventListener("keyup",validateProductCategory);
productPrice.addEventListener("keyup",validateProductPrice);
productDescription.addEventListener("keyup",validateProductDesc);


function addProduct()
{
    var product={
        name:productName.value,
        cat:productCategory.value,
        price:productPrice.value,
        desc:productDescription.value
    }
    allProducts.push(product);
    localStorage.setItem("myProducts",JSON.stringify(allProducts));
    displayProducts();
    clearForm();
}

function displayProducts()
{   
    var content=``;
    for(var i=0;i<allProducts.length;i++)
    {
        content+=`<tr>
        <td>`+allProducts[i].name+`</td>
        <td>`+allProducts[i].cat+`</td>
        <td>`+allProducts[i].price+`</td>
        <td>`+allProducts[i].desc+`</td>
        <td> <button onclick="updateProduct(`+i+`)" class="btn btn-warning">Update</button> </td>
        <td> <button onclick="deleteProduct(`+i+`)" class="btn btn-danger">Delete</button> </td>
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML=content;
}

function clearForm()
{
    document.getElementById("productName").value="";
    document.getElementById("productCategory").value="";
    document.getElementById("productPrice").value="";
    document.getElementById("productDesc").value="";
    productName.classList.remove("is-valid","is-invalid");
    productCategory.classList.remove("is-valid","is-invalid");
    productDescription.classList.remove("is-valid","is-invalid");
    productPrice.classList.remove("is-valid","is-invalid");
}

function searchByName(term)
{   
    var content="";
    var content2=``;
    var txt="";
    if(term=="")
    {
        displayProducts();
        document.getElementById("searchResults").innerHTML="";
    }
    else 
    {
        for(var i=0;i<allProducts.length;i++)
        {
            if(allProducts[i].name.includes(term.trim())==true)
            {
                    content+=`<tr>
                <td>`+allProducts[i].name+`</td>
                <td>`+allProducts[i].cat+`</td>
                <td>`+allProducts[i].price+`</td>
                <td>`+allProducts[i].desc+`</td>
                <td> <button onclick="updateProduct(`+i+`)" class="btn btn-warning">Update</button> </td>
                <td> <button onclick="deleteProduct(`+i+`)" class="btn btn-danger">Delete</button> </td>
                </tr>`;

                txt=allProducts[i].name.replace(term,'<span style="color:black;background-color:yellow">'+term+'</span>');
                content2+='<p>'+txt+'</p>';
            }
        }
        document.getElementById("tableBody").innerHTML=content;
        document.getElementById("searchResults").innerHTML=content2;
    }   
}

function deleteProduct(index)
{
    allProducts.splice(index,1);
    localStorage.setItem("myProducts",JSON.stringify(allProducts));
    displayProducts();
}
var cur=-1;
function updateProduct(index)
{
    cur=index;
    productName.value=allProducts[index].name;
    productCategory.value=allProducts[index].cat;
    productPrice.value=allProducts[index].price;
    productDescription.value=allProducts[index].desc;
    addBtn.innerHTML="Update Product";
    addBtn.className="btn btn-warning my-3";

    
}
function saveChanges()
{
    var index=cur;
    allProducts[index].name=productName.value;
    allProducts[index].cat=productCategory.value;
    allProducts[index].price=productPrice.value;
    allProducts[index].desc=productDescription.value;
    addBtn.innerHTML="Add Product";
    addBtn.className="btn btn-info my-3";

    localStorage.setItem("myProducts",JSON.stringify(allProducts));
    displayProducts();
    clearForm();
}

function validateProductName()
{
    if(  regExProductName.test(productName.value) == false)
    {
        productName.classList.add("is-invalid");
        productName.classList.remove("is-valid");
    }
    else
    {
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");
    } 
}

function validateProductCategory()
{
    if(  regExProductCaregory.test(productCategory.value) == false)
    {
        productCategory.classList.add("is-invalid");
        productCategory.classList.remove("is-valid");
    }
    else
    {
        productCategory.classList.add("is-valid");
        productCategory.classList.remove("is-invalid");
    } 
}

function validateProductPrice()
{
    if(  regExProductPrice.test(productPrice.value) == false)
    {
        productPrice.classList.add("is-invalid");
        productPrice.classList.remove("is-valid");
    }
    else
    {
        productPrice.classList.add("is-valid");
        productPrice.classList.remove("is-invalid");
    } 
}

function validateProductDesc()
{
    if(regExProductDesc.test(productDescription.value) == false)
    {
        productDescription.classList.add("is-invalid");
        productDescription.classList.remove("is-valid");
    }
    else
    {
        productDescription.classList.add("is-valid");
        productDescription.classList.remove("is-invalid");
    } 
}