# OPCR System Back end
An API back-end repository for our final project. This back-end system is designed for creating, updating, and rating the performance of the assigned tasks (targets and goals) for the campuses, departments, and offices of Batangas State University. This repository will also serve as a log and document repository for keeping track of the progress on the back-end developer's side.

<br>

# Installation and Setup
## Setting up configuration
The `.env` file contains different values and by default are set by the developer's database link (which does not work, since this mongoose link is only white listed to developer's access), localhost as ip address and so on. The `.env` file has the following variables that can be changed anytime for easier configuration:
- `IP` - The IP address that will be used by the API.
- `PORT` - The PORT that will be used by the API (set this to `80` to avoid typing the port alongside the ip).
- `MONGODBURI` - The URI that will be used to connect to your mongodb atlas server.
- `SECRETKEY` - The `salt` that will be used for encoding yout `jsonwebtoken` and  **CHANGING THIS IS ONE A MUST** when deploying the application to production for security purposes.

<br>

## Package installation and starting the server
This project uses the following npm packages:
- `express` - packege used for RESTful API framework.
- `mongoose` - used for connecting to the database.
- `dotenv` - for easier configuration by accessing the `.env` file.

The packages mentioned above will be installed by executing the ff. command on terminal:

```
npm install
```

After installing the packages, access and run the API by executing the ff. command:
```
npm run server
```

**Note**: Make sure that you whitelisted your IP from your mongodb atlas' access to avoid errors.

<br>

# Developers
- **Espinola I, Hubert, F**
- **Aguilar, Karl Joseph, M**