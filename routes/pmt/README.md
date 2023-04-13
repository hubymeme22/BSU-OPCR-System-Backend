# PMT Route
This route was made for CRUD operations on targets, key results, and success indicators.

## Terminilogy
- **Targets/finalOutput** - Are the outputs expected from the office/campus/department to be executed/done by the individuals.
- **Key results** - Are the results indicating that the final output was met and successfuly done by the individuals.
- **Success indicator** - Are the steps that will be done and will indicate that the key results are executed properly.

## Routes and Methods
### **Creating a new finalOutput**
- **POST** /api/pmt/create
  - Creates a new target for the PMT
  - Request body parameters: `target`, `key_indicators`
  - The `key_indicators` is an array of object containing **Key results** and **Success indicator** , named as `key` and `success`.
  - Format:
  ```JSON
    {
        "target": "Clean and Green",
        "key_indicators": [
            {
                "key": "Reuse Reduce Recycle bins",
                "sucess": "Properly implemented the bins at least 80% of the departments"
            },
            {"key": "...", "success": "..."},
            {"key": "...", "success": "..."},
            {"key": "...", "success": "..."},
            {"key": "...", "success": "..."}
        ]
    }
  ```
  - An example response from this route:
  ```JSON
  {
    "added": true,
    "error": null,
    "summary": {
        "_id": "...",
        "finalOutput": "...",
        "keyResult": [
            {"key": "...", "successIndicator": "..."},
            {"key": "...", "successIndicator": "..."},
            {"key": "...", "successIndicator": "..."}
        ]
    }
  }
  ```
  - The summary will contain all the data that are added to the server.

<br>

### **Reading all the targets**
- **GET** /api/pmt/
- Retrieves all the listed target/finalOutput from the database.
- Example response:
```JSON
  {
    "error": null,
    "pmt": [
        {
            "_id": "...",
            "finalOutput": "...",
            "keyResult": [
                {"key": "...", "successIndicator": "..."},
                {"key": "...", "successIndicator": "..."},
                {"key": "...", "successIndicator": "..."}
            ]
        },
        {
            "_id": "...",
            "finalOutput": "...",
            "keyResult": [
                {"key": "...", "successIndicator": "..."},
                {"key": "...", "successIndicator": "..."},
                {"key": "...", "successIndicator": "..."}
            ]
        }
    ]
  }
```

<br>

### **Editting the current data**
- **PUT** /api/pmt/update/:id
- The `id` parameter from this link will be the `_id` recieved from the **GET** request above.
- An example of usage of this request is the ff:
- HTTP request: `PUT /api/pmt/update/0ae13f2eab12c37ea121ff`
- request body:
```JSON
{
    "target": "....",
    "key_result": [
        {"key": "...", "successIndicator": "..."},
        {"key": "...", "successIndicator": "..."},
        {"key": "...", "successIndicator": "..."}
    ]
}
```
- The request body object will contain two parameters: `target` and `key_result`, to which the `key_result` has the same format as creating a new PMT.
- Please take note that this request overwrites the existing PMT.