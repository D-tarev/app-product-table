
    // fetch("https://ru.openfoodfacts.org/products.json")
    //   .then((response) => response.json())
    //   .then((data) => data.products);
      const getData = async () => {
        const response = await fetch("https://ru.openfoodfacts.org/products.json").then(
          (response) => response.json()
        );
      
        return response;
      };
  
// console.log(getData());
  export {getData}