import requests as re
import json

# please configure this for changes
host = "localhost"
port = 5050

# different routes for different access
apiRoutes = {
    "r": f"http://{host}:{port}/api/register/",
    # "c": f"http://{host}:{port}/api/register/comment",
    "a": f"http://{host}:{port}/api/register/admin",
    "f": f"http://{host}:{port}/api/register/form"
}

filePointer = open('accountData.json')
jsonData = json.load(filePointer)

print('[*] Loading accounts...')
for account in jsonData:
    accountAccess = account['access']

    print('[+] Adding data:')
    print(f'[*] Account permission: {accountAccess}')
    print(account)

    status = re.post(apiRoutes[accountAccess], json=account)
    print(f'[+] Response status: {status.status_code}')

print('[+] Done')