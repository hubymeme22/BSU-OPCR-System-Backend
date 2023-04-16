# Database Dummy values automation
This folder contains the python loaders for uploading dummy values. This will only include account, campus, and department loaders.

## Installation
These python files will require `requests` module, so for installation, the ff. command below:

- If `pip` command is installed:
  ```
  pip install requests
  ```
- If `pip` command is not installed:
  ```
  python -m pip install requests
  ```

## Loading accounts
You can add account in `accountData.json`, the accounts have different permission flags which you can change in the file:
- `a` - Admin access
- `c` - Access for user that can comment and make remarks.
- `f` - Access to forms, these accounts can add and create new targets, and assign these to campuses and departments.
- `r` - Normal accounts for rating the success indicators.

Loading the accounts to the database:
```
python accountLoad.py
```