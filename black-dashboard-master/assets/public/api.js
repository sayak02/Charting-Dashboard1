class FetchApi {

    async postVal(url, data) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        // console.log('this is response from charts.js',response.json())

        const responseJson = await response.json() // parses JSON response into native JavaScript objects
        // console.log(responseJson)
        return responseJson;
    }
    
    async getInitialData(url){
      const response = await fetch(url);
      // console.log('this is response from charts.js',response.json())
      const responseJson = await response.json() // parses JSON response into native JavaScript objects
      // console.log(responseJson)
      return responseJson;
    }
    
}
